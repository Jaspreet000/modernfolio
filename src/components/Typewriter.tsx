import React, { useEffect, useState } from 'react';

interface TypewriterProps {
  options: {
    strings: string[];
    autoStart: boolean;
    loop: boolean;
    delay: number;
    cursor: string;
  };
  className: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ options, className }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const { strings, autoStart, loop, delay, cursor } = options;

  useEffect(() => {
    if (autoStart) {
      const type = () => {
        if (index < strings[0].length) {
          setText((prev) => prev + strings[0][index]);
          setIndex((prev) => prev + 1);
        } else if (loop) {
          setTimeout(() => {
            setText('');
            setIndex(0);
          }, 2000);
        }
      };
      const interval = setInterval(type, delay);
      return () => clearInterval(interval);
    }
  }, [index, options]);

  useEffect(() => {
    if (text.length === strings[0].length) {
      setTimeout(() => {
        setText('');
        setIndex(0);
      }, 2000); // Delay before restarting
    }
  }, [text]);

  return (
    <span className={`${className} smoke-effect`}> {/* Apply smoke effect class here */}
      {text}
      <span className="cursor animate-blink">{cursor}</span>
    </span>
  );
};

export default Typewriter;

// CSS for smoke effect and blinking cursor
// .smoke-effect {
//   animation: smoke 1s forwards;
// }
// @keyframes smoke {
//   0% { opacity: 1; transform: translateY(0); }
//   100% { opacity: 0; transform: translateY(-20px); }
// }
// .animate-blink {
//   animation: blink 1s step-end infinite;
// }
// @keyframes blink {
//   50% { opacity: 0; }
// } 