'use client';

// Apple's Liquid Glass UI Implementation
// High-performance scroll management with GPU acceleration

export class LiquidGlassScrollManager {
  private elements = new Map<HTMLElement, GlassElementState>();
  private scrollFrame: number | null = null;
  private lastScrollY = 0;
  private observer!: IntersectionObserver;

  constructor() {
    this.init();
  }

  private init() {
    // High-performance Intersection Observer with multiple thresholds
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const state = this.elements.get(element);

          if (state) {
            if (entry.isIntersecting) {
              state.isVisible = true;
              this.animateGlass(element, entry.intersectionRatio);
            } else {
              state.isVisible = false;
              this.resetGlass(element);
            }
          }
        });
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0],
        rootMargin: '50px',
      }
    );

    // Optimized scroll handler with passive listeners
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }

  private handleScroll() {
    if (!this.scrollFrame) {
      this.scrollFrame = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - this.lastScrollY;

        // Only update if scroll delta is significant (reduces unnecessary updates)
        if (Math.abs(scrollDelta) > 1) {
          this.elements.forEach((state, element) => {
            if (state.isVisible) {
              this.updateGlassEffectOptimized(element, scrollY, scrollDelta);
            }
          });
        }

        this.lastScrollY = scrollY;
        this.scrollFrame = null;
      });
    }
  }

  private animateGlass(element: HTMLElement, ratio: number) {
    const blurAmount = 5 + ratio * 20;
    const opacity = 0.95 - ratio * 0.15;
    const scale = 1 - ratio * 0.02;

    element.style.setProperty('--liquid-glass-blur', `${blurAmount}px`);
    element.style.setProperty('--liquid-glass-opacity', opacity.toString());
    element.style.transform = `translateZ(0) scale(${scale})`;
  }

  private updateGlassEffect(element: HTMLElement, scrollY: number, scrollDelta: number) {
    // Dynamic refraction based on scroll velocity
    const velocity = Math.min(Math.abs(scrollDelta), 50);
    const refractionIntensity = 1 + velocity * 0.01;

    element.style.setProperty('--refraction-index', refractionIntensity.toString());

    // Parallax glass layers
    const parallaxOffset = scrollY * 0.1;
    element.style.setProperty('--glass-parallax', `${parallaxOffset}px`);
  }

  // Optimized version with reduced DOM manipulations
  private updateGlassEffectOptimized(element: HTMLElement, scrollY: number, scrollDelta: number) {
    // Throttle expensive operations
    const velocity = Math.min(Math.abs(scrollDelta), 50);

    // Only update if velocity is significant
    if (velocity > 2) {
      const refractionIntensity = 1 + velocity * 0.005; // Reduced multiplier for smoother effect
      element.style.setProperty('--refraction-index', refractionIntensity.toString());
    }

    // Reduce parallax calculation frequency
    if (scrollDelta % 3 === 0) {
      // Only update every 3rd scroll event
      const parallaxOffset = scrollY * 0.05; // Reduced parallax intensity
      element.style.setProperty('--glass-parallax', `${parallaxOffset}px`);
    }
  }

  private resetGlass(element: HTMLElement) {
    const state = this.elements.get(element);
    if (state?.initialState) {
      element.style.setProperty('--liquid-glass-blur', state.initialState.blur);
      element.style.setProperty('--liquid-glass-opacity', state.initialState.opacity);
      element.style.transform = 'translateZ(0) scale(1)';
    }
  }

  public observe(element: HTMLElement) {
    this.elements.set(element, {
      isVisible: false,
      initialState: this.captureState(element),
    });
    this.observer.observe(element);
  }

  private captureState(element: HTMLElement): GlassInitialState {
    const computed = window.getComputedStyle(element);
    return {
      blur: computed.getPropertyValue('--liquid-glass-blur') || '20px',
      opacity: computed.getPropertyValue('--liquid-glass-opacity') || '0.2',
    };
  }

  public destroy() {
    this.observer.disconnect();
    if (this.scrollFrame) {
      cancelAnimationFrame(this.scrollFrame);
    }
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
}

// Dynamic Color Adaptation System
export class LiquidGlassColorAdapter {
  private colorCache = new Map<string, GlassConfig>();

  public adaptToBackground(glassElement: HTMLElement): GlassConfig {
    const backgroundColor = this.sampleBackgroundColor(glassElement);
    const luminance = this.calculateLuminance(backgroundColor);

    // Generate optimal glass properties based on background luminance
    const glassConfig: GlassConfig = {
      opacity: luminance > 0.5 ? 0.1 : 0.2,
      blur: luminance > 0.5 ? 25 : 20,
      saturation: luminance > 0.5 ? 180 : 160,
      brightness: luminance > 0.5 ? 110 : 90,
      borderOpacity: luminance > 0.5 ? 0.3 : 0.2,
    };

    // Apply adaptive properties with performance optimization
    this.applyGlassConfig(glassElement, glassConfig);

    return glassConfig;
  }

  private applyGlassConfig(element: HTMLElement, config: GlassConfig) {
    element.style.setProperty('--liquid-glass-opacity', config.opacity.toString());
    element.style.setProperty('--liquid-glass-blur', `${config.blur}px`);
    element.style.setProperty('--liquid-glass-saturation', `${config.saturation}%`);
    element.style.setProperty('--liquid-glass-brightness', `${config.brightness}%`);
    element.style.setProperty('--liquid-glass-border-opacity', config.borderOpacity.toString());
  }

  private sampleBackgroundColor(element: HTMLElement): RGB {
    // Simplified background color sampling
    const computedBg = window.getComputedStyle(element.parentElement || element).backgroundColor;
    return this.parseColor(computedBg);
  }

  private calculateLuminance(rgb: RGB): number {
    // WCAG relative luminance calculation
    const [r, g, b] = rgb.map((val) => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private parseColor(color: string): RGB {
    const match = color.match(/\d+/g);
    return match ? (match.slice(0, 3).map(Number) as RGB) : [255, 255, 255];
  }
}

// Type definitions
interface GlassElementState {
  isVisible: boolean;
  initialState: GlassInitialState;
}

interface GlassInitialState {
  blur: string;
  opacity: string;
}

interface GlassConfig {
  opacity: number;
  blur: number;
  saturation: number;
  brightness: number;
  borderOpacity: number;
}

type RGB = [number, number, number];

// Global instance
let glassScrollManager: LiquidGlassScrollManager | null = null;

export const getGlassScrollManager = () => {
  if (!glassScrollManager) {
    glassScrollManager = new LiquidGlassScrollManager();
  }
  return glassScrollManager;
};

export const cleanupGlassScrollManager = () => {
  if (glassScrollManager) {
    glassScrollManager.destroy();
    glassScrollManager = null;
  }
};
