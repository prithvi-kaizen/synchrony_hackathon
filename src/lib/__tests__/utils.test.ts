import { cn } from '../utils';

describe('utils', () => {
  describe('cn (className merger)', () => {
    it('merges class names correctly', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('bg-blue-500');
    });

    it('handles conditional classes', () => {
      const result = cn('base-class', true && 'conditional-true', false && 'conditional-false');
      expect(result).toContain('base-class');
      expect(result).toContain('conditional-true');
      expect(result).not.toContain('conditional-false');
    });

    it('handles undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'another-class');
      expect(result).toContain('base-class');
      expect(result).toContain('another-class');
    });

    it('resolves Tailwind conflicts correctly', () => {
      const result = cn('px-4 px-2'); // Later px-2 should win
      expect(result).toContain('px-2');
      expect(result).not.toContain('px-4');
    });

    it('handles empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('handles array inputs', () => {
      const result = cn(['px-4', 'py-2'], 'bg-blue-500');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('bg-blue-500');
    });
  });
});