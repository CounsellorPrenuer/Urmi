import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CursorTrail() {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useSpring(0, { stiffness: 200, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 15);
      cursorY.set(e.clientY - 15);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="cursor-trail hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 0.4 : 0,
        background: 'linear-gradient(135deg, #6A1B9A, #03A9F4)',
        filter: 'blur(8px)',
      }}
    />
  );
}
