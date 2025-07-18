'use client';

// Performance monitoring for development
class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;
  private isMonitoring = false;

  public startMonitoring() {
    if (this.isMonitoring || process.env.NODE_ENV === 'production') return;

    this.isMonitoring = true;
    this.monitorFrame();
  }

  private monitorFrame = () => {
    if (!this.isMonitoring) return;

    this.frameCount++;
    const currentTime = performance.now();

    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));

      // Log performance warnings
      if (this.fps < 30) {
        console.warn(`🐌 Low FPS detected: ${this.fps}fps - Consider optimizing animations`);
      } else if (this.fps < 50) {
        console.warn(`⚠️ Moderate FPS: ${this.fps}fps - Performance could be improved`);
      }

      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(this.monitorFrame);
  };

  public stopMonitoring() {
    this.isMonitoring = false;
  }

  public getFPS() {
    return this.fps;
  }
}

// Global instance
const performanceMonitor = new PerformanceMonitor();

export { performanceMonitor };

// Utility to measure component render time
export function measureRenderTime(componentName: string, renderFn: () => void) {
  if (process.env.NODE_ENV === 'production') {
    renderFn();
    return;
  }

  const start = performance.now();
  renderFn();
  const end = performance.now();

  const renderTime = end - start;
  if (renderTime > 16) {
    // More than one frame at 60fps
    console.warn(`🐌 Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`);
  }
}

// Auto-start monitoring in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  performanceMonitor.startMonitoring();
}
