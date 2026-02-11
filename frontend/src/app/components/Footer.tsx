import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-20 bg-[#0a0506] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl tracking-widest uppercase mb-8">Brandrush</h3>
            <p className="font-sans text-muted-foreground max-w-sm leading-relaxed mb-8">
              A creative agency dedicated to high-end digital excellence and strategic brand dominance.
            </p>

            {/* Newsletter Subscription */}
            <div className="max-w-md">
              <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary mb-4 opacity-80">Join the Inner Circle</h4>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const emailInput = form.querySelector('input') as HTMLInputElement;
                  const email = emailInput.value;
                  const button = form.querySelector('button') as HTMLButtonElement;

                  try {
                    button.disabled = true;
                    button.innerText = 'WAIT...';

                    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                    const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email })
                    });

                    const data = await response.json();

                    if (data.success) {
                      emailInput.value = '';
                      alert('Welcome to the inner circle.');
                    } else {
                      alert(data.message || 'Transmission failed.');
                    }
                  } catch (err) {
                    alert('Network interference detected.');
                  } finally {
                    button.disabled = false;
                    button.innerText = 'JOIN';
                  }
                }}
                className="flex gap-4 p-1 border-b border-white/20 focus-within:border-primary transition-all duration-500"
              >
                <input
                  type="email"
                  placeholder="EMAIL@DOMAIN.COM"
                  required
                  className="bg-transparent border-none outline-none font-sans text-[10px] tracking-widest text-white placeholder:text-muted-foreground flex-grow py-2"
                />
                <button type="submit" className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary hover:text-white transition-colors px-4">
                  JOIN
                </button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white mb-6">Navigation</h4>
            <ul className="space-y-4 font-sans text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Work</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Process</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Journal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white mb-6">Contact</h4>
            <ul className="space-y-4 font-sans text-sm text-muted-foreground">
              <li>New York, NY</li>
              <li>hello@brandrush.com</li>
              <li>+1 (212) 555-0198</li>
              <li>@brandrush_agency</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            © 2026 Brandrush Creative Agency. All Rights Reserved.
          </p>
          <div className="flex gap-8 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
