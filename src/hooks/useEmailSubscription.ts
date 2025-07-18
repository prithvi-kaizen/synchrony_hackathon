import { useState } from 'react';

interface SubscribeResponse {
  message: string;
  alreadySubscribed?: boolean;
  subscriber?: Record<string, unknown>;
  showConfetti?: boolean;
  error?: string;
  details?: Record<string, unknown>;
}

interface UseEmailSubscriptionReturn {
  subscribe: (
    email: string,
    source: string,
    metadata?: Record<string, unknown>
  ) => Promise<SubscribeResponse>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export function useEmailSubscription(): UseEmailSubscriptionReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const subscribe = async (
    email: string,
    source: string,
    metadata?: Record<string, unknown>
  ): Promise<SubscribeResponse> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          metadata,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to subscribe');
        return data;
      }

      setSuccess(true);
      return data;
    } catch {
      const errorMessage = 'Network error occurred';
      setError(errorMessage);
      return { message: '', error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    isLoading,
    error,
    success,
  };
}
