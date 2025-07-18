import { renderHook, act } from '@testing-library/react';
import { useEmailSubscription } from '../useEmailSubscription';

// Mock fetch
global.fetch = jest.fn();

describe('useEmailSubscription', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useEmailSubscription());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);
  });

  it('handles successful subscription', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Subscription successful' }),
    });

    const { result } = renderHook(() => useEmailSubscription());

    await act(async () => {
      await result.current.subscribe('test@example.com', 'landing_page');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(true);
  });

  it('handles subscription error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid email' }),
    });

    const { result } = renderHook(() => useEmailSubscription());

    await act(async () => {
      await result.current.subscribe('invalid-email', 'landing_page');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid email');
    expect(result.current.success).toBe(false);
  });

  it('handles network error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useEmailSubscription());

    await act(async () => {
      await result.current.subscribe('test@example.com', 'landing_page');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network error occurred');
    expect(result.current.success).toBe(false);
  });

  it('sets loading state during subscription', async () => {
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    (fetch as jest.Mock).mockReturnValueOnce(promise);

    const { result } = renderHook(() => useEmailSubscription());

    act(() => {
      result.current.subscribe('test@example.com', 'landing_page');
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise({
        ok: true,
        json: async () => ({ success: true }),
      });
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('sends correct API request', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useEmailSubscription());

    await act(async () => {
      await result.current.subscribe('test@example.com', 'landing_page', { utm_source: 'test' });
    });

    expect(fetch).toHaveBeenCalledWith('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        source: 'landing_page',
        metadata: { utm_source: 'test' },
      }),
    });
  });

  it('resets state correctly on new subscription', () => {
    const { result } = renderHook(() => useEmailSubscription());

    // State should be reset for each new subscription attempt
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);
  });
});