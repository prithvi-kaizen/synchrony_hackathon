// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_TRACKING_ID = 'G-8QHK6F230J';

export const trackEvent = (action: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, parameters);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Internal metrics tracking
export const trackInternalMetric = async (type: string, value = 1) => {
  if (typeof window !== 'undefined') {
    try {
      await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value }),
      });
    } catch (error) {
      console.error('Failed to track internal metric:', error);
    }
  }
};

// Test events to trigger Google Analytics registration
export const triggerTestEvents = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Page view event
    trackEvent('page_view', {
      page_title: 'n8n Masterclass - Master AI Orchestration & Automation',
      page_location: window.location.href,
    });

    // Site engagement events
    trackEvent('site_loaded', {
      event_category: 'engagement',
      event_label: 'initial_load',
    });

    trackEvent('user_engagement', {
      event_category: 'engagement',
      engagement_time_msec: 1000,
    });

    // Custom events for course interest
    trackEvent('course_page_view', {
      event_category: 'course',
      event_label: 'landing_page',
      value: 1,
    });

    // Track internal metrics
    trackInternalMetric('pageView');

    console.warn('🎯 Test events sent to Google Analytics (G-8QHK6F230J)');
  }
};