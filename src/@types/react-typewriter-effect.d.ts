declare module 'react-typewriter-effect' {
  import React from 'react';

  interface TypewriterProps {
    options: {
      strings: string[];
      autoStart: boolean;
      loop: boolean;
      cursor: string;
      delay: number;
    };
    className?: string;
  }

  const Typewriter: React.FC<TypewriterProps>;
  export default Typewriter;
} 