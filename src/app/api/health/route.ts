import { NextResponse } from 'next/server';

export async function GET() {
  const healthCheck: {
    status: string;
    timestamp: string;
    uptime: number;
    version: string;
    node_version: string;
    memory: { used: number; total: number };
    environment: string | undefined;
    database?: string;
  } = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '0.1.0',
    node_version: process.version,
    memory: {
      used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
      total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
    },
    environment: process.env.NODE_ENV,
  };

  try {
    // Test database connection if Supabase is configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      // Simple query to test connection
      const { error } = await supabase.from('email_subscribers').select('count', { count: 'exact', head: true });
      
      if (error) {
        return NextResponse.json(
          {
            ...healthCheck,
            status: 'degraded',
            database: 'connection_error',
            error: error.message,
          },
          { status: 503 }
        );
      }

      healthCheck.database = 'connected';
    }

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ...healthCheck,
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}