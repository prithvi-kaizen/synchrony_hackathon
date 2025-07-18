import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('email_subscribers')
      .select('email')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Insert new subscriber into Supabase
    const { data: subscriber, error: supabaseError } = await supabase
      .from('email_subscribers')
      .insert({
        email,
        source: 'scroll_modal',
        metadata: {
          user_agent: request.headers.get('user-agent'),
          timestamp: new Date().toISOString(),
        }
      })
      .select()
      .single();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    // Send Supabase email confirmation (this will trigger Supabase auth email)
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/confirm-email`,
        data: {
          source: 'scroll_modal'
        }
      }
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      // Continue even if auth email fails, we'll still send the welcome email
    }

    // Send welcome email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'welcome@your-domain.com',
          to: email,
          subject: '🎉 Welcome! Your Free Resources Are Here',
          html: generateWelcomeEmailHTML(),
        });
      } catch (resendError) {
        console.error('Resend error:', resendError);
        // Don't fail the request if email sending fails
      }
    }

    // Send admin notification to Vadim
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'notifications@your-domain.com',
          to: 'vadim.vozmitsel@gmail.com',
          subject: '🎯 New Email Subscriber',
          html: generateAdminNotificationHTML(email, request),
        });
      } catch (adminEmailError) {
        console.error('Admin notification error:', adminEmailError);
        // Don't fail the request if admin email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation and resources.',
      subscriber
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateAdminNotificationHTML(email: string, request: NextRequest): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const referer = request.headers.get('referer') || 'Direct';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Email Subscriber</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background: linear-gradient(135deg, #da3229 0%, #e0392f 100%);
          border-radius: 8px;
          color: white;
        }
        .email-highlight {
          background: #f3f4f6;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #e0392f;
        }
        .info-row {
          margin: 10px 0;
          padding: 10px;
          background: #f9fafb;
          border-radius: 6px;
        }
        .label {
          font-weight: 600;
          color: #374151;
        }
        .value {
          color: #6b7280;
          margin-left: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 New Email Subscriber</h1>
          <p>Someone just joined your mailing list!</p>
        </div>

        <div class="email-highlight">
          <h2 style="margin: 0; color: #1f2937;">New Subscriber Email:</h2>
          <p style="font-size: 18px; font-weight: 600; color: #e0392f; margin: 10px 0;">${email}</p>
        </div>

        <div class="info-row">
          <span class="label">📅 Timestamp:</span>
          <span class="value">${timestamp}</span>
        </div>

        <div class="info-row">
          <span class="label">🌐 Source:</span>
          <span class="value">Scroll Modal</span>
        </div>

        <div class="info-row">
          <span class="label">🔗 Referrer:</span>
          <span class="value">${referer}</span>
        </div>

        <div class="info-row">
          <span class="label">💻 User Agent:</span>
          <span class="value">${userAgent}</span>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <p style="text-align: center; color: #6b7280; font-size: 14px;">
          This notification was automatically generated from your Next.js application.
        </p>
      </div>
    </body>
    </html>
  `;
}

function generateWelcomeEmailHTML(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Community!</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #da3229 0%, #e0392f 100%);
          border-radius: 16px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          color: white;
          font-weight: bold;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          color: #1f2937;
          margin: 0;
        }
        .subtitle {
          font-size: 16px;
          color: #6b7280;
          margin: 10px 0 0 0;
        }
        .content {
          margin: 30px 0;
        }
        .benefit {
          display: flex;
          align-items: center;
          margin: 15px 0;
          padding: 15px;
          background: #f3f4f6;
          border-radius: 8px;
        }
        .benefit-icon {
          width: 24px;
          height: 24px;
          background: #e0392f;
          border-radius: 50%;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #da3229 0%, #e0392f 100%);
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          text-align: center;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #6b7280;
        }
        .links {
          margin: 20px 0;
        }
        .links a {
          color: #e0392f;
          text-decoration: none;
          margin: 0 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">T</div>
          <h1 class="title">Welcome to the Community! 🎉</h1>
          <p class="subtitle">Your free resources are ready</p>
        </div>

        <div class="content">
          <p>Hi there!</p>
          
          <p>Welcome to our developer community! We're excited to have you on board. As promised, here are your exclusive free resources:</p>

          <div class="benefit">
            <div class="benefit-icon">✨</div>
            <div>
              <strong>Free Starter Resources</strong><br>
              Ready-to-use templates and components for your projects
            </div>
          </div>

          <div class="benefit">
            <div class="benefit-icon">🎓</div>
            <div>
              <strong>Exclusive Updates</strong><br>
              Get notified about new features and premium content
            </div>
          </div>

          <div class="benefit">
            <div class="benefit-icon">🚀</div>
            <div>
              <strong>Early Access</strong><br>
              Be the first to see new releases and advanced features
            </div>
          </div>

          <center>
            <a href="https://your-website.com/" class="cta-button">
              Visit Our Website →
            </a>
          </center>

          <p>You'll also receive updates about new features, best practices, and development tips.</p>

          <div class="links">
            <a href="https://your-website.com/docs">Documentation</a> |
            <a href="https://your-website.com/blog">Blog</a>
          </div>
        </div>

        <div class="footer">
          <p>Thanks for joining our community of 1000+ developers!</p>
          <p>If you have any questions, just reply to this email.</p>
          <p style="margin-top: 20px;">
            <a href="#" style="color: #6b7280; font-size: 12px;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}