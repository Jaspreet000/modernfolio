import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function usePageTransition() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      setIsTransitioning(true);
    };

    const handleComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Match this with your transition duration
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // Slightly longer to ensure smooth transitions
    };

    window.addEventListener('routeChangeStart', handleStart);
    window.addEventListener('routeChangeComplete', handleComplete);
    window.addEventListener('routeChangeError', handleComplete);

    return () => {
      window.removeEventListener('routeChangeStart', handleStart);
      window.removeEventListener('routeChangeComplete', handleComplete);
      window.removeEventListener('routeChangeError', handleComplete);
    };
  }, []);

  return {
    isLoading,
    isTransitioning,
    pathname,
  };
} 