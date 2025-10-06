import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import type { Package } from '@shared/schema';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function Packages() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showAll, setShowAll] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const { toast } = useToast();
  
  const { data: packages = [], isLoading } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
  });

  const displayedPackages = showAll ? packages : packages.slice(0, 3);

  const handleGetStarted = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsPaymentDialogOpen(true);
  };

  const handlePayment = async () => {
    if (!selectedPackage) return;

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPackage.price,
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          customerInfo,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Claryntia',
        description: selectedPackage.name,
        order_id: orderData.orderId,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        theme: {
          color: '#6A1B9A',
        },
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                packageId: selectedPackage.id,
                packageName: selectedPackage.name,
                customerInfo,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast({
                title: "Payment Successful!",
                description: "Your payment has been processed successfully. We'll contact you shortly.",
              });
              setIsPaymentDialogOpen(false);
              setCustomerInfo({ name: '', email: '', phone: '' });
            } else {
              throw new Error(verifyData.message || 'Payment verification failed');
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support with your payment details.",
              variant: "destructive",
            });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast({
              title: "Payment Cancelled",
              description: "You have cancelled the payment process.",
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <section id="packages" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-packages-title">
            Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect package for your transformation journey
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading packages...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No packages available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="h-full"
                >
                  <Card 
                    className="h-full flex flex-col glass-effect border border-card-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl"
                    data-testid={`card-package-${index}`}
                  >
                    <CardHeader className="space-y-0 pb-6 pt-8">
                      <CardTitle className="font-serif text-2xl mb-2">{pkg.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                      {pkg.duration && (
                        <p className="text-xs text-muted-foreground mb-4">{pkg.duration}</p>
                      )}
                      <div className="font-serif text-4xl font-bold text-primary-purple" data-testid={`price-${index}`}>
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary-purple/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-primary-purple" />
                            </div>
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        onClick={() => handleGetStarted(pkg)}
                        className="w-full rounded-full py-6 bg-primary-purple text-white"
                        data-testid={`button-get-started-${index}`}
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {packages.length > 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center mt-12"
              >
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  size="lg"
                  className="glass-effect"
                  data-testid="button-see-more-packages"
                >
                  {showAll ? 'Show Less' : 'See More'}
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent data-testid="dialog-payment">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              {selectedPackage && (
                <>
                  <span className="font-semibold">{selectedPackage.name}</span> - ₹{selectedPackage.price.toLocaleString('en-IN')}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                data-testid="input-customer-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                data-testid="input-customer-email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                maxLength={10}
                data-testid="input-customer-phone"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentDialogOpen(false)}
              disabled={isProcessing}
              data-testid="button-cancel-payment"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-primary-purple text-white"
              data-testid="button-proceed-payment"
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
