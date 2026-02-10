import React from 'react';
import { motion } from 'framer-motion';

export const CTASection = () => {
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
          
          <button className="px-16 py-6 bg-foreground text-background font-sans text-sm tracking-[0.3em] uppercase rounded-full hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl">
            Inquire Now
          </button>
          
          <p className="mt-12 font-sans text-xs tracking-widest text-muted-foreground uppercase opacity-50">
            Strictly Invitation or Application Only
          </p>
        </motion.div>
      </div>
    </section>
  );
};
