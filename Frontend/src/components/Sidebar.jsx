import React from 'react';

export default function Sidebar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) {
  const navItems = [
    { id: 'calorie-tracker-and-dashboard', icon: 'dashboard', label: 'Overview & Tracking' },
    { id: 'diet-plans', icon: 'restaurant_menu', label: 'My Diet Sheet' },
    { id: 'dietitian-booking', icon: 'calendar_month', label: 'Dietitian Visits' },
    { id: 'vitals-biometrics', icon: 'vital_signs', label: 'Vitals & Biometrics' },
    { id: 'prescribed-recipes', icon: 'menu_book', label: 'Prescribed Recipes' },
    { id: 'home', icon: 'travel_explore', label: 'Public Site' },
  ];

  const handleItemClick = (id) => {
    if (id === 'vitals-biometrics') {
      alert('Vitals & Biometrics Panel: Blood glucose (98 mg/dL fasting), Blood Pressure (118/76 mmHg), HbA1c (5.8%). All parameters optimal.');
    } else if (id === 'prescribed-recipes') {
      setActivePage('home');
      setTimeout(() => {
        document.getElementById('healthy-recipes')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setActivePage(id);
    }
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Aside Container */}
      <aside 
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between py-space-lg shadow-[1px_0_12px_rgba(45,74,62,0.04)] transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo & Header */}
          <div 
            className="px-space-lg mb-space-lg flex items-center justify-between cursor-pointer"
            onClick={() => handleItemClick('home')}
          >
            <div className="flex items-center gap-space-sm">
              <img 
                alt="The Diet Secrets Logo" 
                className="h-7 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6SjCRfZDdlKRTDpDsZJi54633yLx2Y4mzJB9H9PKRR_10EtX34Ble-OfLTJYOCfAskWihKdqW2YLEtTgOm1ywv7q3F7oECdnVuXDqi4_kOjiWKIgSZ9awtbWUheiJO9D8ZbFVsAEMgva6MXxND-7iUoT_nxww_f8QutlvARyvwgcJCX4cXkQYl6xDv5GHj5rJhFZvVaJWJAl6aZOOqWwhCGsFi00xrnmOtPq3sg"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-tight">
                  THE DIET SECRETS
                </span>
                <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">
                  PATIENT PORTAL
                </span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button 
              className="lg:hidden text-primary p-1"
              onClick={(e) => { e.stopPropagation(); setIsMobileOpen(false); }}
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 px-space-md">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-space-sm px-4 py-2.5 rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span className="font-label-lg text-label-lg">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Support at Bottom */}
        <div className="px-space-md space-y-space-sm">
          <div className="p-space-sm rounded-lg bg-surface-container-high flex items-center gap-space-sm">
            <img 
              alt="Profile" 
              className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-secondary" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfD_M4cBF-72fHDnElyhWTQZ4HjcgRgKJjEhbBhfdMsMk3UQhzdaMYozGZd9ck5N7IfEThXdJntur_9eI7gFotUztYaUDOT9z5DAdCVyOWnU0NeoABL2pjbvzerGqIrTv2b468jOGA0vcTlqGeQvnKqbv5K68VAjqCNPlRahM5evRIz8NzzodnkMNJwhtk50alD_C40rspbD32RBQl85tPtveGX3-Mr8OW150q8g"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                Priyanshu (Patient)
              </span>
              <span className="font-caption text-caption text-secondary">
                Plan: Metabolic Shield
              </span>
            </div>
          </div>
          
          <div className="px-space-sm flex items-center justify-between text-on-surface-variant font-caption text-caption">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span> 
              IDA Verified
            </span>
            <button 
              onClick={() => handleItemClick('home')}
              className="hover:text-on-surface underline"
            >
              Help &amp; FAQ
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

