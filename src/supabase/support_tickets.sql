-- Support tickets table for storing customer inquiries and questions
-- This table stores all support requests submitted through the contact support popup

CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    source VARCHAR(50) DEFAULT 'contact_popup' NOT NULL,
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    assigned_to UUID REFERENCES auth.users(id),
    internal_notes TEXT,
    customer_email VARCHAR(255) -- Optional, for future use if we collect emails
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Policy: Allow insert for anyone (public can submit tickets)
CREATE POLICY "Anyone can submit support tickets" ON public.support_tickets
    FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated admin users can view/update tickets
CREATE POLICY "Only admins can view support tickets" ON public.support_tickets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "Only admins can update support tickets" ON public.support_tickets
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS support_tickets_created_at_idx ON public.support_tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS support_tickets_priority_idx ON public.support_tickets(priority);
CREATE INDEX IF NOT EXISTS support_tickets_assigned_to_idx ON public.support_tickets(assigned_to);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language plpgsql;

-- Create trigger to automatically update updated_at column
CREATE TRIGGER update_support_tickets_updated_at 
    BEFORE UPDATE ON public.support_tickets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add helpful comments
COMMENT ON TABLE public.support_tickets IS 'Stores customer support requests and inquiries';
COMMENT ON COLUMN public.support_tickets.full_name IS 'Customer full name as provided in the form';
COMMENT ON COLUMN public.support_tickets.question IS 'The customer question or comment';
COMMENT ON COLUMN public.support_tickets.status IS 'Current status of the support ticket';
COMMENT ON COLUMN public.support_tickets.priority IS 'Priority level of the support ticket';
COMMENT ON COLUMN public.support_tickets.source IS 'Where the ticket originated from (contact_popup, email, etc.)';
COMMENT ON COLUMN public.support_tickets.user_agent IS 'Browser user agent for technical debugging';
COMMENT ON COLUMN public.support_tickets.ip_address IS 'Customer IP address for security/analytics';
COMMENT ON COLUMN public.support_tickets.referrer IS 'Page URL where the support request was initiated';
COMMENT ON COLUMN public.support_tickets.internal_notes IS 'Internal notes for support team use only';

-- Create a view for easy ticket management (optional)
CREATE OR REPLACE VIEW public.support_tickets_summary AS
SELECT 
    id,
    full_name,
    LEFT(question, 100) || CASE WHEN LENGTH(question) > 100 THEN '...' ELSE '' END as question_preview,
    status,
    priority,
    source,
    created_at,
    updated_at,
    CASE 
        WHEN resolved_at IS NOT NULL THEN resolved_at - created_at
        ELSE NOW() - created_at
    END as time_since_created
FROM public.support_tickets
ORDER BY 
    CASE priority 
        WHEN 'urgent' THEN 1
        WHEN 'high' THEN 2
        WHEN 'normal' THEN 3
        WHEN 'low' THEN 4
    END,
    created_at DESC;

COMMENT ON VIEW public.support_tickets_summary IS 'Summary view of support tickets for easy management';