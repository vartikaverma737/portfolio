import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={className}
      style={{ ...style, flexWrap: 'wrap', display: 'flex', justifyContent: 'center' }}
    >
      {words.map((word, wordIndex) => {
        const start = wordIndex / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={wordIndex} className="inline-flex">
            {word.split('').map((char, charIndex) => {
              const charStart = start + (charIndex / word.length) * (1 / words.length);
              const charEnd = charStart + 1 / (words.length * word.length);
              const opacity = useTransform(scrollYProgress, [charStart, charEnd], [0.2, 1]);

              return (
                <span key={charIndex} className="relative inline-flex">
                  <span className="opacity-0">{char}</span>
                  <motion.span className="absolute inset-0" style={{ opacity }}>
                    {char}
                  </motion.span>
                </span>
              );
            })}
            {wordIndex < words.length - 1 ? '\u00A0' : null}
          </span>
        );
      })}
    </p>
  );
}