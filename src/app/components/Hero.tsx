import React from 'react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0a0506]">
      {/* Background Texture - Velvet/Luxury Feel */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1761078739411-2ccb6e956c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Velvet Texture"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Royal Lighting - Deep Wine to Black Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(158,27,50,0.15)_0%,rgba(10,5,6,1)_70%)]" />
      
      {/* Cinematic Top Light Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(245,225,225,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Abstract Royal Accent Lines (Subtle Filigree) */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9e1b32" />
            <stop offset="100%" stopColor="#f5e1e1" />
          </linearGradient>
        </defs>
        <path d="M0,100 Q500,0 1000,100" fill="none" stroke="url(#gold-grad)" strokeWidth="0.5" />
        <path d="M0,900 Q500,1000 1000,900" fill="none" stroke="url(#gold-grad)" strokeWidth="0.5" />
      </svg>
      
      <div className="container relative z-10 px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Subtle Crest Emblem Abstract */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-12 h-12 border-2 border-primary rotate-45 mx-auto mb-8 flex items-center justify-center"
          >
            <div className="w-6 h-6 bg-primary opacity-50" />
          </motion.div>

          <h4 className="font-sans text-xs md:text-sm tracking-[0.5em] uppercase text-primary mb-8 font-medium">
            The Sovereign Choice for Visionaries
          </h4>
          
          <h1 className="font-serif text-6xl md:text-9xl lg:text-[10rem] leading-[0.9] text-foreground mb-12 relative">
            <span className="block mb-2">Rule the</span>
            <span className="italic text-accent relative">
              Kingdom
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute -bottom-2 left-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </span>
          </h1>

          <p className="font-sans text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed font-light">
            We architect digital empires for the few who lead. 
            Elite strategy meets uncompromising luxury.
          </p>
          
          <div className="flex flex-col md:row items-center justify-center gap-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-5 bg-primary text-primary-foreground font-sans text-sm tracking-[0.3em] uppercase rounded-full overflow-hidden shadow-[0_20px_40px_rgba(158,27,50,0.4)]"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">Claim Your Throne</span>
            </motion.button>
            
            <button className="px-12 py-5 border border-white/10 text-foreground font-sans text-sm tracking-[0.3em] uppercase rounded-full hover:bg-white/5 transition-all duration-500 backdrop-blur-sm">
              Explore the Archive
            </button>
          </div>
        </motion.div>
      </div>

      {/* Framed Cinematic Image Section */}
      <motion.div 
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 pointer-events-none"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.8 }}
      >
        <div className="relative aspect-[21/9] rounded-t-[40px] md:rounded-t-[80px] overflow-hidden border-x border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1729179664878-49b8cc390d2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Royal Tech Aesthetic"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0506] via-[#0a0506]/40 to-transparent" />
          
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
        </div>
      </motion.div>

      {/* Side Vignette Overlays for extra depth */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0506] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0506] to-transparent pointer-events-none" />
    </section>
  );
};
