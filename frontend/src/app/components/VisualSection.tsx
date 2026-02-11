import React from 'react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export const VisualSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10 aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1663672937496-f53fedcacf66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Luxury Fashion"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#9e1b3222] mix-blend-overlay" />
            </motion.div>
            
            {/* Secondary Floating Image */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -right-10 w-2/3 aspect-square overflow-hidden rounded-2xl border-8 border-[#0a0506] shadow-2xl"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1749766878223-6ceae855b28b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Minimalist Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-6">Our Philosophy</h4>
              <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
                Crafting the future of <span className="italic">Luxury Tech.</span>
              </h2>
              <p className="font-sans text-lg text-muted-foreground mb-10 leading-relaxed">
                We believe that true luxury is found in the details. Our design process is meticulous, our development is flawless, and our vision is uncompromising. 
              </p>
              
              <ul className="space-y-6 mb-12">
                {['Unparalleled Performance', 'Editorial-Grade Design', 'Exclusive Brand Positioning'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-foreground font-sans tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <button className="group flex items-center gap-4 font-sans text-sm tracking-widest uppercase hover:text-primary transition-colors">
                Explore our process
                <div className="w-12 h-[1px] bg-border group-hover:bg-primary group-hover:w-20 transition-all duration-500" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
