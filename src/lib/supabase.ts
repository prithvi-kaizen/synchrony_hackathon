import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface EmailSubscriber {
  id: string;
  email: string;
  first_name?: string;
  source: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

export interface Database {
  public: {
    Tables: {
      email_subscribers: {
        Row: EmailSubscriber;
        Insert: Omit<EmailSubscriber, 'id' | 'created_at'>;
        Update: Partial<Omit<EmailSubscriber, 'id' | 'created_at'>>;
      };
    };
  };
}
