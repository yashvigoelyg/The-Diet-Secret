import React from 'react';

export default function Footer({ setActivePage }) {
  const handleNav = (pageId) => {
    if (setActivePage) {
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-1px_12px_rgba(45,74,62,0.03)]">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg mb-space-xl">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-space-md">
            <div 
              className="flex items-center gap-space-sm cursor-pointer"
              onClick={() => handleNav('home')}
            >
              <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-sm">eco</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary">THE DIET SECRETS</span>
            </div>
            
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Premier Indian clinical dietetics &amp; metabolic nutrition platform. Evidence-based medical nutrition therapy personalized to Indian regional dietary traditions and biological parameters.
            </p>
            
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full">
                ICMR Guided
              </span>
              <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full">
                IDA Accredited
              </span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface px-3 py-1 rounded-full">
                ISO 9001:2015
              </span>
            </div>
            
            <div className="pt-space-xs">
              <a 
                className="inline-flex items-center gap-space-xs font-label-md text-label-md bg-secondary text-on-secondary px-4 py-2 rounded-full hover:bg-on-secondary-fixed-variant transition-colors shadow-sm" 
                href="https://wa.me/919820045678" 
                rel="noopener noreferrer" 
                target="_blank"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                WhatsApp Dietitian Support
              </a>
            </div>
          </div>

          {/* Clinical Programs */}
          <div className="space-y-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-primary">Clinical Programs</h4>
            <ul className="space-y-space-xs">
              <li 
                onClick={() => handleNav('diet-plans')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                PCOS &amp; Hormonal Balance
              </li>
              <li 
                onClick={() => handleNav('diet-plans')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Type 2 Diabetes Reversal
              </li>
              <li 
                onClick={() => handleNav('diet-plans')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Fat Loss &amp; Body Recomp
              </li>
              <li 
                onClick={() => handleNav('diet-plans')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Thyroid Optimization
              </li>
              <li 
                onClick={() => handleNav('diet-plans')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Cardiac Health Nutrition
              </li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-primary">Regional Hubs</h4>
            <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <p><span className="font-semibold text-on-surface">Mumbai:</span> Bandra West, Linking Rd</p>
              <p><span className="font-semibold text-on-surface">Bengaluru:</span> Indiranagar 100ft Rd</p>
              <p><span className="font-semibold text-on-surface">Delhi NCR:</span> Connaught Place, Barakhamba</p>
              <p><span className="font-semibold text-on-surface">Hyderabad:</span> Jubilee Hills, Rd No. 36</p>
            </div>
            <div className="pt-space-xs">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Central Support Desk</p>
              <p className="font-body-md text-body-md text-on-surface font-semibold">+91 98200 45678</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">care@thedietsecrets.in</p>
            </div>
          </div>

          {/* Platform & Tools */}
          <div className="space-y-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-primary">Platform &amp; Tools</h4>
            <ul className="space-y-space-xs">
              <li 
                onClick={() => handleNav('calorie-tracker-and-dashboard')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Macro &amp; Calorie Counter
              </li>
              <li 
                onClick={() => handleNav('home')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Indian Food Glycemic Index
              </li>
              <li 
                onClick={() => handleNav('home')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                BMR &amp; TDEE Calculator
              </li>
              <li 
                onClick={() => handleNav('dietitian-booking')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Nutritional Lab Assessment
              </li>
              <li 
                onClick={() => handleNav('dietitian-booking')}
                className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Dietitian Peer Review Board
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Clinical Disclaimer Card */}
        <div className="p-space-md rounded-xl bg-surface-container-high/60 mb-space-lg">
          <div className="flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-lg shrink-0 mt-0.5">verified_user</span>
            <p className="font-caption text-caption text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Emergency Clinical Disclaimer:</strong> Dietary plans, meal guides, and consultation insights provided by The Diet Secrets are for nutritional therapy and metabolic health optimization only. They are not intended as emergency acute medical care. If you are experiencing diabetic ketoacidosis, severe chest pain, extreme glycemic volatility, or acute medical distress, please contact your nearest hospital emergency department immediately.
            </p>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md shadow-[0_-1px_0_rgba(45,74,62,0.05)]">
          <p className="font-label-md text-label-md text-on-surface-variant">
            © 2025 The Diet Secrets HealthTech Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-space-md font-label-md text-label-md text-on-surface-variant">
            <span className="hover:text-on-surface cursor-pointer">Privacy Policy</span>
            <span className="hover:text-on-surface cursor-pointer">Clinical Protocols</span>
            <span className="hover:text-on-surface cursor-pointer">Terms of Care</span>
            <span className="hover:text-on-surface cursor-pointer">Grievance Redressal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

