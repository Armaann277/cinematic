import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { ServicesSection } from '@/app/components/ServicesSection';
import { VisualSection } from '@/app/components/VisualSection';
import { CTASection } from '@/app/components/CTASection';
import { Footer } from '@/app/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Exclusive Brand Affiliates */}
        <section className="py-24 border-y border-white/5 bg-[#0a0506] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(158,27,50,0.03)_0%,transparent_70%)]" />
          <div className="container px-6 mx-auto relative z-10">
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 grayscale hover:opacity-40 transition-all duration-1000">
              <span className="font-serif text-xl tracking-[0.5em] uppercase">Hermès</span>
              <span className="font-serif text-xl tracking-[0.5em] uppercase">Rolex</span>
              <span className="font-serif text-xl tracking-[0.5em] uppercase">Celine</span>
              <span className="font-serif text-xl tracking-[0.5em] uppercase">Cartier</span>
              <span className="font-serif text-xl tracking-[0.5em] uppercase">Patek</span>
            </div>
          </div>
        </section>

        <ServicesSection />
        
        <VisualSection />
        
        {/* Exclusive Quote Section */}
        <section className="py-32 bg-[#0a0506]">
          <div className="container px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-6xl text-primary font-serif mb-8 block opacity-50">“</span>
              <p className="font-serif text-3xl md:text-5xl leading-tight mb-12">
                Brandrush doesn't just design interfaces; they design the emotional bridge between a visionary brand and its audience.
              </p>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Julian Thorne — Creative Director, Avant Garde
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
