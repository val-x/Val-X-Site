import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Report Web Vitals
    const reportWebVitals = ({ name, delta, id }) => {
      // Send to analytics
      console.log(`Metric: ${name} ID: ${id} Value: ${delta}`);
    };

    // Observer for CLS
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        reportWebVitals({
          name: 'CLS',
          delta: entry.value,
          id: entry.id
        });
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default PerformanceMonitor; 