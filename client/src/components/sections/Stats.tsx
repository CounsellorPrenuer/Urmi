import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface StatProps {
  end: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedStat({ end, suffix, label, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="font-serif text-4xl md:text-6xl font-bold text-emerald-600 mb-2" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground text-sm md:text-base">{label}</div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <AnimatedStat end={3800} suffix="+" label="Lives Empowered" delay={0.1} />
          <AnimatedStat end={20} suffix="+" label="Years of Experience" delay={0.2} />
          <AnimatedStat end={96} suffix="%" label="Client Satisfaction" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
