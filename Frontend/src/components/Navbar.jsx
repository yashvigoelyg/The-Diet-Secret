import React, { useState } from 'react';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'diet-plans', label: 'Diet Plans' },
    { id: 'dietitian-booking', label: 'Dietitian Booking' },
    { id: 'calorie-tracker-and-dashboard', label: 'Calorie Tracker & Dashboard' },
    { id: 'healthy-recipes', label: 'Healthy Recipes' },
    { id: 'bmi-and-health-tools', label: 'BMI & Health Tools' },
    { id: 'about-us', label: 'About Us' },
  ];

  const handleNavClick = (id) => {
    if (id === 'healthy-recipes') {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          document.getElementById('healthy-recipes')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('healthy-recipes')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'bmi-and-health-tools') {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          document.getElementById('bmi-calculator')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('bmi-calculator')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'about-us') {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActivePage(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(45,74,62,0.06)]">
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-md">
        {/* Brand / Logo */}
        <div 
          className="flex items-center gap-space-sm shrink-0 cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          <img 
            alt="The Diet Secrets Logo" 
            className="h-8 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6SjCRfZDdlKRTDpDsZJi54633yLx2Y4mzJB9H9PKRR_10EtX34Ble-OfLTJYOCfAskWihKdqW2YLEtTgOm1ywv7q3F7oECdnVuXDqi4_kOjiWKIgSZ9awtbWUheiJO9D8ZbFVsAEMgva6MXxND-7iUoT_nxww_f8QutlvARyvwgcJCX4cXkQYl6xDv5GHj5rJhFZvVaJWJAl6aZOOqWwhCGsFi00xrnmOtPq3sg"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-tight">
              THE DIET SECRETS
            </span>
            <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">
              CLINICAL NUTRITION &amp; WELLNESS
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-space-lg">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors font-label-md text-label-md relative py-1 ${
                  isActive
                    ? 'text-primary font-semibold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Profile */}
        <div className="flex items-center gap-space-md shrink-0">
          <button
            onClick={() => handleNavClick('dietitian-booking')}
            className="hidden sm:inline-flex items-center justify-center font-label-lg text-label-lg bg-primary-container text-on-primary px-6 py-2.5 rounded-full shadow-[0_4px_14px_rgba(45,74,62,0.18)] hover:bg-primary transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Book Consultation
          </button>
          
          {/* User Profile Avatar with Live Status Ring */}
          <div 
            className="relative flex items-center justify-center shrink-0 cursor-pointer"
            onClick={() => handleNavClick('calorie-tracker-and-dashboard')}
            title="Open Patient Portal / Dashboard"
          >
            <img 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(45,74,62,0.12)] ring-2 ring-transparent hover:ring-secondary transition-all" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfD_M4cBF-72fHDnElyhWTQZ4HjcgRgKJjEhbBhfdMsMk3UQhzdaMYozGZd9ck5N7IfEThXdJntur_9eI7gFotUztYaUDOT9z5DAdCVyOWnU0NeoABL2pjbvzerGqIrTv2b468jOGA0vcTlqGeQvnKqbv5K68VAjqCNPlRahM5evRIz8NzzodnkMNJwhtk50alD_C40rspbD32RBQl85tPtveGX3-Mr8OW150q8g"
            />
            <span 
              className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-surface-container-lowest" 
              title="Active Nutrition Track"
            ></span>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-primary focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-t border-surface-container-high px-margin-mobile py-space-md shadow-xl flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left px-3 py-2.5 rounded-lg text-body-md transition-colors ${
                activePage === item.id
                  ? 'bg-secondary-container text-on-secondary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('dietitian-booking')}
            className="mt-2 w-full text-center font-label-lg text-label-lg bg-primary text-on-primary py-3 rounded-full shadow-md"
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
}

