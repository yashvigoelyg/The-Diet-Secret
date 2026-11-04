import React, { useState, useId } from 'react';
import { superfoodRecipes } from '../data/recipes';
import { clinicalTransformations } from '../data/transformations';

export default function HomePage({ setActivePage, onSelectPlan, onSelectDoctor }) {
  // Asian-Indian BMI Calculator State
  const [height, setHeight] = useState(172);
  const [weight, setWeight] = useState(74);
  const [healthObjective, setHealthObjective] = useState('Fat Loss & Metabolic Conditioning');

  // Compute Asian-Indian BMI
  const heightMeters = (parseFloat(height) || 0) / 100;
  const weightKg = parseFloat(weight) || 0;
  const bmiValue = heightMeters > 0.5 && weightKg > 20 
    ? (weightKg / (heightMeters * heightMeters)).toFixed(1) 
    : '0.0';
  const numericBmi = parseFloat(bmiValue);

  let bmiStatus = 'Indian Cutoff: Healthy Weight';
  let bmiBadgeClass = 'bg-secondary text-on-secondary';

  if (numericBmi < 18.5) {
    bmiStatus = 'Indian Cutoff: Underweight';
    bmiBadgeClass = 'bg-surface-container-high text-on-surface';
  } else if (numericBmi <= 22.9) {
    bmiStatus = 'Indian Cutoff: Healthy Weight';
    bmiBadgeClass = 'bg-secondary text-on-secondary';
  } else if (numericBmi <= 24.9) {
    bmiStatus = 'Indian Cutoff: Overweight';
    bmiBadgeClass = 'bg-tertiary-fixed text-on-tertiary-fixed';
  } else {
    bmiStatus = 'Indian Cutoff: High Metabolic Risk';
    bmiBadgeClass = 'bg-error text-on-error';
  }

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface to-surface-container-low/40 pb-space-xl">
        {/* Ambient organic light blooms */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-space-lg lg:pt-space-xl">
          {/* Clinical Credibility Badges */}
          <div className="flex flex-wrap items-center gap-space-xs md:gap-space-sm mb-space-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm shadow-sm">
              <span className="material-symbols-outlined text-sm font-fill">verified</span>
              ICMR &amp; IDA Certified Dietitians
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm shadow-sm">
              <span className="material-symbols-outlined text-sm text-secondary">eco</span>
              Customized Indian Regional Diets
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm shadow-sm">
              <span className="material-symbols-outlined text-sm font-fill">award_star</span>
              98% Clinical Success Rate
            </span>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-space-md">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-label-md">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Evidence-Based Medical Nutrition Therapy
              </div>
              
              <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-primary tracking-tight max-w-2xl font-bold">
                Your Health, Your Journey, <br className="hidden sm:block" />
                <span className="text-secondary italic font-serif">Our Nutrition Expertise.</span>
              </h1>
              
              <p className="font-body-xl text-body-xl text-on-surface-variant max-w-xl leading-relaxed">
                Discover the secrets of sustainable vitality with tailored clinical dietary protocols, biomarker-aligned meal structures, and compassionate 1-on-1 guidance from India’s foremost Registered Dietitians.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <button
                  onClick={() => navigateTo('dietitian-booking')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                </button>
                <button
                  onClick={() => navigateTo('diet-plans')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg hover:bg-surface-container transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>Explore Diet Plans</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              {/* Micro Proof Bar */}
              <div className="grid grid-cols-3 gap-space-sm pt-space-md max-w-lg">
                <div className="flex flex-col">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">15,000+</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Lives Transformed</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">4.9/5</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Patient Rating</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">28+ Days</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Habit Reset</span>
                </div>
              </div>
            </div>

            {/* Right Column: Composite Dashboard Preview */}
            <div className="lg:col-span-5 relative">
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xl relative z-10 space-y-space-md border border-surface-container-high/60">
                {/* Clinician Live Node */}
                <div 
                  className="flex items-center justify-between pb-space-sm bg-surface-container-low/60 p-3 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors"
                  onClick={() => navigateTo('dietitian-booking')}
                  title="Click to view Dr. Anjali Sharma's profile"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      className="w-12 h-12 rounded-full object-cover" 
                      alt="Dr. Anjali Sharma" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbpqSGBB70VCmcRTmFE8ppy_47ErHUeoDlf9PQwhLXXlm9qq5AASRvhRgOYW_mD6SKDpcrj6LnXn90jpGpbDV8iOfwdBa7FyOtomLmFy0iEYuo3iZaSGDiYqvT_qF2HbGFBPf7KPEAFhNbWTgnKbdNSQTDKUeuRkgraKyZt4XvvBmBu02t5k9-j5m3ZCRbIgBcBnit8RwwKZORSMpixlOA2dBOUWwQ8AJZNITgmw" 
                    />
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary leading-tight font-bold">
                        Dr. Anjali Sharma, RD
                      </h4>
                      <p className="font-label-md text-label-md text-secondary">
                        Chief Clinical Dietitian • AIIMS Alum
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 font-caption text-caption text-secondary bg-secondary-container px-2.5 py-1 rounded-full font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Active Consult
                  </span>
                </div>

                {/* Daily Macro Balance Rings & Stats */}
                <div className="bg-surface-container-low/40 p-space-md rounded-xl space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Daily Target Balance</span>
                      <p className="font-headline-md text-headline-md text-primary font-bold">
                        1,680 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">kcal target</span>
                      </p>
                    </div>
                    
                    {/* Donut Chart SVG */}
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path 
                          className="text-surface-container-highest" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="3.5"
                        />
                        {/* Carbs 45% (Sage) */}
                        <path 
                          className="text-secondary-fixed-dim" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeDasharray="45, 100" 
                          strokeLinecap="round" 
                          strokeWidth="3.5"
                        />
                        {/* Protein 30% (Forest) */}
                        <path 
                          className="text-primary-container" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeDasharray="30, 100" 
                          strokeDashoffset="-45" 
                          strokeLinecap="round" 
                          strokeWidth="3.5"
                        />
                        {/* Fats 25% (Terracotta) */}
                        <path 
                          className="text-on-tertiary-container" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeDasharray="25, 100" 
                          strokeDashoffset="-75" 
                          strokeLinecap="round" 
                          strokeWidth="3.5"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-label-sm text-label-sm text-primary font-bold">
                        84%
                      </span>
                    </div>
                  </div>

                  {/* Macro breakdown tags */}
                  <div className="grid grid-cols-3 gap-space-xs pt-1">
                    <div className="p-2 rounded bg-surface-container-lowest">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
                        <span className="font-caption text-caption text-on-surface-variant uppercase">Carbs (45%)</span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">189g</span>
                    </div>
                    <div className="p-2 rounded bg-surface-container-lowest">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                        <span className="font-caption text-caption text-on-surface-variant uppercase">Protein (30%)</span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">126g</span>
                    </div>
                    <div className="p-2 rounded bg-surface-container-lowest">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                        <span className="font-caption text-caption text-on-surface-variant uppercase">Fats (25%)</span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">46g</span>
                    </div>
                  </div>
                </div>

                {/* Hydration & Metabolic Sync Card */}
                <div 
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/60 cursor-pointer hover:bg-surface-container-low transition-colors"
                  onClick={() => navigateTo('calorie-tracker-and-dashboard')}
                  title="Open Patient Calorie Tracker"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                      <span className="material-symbols-outlined text-lg">water_drop</span>
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-primary font-semibold">Hydration Tracker</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">2.4L / 3.0L Target Achieved</div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">80% Done</span>
                </div>
              </div>

              {/* Decorative Floating Patient Marker */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 z-20 bg-surface-container-lowest p-3 rounded-xl shadow-lg items-center gap-3 max-w-xs border border-surface-container-high/60">
                <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary shrink-0">
                  <span className="material-symbols-outlined text-sm">trending_down</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-secondary font-semibold">Glycemic Index Optimized</p>
                  <p className="font-caption text-caption text-on-surface-variant">Average Blood Sugar −22 mg/dL in 14 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CLINICAL SPECIALTIES & FEATURED SERVICES */}
      {/* ========================================================= */}
      <section className="w-full py-space-xl bg-surface" id="diet-plans">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Specialized Care</span>
              <h2 className="font-headline-xl text-headline-xl text-primary mt-1 font-bold">Clinical Specialties &amp; Nutrition Programs</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
                Every body operates uniquely. Our therapies integrate lab bloodwork, metabolic typing, and regional Indian food habits.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-on-surface-variant">Guided by ICMR-NIN 2024 Guidelines</span>
            </div>
          </div>

          {/* Service Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {/* 1: Diabetes Reversal */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group border border-surface-container-high/40">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-2xl">vital_signs</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container text-primary px-3 py-1 rounded-full font-semibold">
                    HbA1c &lt; 5.7 Target
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Diabetes Reversal &amp; Insulin Sensitivity
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Clinical carb-distribution protocols, low-glycemic Indian lentils, seed cycling, and real-time postprandial glucose tracking without calorie starvation.
                </p>
              </div>
              <div className="pt-space-md flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-semibold">Includes CGMS Monitoring</span>
                <button
                  onClick={() => navigateTo('diet-plans')}
                  className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 group-hover:text-secondary transition-colors cursor-pointer"
                >
                  Program Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 2: PCOS / Thyroid */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group border border-surface-container-high/40">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">female</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-semibold">
                    Androgen Balance
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  PCOS / PCOD &amp; Thyroid Optimization
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Anti-inflammatory meal matrices targeting LH/FSH ratios, myo-inositol bio-synergy, cycle-synced nutrition, and visceral fat reduction.
                </p>
              </div>
              <div className="pt-space-md flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-semibold">Ultrasound &amp; Hormone Lab Sync</span>
                <button
                  onClick={() => navigateTo('diet-plans')}
                  className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 group-hover:text-secondary transition-colors cursor-pointer"
                >
                  Program Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 3: Sustainable Fat Loss */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group border border-surface-container-high/40">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-2xl">scale</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container text-primary px-3 py-1 rounded-full font-semibold">
                    Lean Mass Preserving
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Sustainable Fat Loss &amp; Metabolic Reset
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Ditch extreme crash diets. Enjoy home-cooked roti, dal, and sabzi balanced with optimal protein thresholds and non-linear caloric cycling.
                </p>
              </div>
              <div className="pt-space-md flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-semibold">Zero Rebound Guarantee</span>
                <button
                  onClick={() => navigateTo('diet-plans')}
                  className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 group-hover:text-secondary transition-colors cursor-pointer"
                >
                  Program Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 4: Gut Health */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group border border-surface-container-high/40">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">microbiology</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface px-3 py-1 rounded-full font-semibold">
                    IBS &amp; SIBO Focused
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Gut Microbiome &amp; Digestive Health
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Low-FODMAP tailored Indian meal rotations, indigenous fermented foods (kanji, chaas), and gut lining repair protocols for leaky gut and bloating.
                </p>
              </div>
              <div className="pt-space-md flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-semibold">Microbiome Friendly</span>
                <button
                  onClick={() => navigateTo('diet-plans')}
                  className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 group-hover:text-secondary transition-colors cursor-pointer"
                >
                  Program Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 5: Sports & Hypertrophy */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group border border-surface-container-high/40">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-2xl">fitness_center</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container text-primary px-3 py-1 rounded-full font-semibold">
                    Athletic Performance
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Clinical Sports &amp; Physique Conditioning
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Nutrient timing around resistance and endurance workouts. High-bioavailability vegetarian/non-vegetarian macro regimens for peak athletic power.
                </p>
              </div>
              <div className="pt-space-md flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-semibold">Body Recomposition</span>
                <button
                  onClick={() => navigateTo('diet-plans')}
                  className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 group-hover:text-secondary transition-colors cursor-pointer"
                >
                  Program Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 6: Cardiac & Renal */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group border border-surface-container-high/40">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">favorite</span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-semibold">
                    Lipid Profile Sync
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Cardio-Renal Medical Nutrition
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Rigorous lipid-management, sodium-potassium balance, and eGFR-aligned protein titration to reduce vascular strain and arterial inflammation.
                </p>
              </div>
              <div className="pt-space-md flex items-center justify-between">
                <span className="font-caption text-caption text-secondary font-semibold">Doctor-Reviewed Plans</span>
                <button
                  onClick={() => navigateTo('diet-plans')}
                  className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 group-hover:text-secondary transition-colors cursor-pointer"
                >
                  Program Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WHY CHOOSE US (4 CORE PILLARS) */}
      {/* ========================================================= */}
      <section className="w-full py-space-xl bg-surface-container-low/50" id="why-us">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="text-center max-w-2xl mx-auto space-y-space-xs">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Our Scientific Standard</span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold">Why India Trusts The Diet Secrets</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              We dismantle fad diet culture. Our methodology combines clinical accountability with practical Indian kitchen realism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Pillar 1 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-sm flex flex-col justify-start border border-surface-container-high/40">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">100% Customized Indian Meals</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                No exotic unpalatable kale shakes or boiled chicken. We formulate real regional Indian staples—idli, dal makhani tweaks, thepla, fish curry—adapted to your metabolic goals.
              </p>
              <div className="pt-space-xs text-secondary font-label-sm text-label-sm font-semibold">Zero Starvation Protocol</div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-sm flex flex-col justify-start border border-surface-container-high/40">
              <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Weekly 1-on-1 Dietitian Consults</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Assigned a dedicated IDA/ICMR Registered Dietitian. 30-minute private video audits every 7 days to adjust food rations, troubleshoot social dinners, and maintain trajectory.
              </p>
              <div className="pt-space-xs text-secondary font-label-sm text-label-sm font-semibold">Qualified Clinicians Only</div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-sm flex flex-col justify-start border border-surface-container-high/40">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-2xl">smartphone</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Continuous Bio-Tracking &amp; App</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Log daily meals in 1 tap, track water volume, and sync continuous blood glucose and step counts with direct nutritionist oversight on our private portal.
              </p>
              <div className="pt-space-xs text-secondary font-label-sm text-label-sm font-semibold">Real-Time Feedback Loop</div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-sm flex flex-col justify-start border border-surface-container-high/40">
              <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-2xl">biotech</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Lab-Aligned Precision Protocols</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We examine your CBC, lipid panel, thyroid panel (T3/T4/TSH), liver enzymes, and fasting insulin before recommending even a single macronutrient adjustment.
              </p>
              <div className="pt-space-xs text-secondary font-label-sm text-label-sm font-semibold">Biomarker Guided</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURED HEALTHY RECIPES SPOTLIGHT */}
      {/* ========================================================= */}
      <section className="w-full py-space-xl bg-surface" id="healthy-recipes">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Nutritional Gastronomy</span>
              <h2 className="font-headline-xl text-headline-xl text-primary mt-1 font-bold">Featured Indian Superfood Meals</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
                Curated by our culinary nutritionists: high protein, low GI, and bursting with traditional spices that ignite metabolism.
              </p>
            </div>
            <button 
              onClick={() => navigateTo('calorie-tracker-and-dashboard')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-secondary-container transition-colors cursor-pointer"
            >
              <span>View All In Patient Portal</span>
              <span className="material-symbols-outlined text-sm">menu_book</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {superfoodRecipes.map((recipe) => (
              <div 
                key={recipe.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group border border-surface-container-high/40"
              >
                <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    src={recipe.image} 
                    alt={recipe.title} 
                  />
                  <span className="absolute top-3 right-3 bg-primary-container text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm">
                    {recipe.kcal}
                  </span>
                </div>
                
                <div className="p-space-md flex flex-col justify-between flex-1 space-y-space-xs">
                  <div>
                    <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">timer</span> {recipe.time}
                      </span>
                      <span>•</span>
                      <span className="text-secondary font-semibold">{recipe.tag}</span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-primary leading-snug font-bold">
                      {recipe.title}
                    </h4>
                  </div>
                  
                  {/* Macro Tag Bar */}
                  <div className="pt-space-xs flex items-center justify-between font-label-sm text-label-sm bg-surface-container-low/60 p-2 rounded">
                    <span className="text-primary font-semibold">P: {recipe.macros.protein}</span>
                    <span className="text-on-surface-variant">C: {recipe.macros.carbs}</span>
                    <span className="text-on-surface-variant">F: {recipe.macros.fats}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PATIENT TRANSFORMATIONS & CLINICAL OUTCOMES */}
      {/* ========================================================= */}
      <section className="w-full py-space-xl bg-surface-container-low/30">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Documented Results</span>
              <h2 className="font-headline-xl text-headline-xl text-primary mt-1 font-bold">Verified Clinical Transformations</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
                Real metrics from real clinical patient logs. We monitor biological blood parameters, not just bathroom scale numbers.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-lowest rounded-full shadow-sm text-primary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm text-secondary font-fill">verified_user</span>
              All results verified with NABL accredited lab tests
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {clinicalTransformations.map((item) => (
              <div 
                key={item.id}
                className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container-high/40"
              >
                <div className="space-y-space-sm">
                  {/* Review Stars & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-secondary">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="material-symbols-outlined text-sm font-fill">star</span>
                      ))}
                    </div>
                    <span className={`font-label-sm text-label-sm ${item.tagBg} ${item.tagText} px-2.5 py-0.5 rounded-full font-semibold`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Lab Marker Box */}
                  <div className="p-3 bg-surface-container-low/80 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-caption text-caption text-on-surface-variant uppercase">{item.metricLabel}</span>
                      <p className="font-headline-sm text-headline-sm text-primary font-bold">
                        {item.metricValue} <span className="text-secondary font-normal">{item.metricTarget}</span>
                      </p>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-2.5 py-1 rounded font-bold shadow-xs">
                      {item.changeBadge}
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant italic">
                    {item.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-space-xs">
                  <img 
                    className="w-11 h-11 rounded-full object-cover ring-1 ring-secondary" 
                    src={item.avatar} 
                    alt={item.name} 
                  />
                  <div>
                    <h5 className="font-label-lg text-label-lg text-primary font-bold">{item.name}</h5>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* INTERACTIVE QUICK HEALTH ASSESSMENT & BMI TOOL */}
      {/* ========================================================= */}
      <section className="w-full py-space-xl bg-surface" id="bmi-calculator">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="bg-gradient-to-r from-primary-container to-primary text-on-primary rounded-xl p-space-lg lg:p-space-xl shadow-xl relative overflow-hidden">
            {/* Watermark SVG */}
            <svg className="absolute -right-16 -bottom-16 w-80 h-80 text-on-primary/5 pointer-events-none" fill="currentColor" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeWidth="2"></circle>
              <path d="M50 15 C30 40 40 70 50 85 C60 70 70 40 50 15 Z" fill="currentColor"></path>
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">
              <div className="lg:col-span-7 space-y-space-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-xs">speed</span>
                  Takes 2 Minutes • Instant Results
                </span>
                <h3 className="font-display-lg text-display-lg-mobile lg:text-headline-xl text-on-primary font-bold">
                  Check Your Metabolic Health &amp; Clinical BMI Score
                </h3>
                <p className="font-body-lg text-body-lg text-on-primary-container max-w-xl leading-relaxed">
                  Calculate your Body Mass Index calibrated specifically to Asian Indian population standards (WHO &amp; ICMR cutoffs). Receive personalized macronutrient ratio recommendations directly on your phone.
                </p>
                <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
                    <span className="font-body-md text-body-md text-on-primary">Asian-Indian Specific Cutoffs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
                    <span className="font-body-md text-body-md text-on-primary">Confidential &amp; Free</span>
                  </div>
                </div>
              </div>

              {/* Quick Interactive Calculator Widget */}
              <div className="lg:col-span-5 bg-surface-container-lowest text-on-surface p-space-md rounded-xl shadow-lg space-y-space-sm">
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Quick Asian-Indian BMI Check
                </h4>
                
                <div className="grid grid-cols-2 gap-space-sm">
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">Height (cm)</label>
                    <input 
                      className="w-full bg-surface-container-low px-3 py-2 rounded-md font-body-md text-body-md text-on-surface outline-none focus:bg-surface-container transition-colors" 
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 172"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">Weight (kg)</label>
                    <input 
                      className="w-full bg-surface-container-low px-3 py-2 rounded-md font-body-md text-body-md text-on-surface outline-none focus:bg-surface-container transition-colors" 
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 74"
                    />
                  </div>
                </div>

                {/* Health Objective Selector */}
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">Primary Clinical Focus</label>
                  <select 
                    className="w-full bg-surface-container-low px-3 py-2 rounded-md font-body-md text-body-md text-on-surface outline-none focus:bg-surface-container transition-colors"
                    value={healthObjective}
                    onChange={(e) => setHealthObjective(e.target.value)}
                  >
                    <option>Fat Loss &amp; Metabolic Conditioning</option>
                    <option>Diabetes / Pre-Diabetes Management</option>
                    <option>PCOS / Hormonal Balancing</option>
                    <option>Thyroid / Hypothyroid Optimization</option>
                    <option>Gut Health &amp; Acidity Relief</option>
                  </select>
                </div>

                {/* Live Output Banner */}
                <div className="p-3 bg-secondary-container rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-caption text-caption text-on-secondary-container uppercase font-semibold">Calculated BMI</span>
                    <p className="font-headline-md text-headline-md text-on-secondary-container font-bold">
                      {bmiValue} kg/m²
                    </p>
                  </div>
                  <span className={`font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold ${bmiBadgeClass}`}>
                    {bmiStatus}
                  </span>
                </div>

                <button 
                  onClick={() => navigateTo('diet-plans')}
                  className="w-full py-3 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg hover:bg-on-secondary-fixed-variant transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer font-bold"
                >
                  <span>Get Free Personalized Diet Chart</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BOOKING LEAD / CONSULTATION CALL-TO-ACTION */}
      {/* ========================================================= */}
      <section className="w-full py-space-xl bg-surface-container-low/20" id="consultation-booking">
        <div className="max-w-5xl mx-auto px-margin-mobile lg:px-margin text-center space-y-space-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-sm">event_available</span>
            Next Clinical Slots Available Tomorrow
          </div>
          
          <h2 className="font-headline-xl text-headline-xl text-primary max-w-2xl mx-auto font-bold">
            Ready to Decode Your Body’s Diet Secrets?
          </h2>
          
          <p className="font-body-xl text-body-xl text-on-surface-variant max-w-xl mx-auto">
            Join over 15,000 Indians who reclaimed their metabolic health, balanced their hormones, and achieved lasting wellness through medical nutrition science.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-sm pt-space-xs">
            <button
              onClick={() => navigateTo('dietitian-booking')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              Book 1-on-1 Consultation
            </button>
            <a 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-lowest text-secondary font-label-lg text-label-lg hover:bg-surface-container transition-colors shadow-sm font-bold" 
              href="https://wa.me/919820045678" 
              rel="noopener noreferrer" 
              target="_blank"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              WhatsApp Diet Desk
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-md text-on-surface-variant font-label-sm text-label-sm">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">check</span> 100% Confidential</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">check</span> IDA Registered Clinicians</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">check</span> Customized to Family Food Habits</span>
          </div>
        </div>
      </section>
    </div>
  );
}

