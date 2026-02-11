import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useState } from 'react';

export const CTASection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      project_type: formData.get('project_type') as string,
      budget_range: formData.get('budget_range') as string,
      timeline: formData.get('timeline') as string,
      description: formData.get('description') as string,
    };

    try {
      const response = await fetch('http://localhost:3001/api/projects/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message || 'Transmission failed. Please try again.');
      }
    } catch (err) {
      setError('Network interference detected. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-40 relative">
      <div className="absolute inset-0 bg-[#1a0a0d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#9e1b3233_0%,transparent_50%)]" />

      <div className="container relative z-10 px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-serif text-5xl md:text-8xl mb-12 leading-none">
            Are you ready to be <br />
            <span className="italic text-accent">Unforgettable?</span>
          </h2>
          <p className="font-sans text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Limited slots available for creative partnerships in 2026. Secure your place at the forefront of innovation.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <button className="px-16 py-6 bg-foreground text-background font-sans text-sm tracking-[0.3em] uppercase rounded-full hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl">
                Inquire Now
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#0a0506] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl tracking-wider">Start Your Application</DialogTitle>
                <DialogDescription className="font-sans text-muted-foreground tracking-wide">
                  Provide the details of your vision. We only accept 5 partnerships per quarter.
                </DialogDescription>
              </DialogHeader>

              {isSuccess ? (
                <div className="py-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <div className="w-10 h-10 rounded-full bg-primary animate-pulse" />
                    </div>
                    <h3 className="font-serif text-3xl italic">Transmission Received</h3>
                    <p className="font-sans text-muted-foreground whitespace-pre-line">
                      Your vision has been recorded.{"\n"}
                      Our curators will review your application within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSuccess(false)}
                      className="rounded-full px-8 border-white/20 hover:bg-white hover:text-black"
                    >
                      Close
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase opacity-50">Full Name</Label>
                      <Input id="name" name="name" required placeholder="Alexander Thorne" className="bg-white/5 border-white/10 rounded-none h-12" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase opacity-50">Email Address</Label>
                      <Input id="email" name="email" type="email" required placeholder="alex@visionary.com" className="bg-white/5 border-white/10 rounded-none h-12" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="company" className="text-[10px] tracking-[0.2em] uppercase opacity-50">Company / Brand</Label>
                      <Input id="company" name="company" placeholder="LVMH Group" className="bg-white/5 border-white/10 rounded-none h-12" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="project_type" className="text-[10px] tracking-[0.2em] uppercase opacity-50">Project Type</Label>
                      <Input id="project_type" name="project_type" placeholder="Digital Identity" className="bg-white/5 border-white/10 rounded-none h-12" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="budget_range" className="text-[10px] tracking-[0.2em] uppercase opacity-50">Budget Range</Label>
                      <Input id="budget_range" name="budget_range" placeholder="$50k - $200k" className="bg-white/5 border-white/10 rounded-none h-12" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="timeline" className="text-[10px] tracking-[0.2em] uppercase opacity-50">Expected Timeline</Label>
                      <Input id="timeline" name="timeline" placeholder="3-6 Months" className="bg-white/5 border-white/10 rounded-none h-12" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-[10px] tracking-[0.2em] uppercase opacity-50">Vision Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      placeholder="Describe the emotional bridge you want to build..."
                      className="bg-white/5 border-white/10 rounded-none min-h-[120px] resize-none"
                    />
                  </div>

                  {error && <p className="text-primary text-xs tracking-widest uppercase">{error}</p>}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 rounded-none font-sans text-xs tracking-[0.4em] uppercase"
                  >
                    {isSubmitting ? 'Recording Transmission...' : 'Submit Application'}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <p className="mt-12 font-sans text-xs tracking-widest text-muted-foreground uppercase opacity-50">
            Strictly Invitation or Application Only
          </p>
        </motion.div>
      </div>
    </section>
  );
};
