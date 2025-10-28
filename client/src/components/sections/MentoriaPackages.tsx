import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import type { MentoriaPackage } from '@shared/schema';
import { MentoriaPaymentModal } from '@/components/MentoriaPaymentModal';

export function MentoriaPackages() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedPackage, setSelectedPackage] = useState<MentoriaPackage | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: packages, isLoading } = useQuery<MentoriaPackage[]>({
    queryKey: ["/api/mentoria-packages/active"],
  });

  const handleBookNow = (pkg: MentoriaPackage) => {
    setSelectedPackage(pkg);
    setIsPaymentModalOpen(true);
  };

  if (isLoading) {
    return null;
  }

  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section id="mentoria-packages" className="py-24 md:py-32 bg-gradient-to-br from-primary-purple/5 via-background to-secondary-blue/5" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-mentoria-packages-title">
            Mentoria Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the right Mentoria plan for your career growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card 
                className={`h-full glass-effect shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl flex flex-col ${
                  pkg.isPopular ? 'border-2 border-primary-purple' : 'border border-card-border'
                }`}
                data-testid={`card-mentoria-package-${pkg.id}`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-purple to-accent-orange text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-white" />
                      Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="space-y-2">
                  <CardTitle className="font-serif text-2xl">{pkg.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{pkg.category}</div>
                  <div className="pt-2">
                    <div className="text-3xl font-bold text-primary-purple">
                      ₹{pkg.price.toLocaleString()}
                    </div>
                  </div>
                  <CardDescription className="text-sm">{pkg.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground">Features:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary-purple to-secondary-blue text-white rounded-full"
                    onClick={() => handleBookNow(pkg)}
                    data-testid={`button-book-${pkg.id}`}
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedPackage && (
        <MentoriaPaymentModal
          open={isPaymentModalOpen}
          onOpenChange={setIsPaymentModalOpen}
          package={selectedPackage}
        />
      )}
    </section>
  );
}
