import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-16">
        {/* Glass effect on scroll could be added, but minimal is better */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-white/5 md:bg-transparent md:backdrop-blur-none md:border-none" />
        
        <div className="relative z-10 flex items-center gap-2">
          <span className="text-xl md:text-2xl font-serif tracking-[0.3em] uppercase text-white font-medium">Brandrush</span>
        </div>
        
        <div className="hidden md:flex relative z-10 items-center gap-12 font-sans text-[10px] tracking-[0.4em] uppercase text-white/50">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#work" className="hover:text-primary transition-colors">Work</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <button className="px-10 py-3 border border-white/10 font-sans text-[9px] tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-700 rounded-full backdrop-blur-sm">
            Contact
          </button>
        </div>

        <button 
          className="md:hidden relative z-10 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-10"
          >
            <a href="#services" onClick={() => setIsOpen(false)} className="font-serif text-4xl hover:text-primary transition-colors">Services</a>
            <a href="#work" onClick={() => setIsOpen(false)} className="font-serif text-4xl hover:text-primary transition-colors">Work</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="font-serif text-4xl hover:text-primary transition-colors">About</a>
            <button className="mt-8 px-10 py-4 bg-primary text-white font-sans text-sm tracking-widest uppercase rounded-full">
              Get in touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
