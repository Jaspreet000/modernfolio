"use client";

import { useEffect, useState } from 'react';

interface ClientSideLayoutProps {
  children: React.ReactNode;
}

export default function ClientSideLayout({ children }: ClientSideLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile and set initial state
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
    };

    handleResize();
    
    // Debounce resize event for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 250);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div data-is-mobile={isMobile}>
      {children}
    </div>
  );
} 