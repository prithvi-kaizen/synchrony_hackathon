import { GET } from '../health/route';

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => Promise.resolve({ error: null })),
    })),
  })),
}));

// Mock environment variables
const originalEnv = process.env;

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns healthy status with basic info', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      status: 'healthy',
      timestamp: expect.any(String),
      uptime: expect.any(Number),
      version: expect.any(String),
      node_version: expect.any(String),
      memory: {
        used: expect.any(Number),
        total: expect.any(Number),
      },
      environment: expect.any(String),
    });
  });

  it('includes database status when Supabase is configured', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.database).toBe('connected');
  });

  it('returns degraded status on database connection error', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

    // Mock Supabase to return an error
    const supabaseModule = await import('@supabase/supabase-js');
    (supabaseModule.createClient as jest.Mock).mockReturnValue({
      from: jest.fn(() => ({
        select: jest.fn(() => Promise.resolve({ error: { message: 'Connection failed' } })),
      })),
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe('degraded');
    expect(data.database).toBe('connection_error');
    expect(data.error).toBe('Connection failed');
  });

  it('handles unexpected errors gracefully', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

    // Mock Supabase to throw an error
    const supabaseModule = await import('@supabase/supabase-js');
    (supabaseModule.createClient as jest.Mock).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe('unhealthy');
    expect(data.error).toBe('Unexpected error');
  });

  it('returns correct memory usage format', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.memory.used).toBeGreaterThan(0);
    expect(data.memory.total).toBeGreaterThan(0);
    expect(data.memory.used).toBeLessThan(data.memory.total);
    // Memory should be in MB (reasonable range)
    expect(data.memory.used).toBeLessThan(1000);
  });

  it('includes correct timestamp format', async () => {
    const response = await GET();
    const data = await response.json();

    const timestamp = new Date(data.timestamp);
    expect(timestamp.getTime()).not.toBeNaN();
    expect(Math.abs(Date.now() - timestamp.getTime())).toBeLessThan(1000); // Within 1 second
  });
});