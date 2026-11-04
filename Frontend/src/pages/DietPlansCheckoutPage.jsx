import React, { useState } from 'react';
import { individualPlans, familyPlan } from '../data/dietPlans';

export default function DietPlansCheckoutPage({ setActivePage, selectedPlanId, setSelectedPlanId }) {
  const [planType, setPlanType] = useState('individual'); // 'individual' | 'family'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'hormonal' | 'metabolic' | 'fatloss'
  const [activePlanId, setActivePlanId] = useState(selectedPlanId || 'pcos');
  const [selectedPayment, setSelectedPayment] = useState('upi'); // 'upi' | 'card' | 'emi'
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Active plan details
  const activePlan = planType === 'family' 
    ? familyPlan 
    : individualPlans.find((p) => p.id === activePlanId) || individualPlans[1];

  const filteredPlans = individualPlans.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleSelectPlan = (planId) => {
    setActivePlanId(planId);
    if (setSelectedPlanId) {
      setSelectedPlanId(planId);
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      alert(`Redirecting to Razorpay / UPI Secure Gateway for: ${activePlan.title} (₹${activePlan.price})\n\nOnce completed, your 5-minute clinical health intake assessment will automatically open!`);
      setCheckoutComplete(false);
    }, 400);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================= */}
      {/* VALUE PROPOSITION & HEADER HERO */}
      {/* ========================================================= */}
      <section className="relative w-full overflow-hidden bg-surface py-space-xl px-margin-mobile lg:px-margin">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-secondary-container/60 text-secondary mb-space-md shadow-sm">
            <span className="material-symbols-outlined text-sm font-semibold">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-secondary-fixed-variant">
              Evidence-Based Clinical Dietetics
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary max-w-4xl tracking-tight mb-space-sm font-bold">
            Scientifically Formulated, 100% Personalized Clinical Diet Plans
          </h1>
          
          <p className="font-body-xl text-body-lg lg:text-body-xl text-on-surface-variant max-w-2xl mb-space-lg leading-relaxed">
            No starvation. No crash diets. Real Indian meals tailored to your genetics, metabolic profile, and diagnostic reports.
          </p>

          {/* Toggle: Individual vs Couple / Family */}
          <div className="inline-flex items-center p-1.5 bg-surface-container-high rounded-full shadow-inner mb-space-lg">
            <button
              onClick={() => setPlanType('individual')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-label-lg text-label-lg transition-all duration-200 cursor-pointer ${
                planType === 'individual'
                  ? 'bg-primary-container text-on-primary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">person</span>
              Individual Plans
            </button>
            <button
              onClick={() => setPlanType('family')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-label-lg text-label-lg transition-all duration-200 cursor-pointer ${
                planType === 'family'
                  ? 'bg-primary-container text-on-primary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">diversity_1</span>
              Couple &amp; Family Protocols
              <span className="font-caption text-caption px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold tracking-tight">
                SAVE 25%
              </span>
            </button>
          </div>

          {/* Trust Bar Chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md w-full max-w-4xl pt-space-xs text-left">
            <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3 border border-surface-container-high/40">
              <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-lg">medical_services</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">IDA Accredited</p>
                <p className="font-caption text-caption text-on-surface-variant">Qualified Clinical Nutritionists</p>
              </div>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3 border border-surface-container-high/40">
              <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-lg">restaurant</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Real Desi Cuisine</p>
                <p className="font-caption text-caption text-on-surface-variant">Rotis, Dal, Sabzi &amp; Staples</p>
              </div>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3 border border-surface-container-high/40">
              <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-lg">biotech</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Bloodwork Synced</p>
                <p className="font-caption text-caption text-on-surface-variant">Lab report biomarker adjustments</p>
              </div>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3 border border-surface-container-high/40">
              <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-lg">forum</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Daily WhatsApp SOS</p>
                <p className="font-caption text-caption text-on-surface-variant">Real-time diet &amp; dining advice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* INTERACTIVE MARKETPLACE & DRAWER LAYOUT */}
      {/* ========================================================= */}
      <section className="w-full px-margin-mobile lg:px-margin pb-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column: Plans Grid */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            
            {/* Filter Bar (Only in Individual Mode) */}
            {planType === 'individual' && (
              <div className="flex items-center justify-between flex-wrap gap-space-sm pb-space-xs">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Protocol Catalog
                  </span>
                  <p className="font-headline-md text-headline-md text-primary font-bold">
                    Specialized Clinical Programs
                  </p>
                </div>
                <div className="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-full text-on-surface-variant">
                  {[
                    { id: 'all', label: 'All Plans' },
                    { id: 'hormonal', label: 'Hormonal & PCOS' },
                    { id: 'metabolic', label: 'Diabetes & Metabolic' },
                    { id: 'fatloss', label: 'Fat Loss' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                          : 'hover:text-on-surface'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* If Couple / Family Mode is selected */}
            {planType === 'family' ? (
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border-2 border-secondary/40 relative">
                <div className="absolute -top-3 right-6 bg-secondary text-on-secondary px-3.5 py-1 rounded-full font-label-sm text-label-sm font-semibold tracking-wide shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">diversity_1</span> 2-MEMBER BUNDLE
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md mb-space-md">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                        {familyPlan.duration}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">• Comprehensive Household Plan</span>
                    </div>
                    <h3 className="font-headline-lg text-headline-lg text-primary font-bold">
                      {familyPlan.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      {familyPlan.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-label-md text-label-md line-through text-outline">₹{familyPlan.orig}</span>
                    <p className="font-headline-xl text-headline-xl text-primary font-bold">₹{familyPlan.price}</p>
                    <span className="font-caption text-caption text-secondary font-semibold">{familyPlan.discount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5 py-space-sm my-space-sm bg-surface-container-low/60 rounded-lg p-space-md">
                  {familyPlan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-secondary text-base mt-0.5">check_circle</span>
                      <span className="font-body-sm text-body-sm text-on-surface">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-space-xs mt-space-xs">
                  <span className="font-caption text-caption text-on-surface-variant">Includes 2 separate diagnostic health portals</span>
                  <button 
                    onClick={handleCheckout}
                    className="font-label-lg text-label-lg bg-primary text-on-primary hover:bg-primary-container px-6 py-2.5 rounded-full transition-all duration-150 shadow-sm flex items-center gap-2 cursor-pointer font-bold"
                  >
                    Select Family Protocol
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Individual Plans List */
              <div className="space-y-space-md">
                {filteredPlans.map((plan) => {
                  const isSelected = activePlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative cursor-pointer border ${
                        isSelected 
                          ? 'ring-2 ring-secondary/40 border-secondary/40' 
                          : 'border-surface-container-high/60'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 right-6 bg-secondary text-on-secondary px-3.5 py-1 rounded-full font-label-sm text-label-sm font-semibold tracking-wide shadow-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">star</span> MOST POPULAR CLINICAL PICK
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md mb-space-md">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                              {plan.duration}
                            </span>
                            {plan.weeklyRate && (
                              <span className="font-label-sm text-label-sm text-on-surface-variant">• {plan.weeklyRate}</span>
                            )}
                            {plan.tag && (
                              <span className="font-label-sm text-label-sm text-on-surface-variant">• {plan.tag}</span>
                            )}
                          </div>
                          <h3 className="font-headline-lg text-headline-lg text-primary font-bold">
                            {plan.title}
                          </h3>
                          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            {plan.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-label-md text-label-md line-through text-outline">₹{plan.orig}</span>
                          <p className="font-headline-xl text-headline-xl text-primary font-bold">₹{plan.price}</p>
                          <span className="font-caption text-caption text-secondary font-semibold">{plan.discount}</span>
                        </div>
                      </div>

                      {/* Feature Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5 py-space-sm my-space-sm bg-surface-container-low/60 rounded-lg p-space-md">
                        {plan.features.map((feat, i) => (
                          <div key={i} className={`flex items-start gap-2 ${i === 4 ? 'md:col-span-2' : ''}`}>
                            <span className="material-symbols-outlined text-secondary text-base mt-0.5">check_circle</span>
                            <span className="font-body-sm text-body-sm text-on-surface">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom row with Doctor/Stat & Select button */}
                      <div className="flex items-center justify-between pt-space-xs mt-space-xs">
                        {plan.leadDoctor ? (
                          <div className="flex items-center gap-2">
                            <img 
                              className="w-8 h-8 rounded-full object-cover" 
                              src={plan.leadDoctor.avatar} 
                              alt={plan.leadDoctor.name} 
                            />
                            <span className="font-caption text-caption text-on-surface-variant">
                              Lead Guide: <strong className="text-on-surface">{plan.leadDoctor.name}</strong>
                            </span>
                          </div>
                        ) : plan.proofStat ? (
                          <span className="font-caption text-caption text-on-surface-variant">
                            <strong className="text-on-surface">94.2%</strong> of enrolled patients reduced insulin/metformin dosage safely.
                          </span>
                        ) : (
                          <span className="font-caption text-caption text-secondary font-semibold">100% Customized Routine</span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPlan(plan.id);
                          }}
                          className={`font-label-lg text-label-lg px-6 py-2.5 rounded-full transition-all duration-150 shadow-sm flex items-center gap-2 cursor-pointer font-bold ${
                            isSelected
                              ? 'bg-primary-container text-on-primary'
                              : 'bg-primary text-on-primary hover:bg-primary-container'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <span>Selected Protocol</span>
                              <span className="material-symbols-outlined text-sm">check</span>
                            </>
                          ) : (
                            <>
                              <span>Select Protocol</span>
                              <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Clinical Process Infographic */}
            <div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm mt-space-md border border-surface-container-high/40">
              <div className="flex items-center gap-2 mb-space-md">
                <span className="material-symbols-outlined text-secondary">timeline</span>
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">How Your Clinical Protocol Is Built</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md relative">
                <div className="flex flex-col gap-1">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">01</span>
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold">Detailed Intake</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Submit medical reports, blood tests, food habits &amp; regional constraints.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">02</span>
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold">Dietitian 1-on-1</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    45-minute video consultation to review lifestyle, triggers and daily routine.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">03</span>
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold">Bespoke Protocol</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Receive personalized 7-day revolving menu, grocery list and supplement guide.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">04</span>
                  <p className="font-label-lg text-label-lg text-on-surface font-semibold">Active Care &amp; SOS</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Daily WhatsApp guidance with weekly biometric calibration &amp; tweaks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Slide-over Checkout & Summary */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-md border border-surface-container-high/60">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">shopping_bag</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">Protocol Checkout</span>
                </div>
                <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-semibold">
                  Instant Access
                </span>
              </div>

              {/* Step 1: Selected Plan Summary */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                    Step 1 • Selected Plan
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">
                    {activePlan.duration}
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-primary font-bold">
                  {activePlan.title}
                </h4>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Clinical Nutrition Therapy</span>
                  <div className="text-right">
                    <span className="font-body-sm text-body-sm line-through text-outline">₹{activePlan.orig}</span>
                    <span className="font-headline-lg text-headline-lg text-primary font-bold ml-1">₹{activePlan.price}</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-surface-container-high/60 flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
                  <span>GST Included (0% Medical Exemption)</span>
                  <span className="text-secondary font-semibold">Free Onboarding</span>
                </div>
              </div>

              {/* Step 2: Intake Questionnaire Teaser */}
              <div className="p-space-md rounded-xl bg-surface-container-high/40 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-secondary text-base">assignment</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Step 2 • Comprehensive Health Intake
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                    After payment, you will complete a 5-minute health assessment (diet preferences, regional staples, food allergies, work routine, and medical reports).
                  </p>
                </div>
              </div>

              {/* Step 3: Payment Method Selector */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                  Step 3 • Select Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('upi')}
                    className={`p-3 rounded-lg text-center transition-all cursor-pointer ${
                      selectedPayment === 'upi'
                        ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg block mb-0.5">qr_code_2</span>
                    <span className="font-label-sm text-label-sm font-semibold">UPI / GPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('card')}
                    className={`p-3 rounded-lg text-center transition-all cursor-pointer ${
                      selectedPayment === 'card'
                        ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg block mb-0.5">credit_card</span>
                    <span className="font-label-sm text-label-sm font-semibold">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('emi')}
                    className={`p-3 rounded-lg text-center transition-all cursor-pointer ${
                      selectedPayment === 'emi'
                        ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg block mb-0.5">calendar_month</span>
                    <span className="font-label-sm text-label-sm font-semibold">No-Cost EMI</span>
                  </button>
                </div>

                {/* EMI Helper pill */}
                <div className="p-2.5 rounded-lg bg-secondary-container/40 flex items-center justify-between text-secondary mt-1">
                  <span className="font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">savings</span>
                    EMI Options available
                  </span>
                  <span className="font-label-sm text-label-sm font-bold">
                    Starting at ₹625 / mo
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-6 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">lock</span>
                <span>Proceed to Secure Payment (₹{activePlan.price})</span>
              </button>

              {/* Security Badges */}
              <div className="grid grid-cols-3 gap-2 pt-space-xs text-center">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-secondary text-base">lock_outline</span>
                  <span className="font-caption text-caption text-on-surface-variant mt-0.5">256-Bit SSL Encrypted</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-secondary text-base">verified_user</span>
                  <span className="font-caption text-caption text-on-surface-variant mt-0.5">100% Certified Dietitians</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-secondary text-base">health_and_safety</span>
                  <span className="font-caption text-caption text-on-surface-variant mt-0.5">7-Day Guarantee</span>
                </div>
              </div>

              {/* Testimonial snippet below checkout */}
              <div className="mt-space-xs p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
                <img 
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-secondary" 
                  alt="Sneha P." 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqpjtx_9Ia5VhO3HrutT7CHF-QVs58xUzWDvRZuOQXXOn7cO_Y082nir9XGEZPmoFhbkLhytXukQziNR8WQPPXq2EFZvduv4z5o5US8E8aj322o2ZbH23Hg55p7WN7WQ23GDxhTIbuycMDZgrIusA2KdLqiNkAIr6R_INXbwSM6SRW6XScRGRUIDBjF_i89fNCiJSMO9L_bzWCtMy5QcUwbLpoWi9dvowHZ6QyQA" 
                />
                <div className="space-y-0.5">
                  <div className="flex text-on-tertiary-container text-xs">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-sm font-fill">star</span>
                    ))}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface italic">
                    "PCOS symptoms vanished in 3 months! My cycle is fully regularized without any harsh medications."
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant font-semibold">
                    — Sneha P., Mumbai
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CLINICAL SUCCESS METRICS / DATA VISUALIZATION SECTION */}
      {/* ========================================================= */}
      <section className="w-full bg-surface-container-low py-space-xl px-margin-mobile lg:px-margin">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Clinical Evidence Base</span>
              <h3 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary font-bold mt-1">
                Verified Patient Outcomes Over 24 Months
              </h3>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Metrics compiled across 14,200+ enrolled patients adhering to The Diet Secrets regional nutrition guidelines.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Metric Card 1 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-semibold">
                    PCOS &amp; Hormonal
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">n = 5,420</span>
                </div>
                <p className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-bold">88.4%</p>
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">Period Cycle Regularization</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Achieved regular 28–32 day menstrual cycles within 120 days of anti-inflammatory dietary intervention.
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-space-md">
                <div className="bg-secondary h-full rounded-full" style={{ width: '88.4%' }}></div>
              </div>
            </div>

            {/* Metric Card 2 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                    Glycemic Control
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">n = 4,110</span>
                </div>
                <p className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-bold">-1.8%</p>
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">Average HbA1c Reduction</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Documented laboratory HbA1c decrease within 16 weeks without sudden carbohydrate elimination.
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-space-md">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>

            {/* Metric Card 3 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-semibold">
                    Fat Loss &amp; Retention
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">n = 6,800</span>
                </div>
                <p className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary font-bold">92.1%</p>
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">1-Year Weight Sustenance</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                  Patients maintained lost weight beyond 12 months with no rebound due to behavior-reconditioning protocols.
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-space-md">
                <div className="bg-secondary h-full rounded-full" style={{ width: '92.1%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FREQUENTLY ASKED CLINICAL QUESTIONS */}
      {/* ========================================================= */}
      <section className="w-full bg-surface py-space-xl px-margin-mobile lg:px-margin">
        <div className="max-w-4xl mx-auto flex flex-col gap-space-md">
          <div className="text-center mb-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Transparent Guidance</span>
            <h3 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary font-bold mt-1">
              Frequently Asked Clinical Questions
            </h3>
          </div>

          <div className="space-y-space-sm">
            <details className="group bg-surface-container-lowest p-space-md rounded-xl shadow-sm cursor-pointer border border-surface-container-high/40" open>
              <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-primary font-semibold list-none">
                <span>Will I have to cook separate meals for myself at home?</span>
                <span className="material-symbols-outlined text-secondary transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
                Never. Our core philosophy is built on home-cooked Indian kitchen reality. Your dietitian structures portion sizes, sabzi preparation methods, and grain swaps directly around whatever is already cooked for your family (Rotis, Dal, Sabzi, Poha, Idlis, Chole, Paneer, Chicken/Fish).
              </p>
            </details>

            <details className="group bg-surface-container-lowest p-space-md rounded-xl shadow-sm cursor-pointer border border-surface-container-high/40">
              <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-primary font-semibold list-none">
                <span>What happens after I make the payment today?</span>
                <span className="material-symbols-outlined text-secondary transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
                Immediately upon successful payment, your dashboard unlocks the Comprehensive Clinical Intake form. You will be prompted to enter your daily routine, food allergies, dietary preference (Veg / Non-Veg / Jain), and upload past medical or blood reports. Within 4 hours, your assigned Senior Clinical Dietitian connects directly over WhatsApp and schedules your introductory 45-minute video strategy call.
              </p>
            </details>

            <details className="group bg-surface-container-lowest p-space-md rounded-xl shadow-sm cursor-pointer border border-surface-container-high/40">
              <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-primary font-semibold list-none">
                <span>Is there a satisfaction or money-back guarantee?</span>
                <span className="material-symbols-outlined text-secondary transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
                Yes. We provide a 7-Day Money-Back Clinical Satisfaction Guarantee. If after your initial consultation and first meal guide review you feel our approach is not tailored to your lifestyle, you can request a 100% refund with zero questions asked.
              </p>
            </details>

            <details className="group bg-surface-container-lowest p-space-md rounded-xl shadow-sm cursor-pointer border border-surface-container-high/40">
              <summary className="flex items-center justify-between font-headline-sm text-headline-sm text-primary font-semibold list-none">
                <span>Can I pause my diet plan if I have to travel or attend a family wedding?</span>
                <span className="material-symbols-outlined text-secondary transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
                Yes. All 12-week and 24-week protocols come with up to 14 days of free subscription pause allowance. Alternatively, your dietitian will furnish custom buffet dining-out strategies and dining survival guides so you can enjoy your travels without pausing progress.
              </p>
            </details>
          </div>

          {/* Need direct assistance callout */}
          <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary">support_agent</span>
              </div>
              <div>
                <p className="font-headline-sm text-headline-sm text-primary font-semibold">Not sure which clinical protocol fits you?</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Speak with our Clinical Intake Coordinator for a 10-minute triage evaluation.</p>
              </div>
            </div>
            <a 
              className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant transition-colors font-label-md text-label-md flex items-center gap-2 shrink-0 font-bold" 
              href="https://wa.me/919820045678?text=Hello%20The%20Diet%20Secrets%20Team%2C%20I%20need%20help%20choosing%20the%20right%20diet%20plan." 
              rel="noopener noreferrer" 
              target="_blank"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

