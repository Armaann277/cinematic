import React from 'react';
import { motion } from 'framer-motion';
import { Diamond, Shield, Zap, Target } from 'lucide-react';

const services = [
  {
    icon: <Diamond className="w-6 h-6 text-primary" />,
    title: "Brand Strategy",
    description: "Defining your position in the market with surgical precision and elite insight."
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Digital Design",
    description: "Creating immersive experiences that captivate and convert high-intent audiences."
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Growth Engineering",
    description: "Advanced technological solutions designed to scale your brand to the next level."
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-[#0a0506]">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h4 className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-4">Core Services</h4>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              We specialize in the extraordinary.
            </h2>
          </div>
          <p className="font-sans text-muted-foreground text-lg max-w-sm md:text-right">
            Tailored solutions for modern founders and creative pioneers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-12 bg-card border border-white/5 rounded-2xl hover:border-primary/30 transition-all duration-500 group"
            >
              <div className="mb-8 p-4 bg-[#1a0a0d] inline-block rounded-xl group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-primary/50 shadow-2xl">
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
              <p className="font-sans text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
