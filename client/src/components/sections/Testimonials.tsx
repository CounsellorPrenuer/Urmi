import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    initials: 'SP',
    role: 'Software Engineer → Career Transition',
    quote: 'Urmi helped me reprogram my self-doubt and realign my goals. The shift was beyond professional—it was personal.',
    gradient: 'from-primary-purple to-secondary-blue',
  },
  {
    initials: 'RK',
    role: 'Teacher → Life Coach',
    quote: 'The sessions helped me dissolve emotional blocks and rediscover my purpose.',
    gradient: 'from-accent-orange to-primary-purple',
  },
  {
    initials: 'AM',
    role: 'Marketing Manager → Relationship Mentor',
    quote: 'From burnout to balance — Claryntia showed me the power of healing from within.',
    gradient: 'from-secondary-blue to-accent-orange',
  },
];

export function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">
            Real Transformations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories of clarity, healing, and growth from our clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.initials}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full glass-effect border border-card-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl p-8" data-testid={`card-testimonial-${index}`}>
                <CardContent className="p-0">
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-primary-purple/30" />
                  </div>
                  <p className="text-foreground leading-relaxed mb-8 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className={`bg-gradient-to-br ${testimonial.gradient} text-white font-semibold text-lg`}>
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.initials}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
