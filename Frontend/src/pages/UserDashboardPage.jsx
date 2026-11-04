import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import IndianFoodModal from '../components/IndianFoodModal';

export default function UserDashboardPage({ setActivePage }) {
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);

  // Dynamic Dashboard States
  const [consumedCalories, setConsumedCalories] = useState(1420);
  const targetCalories = 1850;

  // Hydration state (12 glasses of 250ml = 3000ml)
  // Initially first 9 glasses logged = 2250 ml or 2400 ml
  const [loggedGlasses, setLoggedGlasses] = useState([
    true, true, true, true, true, true, true, true, true, false, false, false
  ]);

  // Dinner status
  const [dinnerEaten, setDinnerEaten] = useState(false);

  // Compute hydration
  const activeGlassesCount = loggedGlasses.filter(Boolean).length;
  const currentWaterMl = activeGlassesCount * 250;

  const toggleGlass = (index) => {
    setLoggedGlasses((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const handleQuickAddWater = () => {
    setLoggedGlasses((prev) => {
      const copy = [...prev];
      const nextUnloggedIndex = copy.findIndex((g) => !g);
      if (nextUnloggedIndex !== -1) {
        copy[nextUnloggedIndex] = true;
      }
      return copy;
    });
  };

  const handleAddFood = (foodItem) => {
    setConsumedCalories((prev) => prev + foodItem.kcal);
    alert(`Logged ${foodItem.name} (+${foodItem.kcal} kcal, +${foodItem.protein}g Protein) to your daily nutrition log!`);
  };

  const handleConfirmDinner = () => {
    if (!dinnerEaten) {
      setDinnerEaten(true);
      setConsumedCalories((prev) => prev + 400);
      alert('Dinner marked as consumed (+400 kcal)! Macros synchronized to clinical chart.');
    } else {
      alert('Dinner is already logged.');
    }
  };

  // SVG Gauge calculations
  // Circumference for r=68 is 2 * PI * 68 ≈ 427.25
  const circumference = 427.25;
  const calorieRatio = Math.min(1, consumedCalories / targetCalories);
  const calorieOffset = circumference * (1 - calorieRatio);
  const caloriesLeft = Math.max(0, targetCalories - consumedCalories);

  return (
    <div className="flex bg-surface min-h-screen">
      {/* Sidebar Component */}
      <Sidebar 
        activePage="calorie-tracker-and-dashboard"
        setActivePage={setActivePage}
        isMobileOpen={sidebarMobileOpen}
        setIsMobileOpen={setSidebarMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Fixed Portal Header */}
        <header className="sticky top-0 right-0 h-16 bg-surface/90 backdrop-blur-md z-30 px-space-md lg:px-space-lg flex items-center justify-between shadow-[0_1px_8px_rgba(45,74,62,0.04)] border-b border-surface-container-high/40">
          <div className="flex items-center gap-space-sm">
            {/* Hamburger on mobile */}
            <button
              onClick={() => setSidebarMobileOpen(true)}
              className="lg:hidden p-1.5 text-primary focus:outline-none"
              aria-label="Toggle Portal Sidebar"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider hidden sm:inline">
              Active Session
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary hidden sm:inline"></span>
            <span className="font-label-md text-label-md text-primary font-semibold">
              Metabolic Health Panel
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            <button
              onClick={() => setActivePage('dietitian-booking')}
              className="font-label-md text-label-md bg-primary-container text-on-primary px-4 py-2 rounded-full hover:bg-primary transition-all font-semibold shadow-xs cursor-pointer"
            >
              Quick Consult
            </button>
            <div 
              className="flex items-center gap-space-sm pl-space-sm cursor-pointer"
              onClick={() => alert('Profile: Priyanshu • Patient ID: TDS-8924 • Protocol: PCOS & Metabolic Reset')}
            >
              <img 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfD_M4cBF-72fHDnElyhWTQZ4HjcgRgKJjEhbBhfdMsMk3UQhzdaMYozGZd9ck5N7IfEThXdJntur_9eI7gFotUztYaUDOT9z5DAdCVyOWnU0NeoABL2pjbvzerGqIrTv2b468jOGA0vcTlqGeQvnKqbv5K68VAjqCNPlRahM5evRIz8NzzodnkMNJwhtk50alD_C40rspbD32RBQl85tPtveGX3-Mr8OW150q8g"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Main Body */}
        <main className="w-full px-space-md lg:px-space-lg py-space-md min-h-screen">
          <div className="space-y-space-lg max-w-[1440px] mx-auto w-full pb-12">
            
            {/* ========================================================= */}
            {/* TOP OVERVIEW BANNER: Welcome & Telehealth Pill */}
            {/* ========================================================= */}
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-surface-container-high/40">
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>
              <div className="absolute right-40 -bottom-20 w-64 h-64 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-lg">
                <div className="space-y-space-xs max-w-2xl">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      DAY 24 OF 84 • METABOLIC RESET
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      IDA Registered Protocol
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                    Good afternoon, Priyanshu!
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Your glycemic stabilization index is up <strong className="text-secondary font-semibold">14%</strong> this week. Today’s caloric burn aligns precisely with your phase-2 lean preservation window.
                  </p>
                </div>

                {/* Consultation Pill Notice */}
                <div className="w-full xl:w-auto bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md border border-surface-container-high/60">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl">video_camera_front</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">
                          Tomorrow • 11:30 AM IST
                        </span>
                      </div>
                      <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Dr. Anjali Sharma, RD
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Metabolic Biometrics Review &amp; Week 4 Tweaks
                      </p>
                    </div>
                  </div>
                  
                  <a 
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shrink-0 shadow-sm" 
                    href="https://meet.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined text-base">videocam</span>
                    Zoom Link Ready
                  </a>
                </div>
              </div>

              {/* Quick Action Bar */}
              <div className="mt-space-lg pt-space-md flex flex-wrap items-center gap-space-sm bg-surface-container-lowest/80 backdrop-blur-sm p-space-sm rounded-xl border border-surface-container-high/40">
                <button 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-all shadow-sm cursor-pointer" 
                  onClick={() => setIsFoodModalOpen(true)}
                >
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  Log Meal
                </button>
                <button 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-medium transition-colors cursor-pointer" 
                  onClick={handleQuickAddWater}
                >
                  <span className="material-symbols-outlined text-base">water_drop</span>
                  Record Water (+250ml)
                </button>
                <button 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-medium transition-colors cursor-pointer" 
                  onClick={() => alert('Quick Log Vitals:\nFasting Blood Glucose: 98 mg/dL\nResting BP: 118/76 mmHg\nBody Temp: 98.4°F\nAll recorded successfully.')}
                >
                  <span className="material-symbols-outlined text-base">favorite</span>
                  Log Vitals
                </button>
                <button 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md font-medium transition-colors sm:ml-auto cursor-pointer" 
                  onClick={() => alert('Downloading verified Clinical Weekly Summary PDF (Week 4: Metabolic Reset)...')}
                >
                  <span className="material-symbols-outlined text-base">description</span>
                  Weekly Lab Report
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* MAIN METRIC GRID: Analytics & Hydration/Vitals */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              
              {/* HERO ANALYTICS (8 cols): Macro Rings & Calorie Burn */}
              <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-surface-container-high/40">
                <div className="flex items-center justify-between mb-space-md">
                  <div>
                    <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-widest">
                      NUTRITIONAL EQUILIBRIUM
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                      Daily Calorie &amp; Macro Distribution
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                    Target: 1,850 kcal/day
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center my-space-sm">
                  {/* Circular Progress Gauge */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center relative">
                    <div className="relative w-56 h-56 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                        {/* Background Track */}
                        <circle 
                          className="text-surface-container" 
                          cx="80" 
                          cy="80" 
                          fill="none" 
                          r="68" 
                          stroke="currentColor" 
                          strokeWidth="14"
                        />
                        {/* Dynamic Progress Circle */}
                        <circle 
                          className="text-secondary transition-all duration-700 ease-out" 
                          cx="80" 
                          cy="80" 
                          fill="none" 
                          r="68" 
                          stroke="currentColor" 
                          strokeDasharray={circumference} 
                          strokeDashoffset={calorieOffset} 
                          strokeLinecap="round" 
                          strokeWidth="14"
                        />
                      </svg>
                      {/* Center Readout */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="font-caption text-caption text-outline font-semibold uppercase tracking-wider">
                          CONSUMED
                        </span>
                        <span className="font-display-lg text-display-lg text-primary font-bold leading-none my-1">
                          {consumedCalories.toLocaleString()}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface-variant">
                          of 1,850 kcal
                        </span>
                        <span className="mt-2 inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                          <span className="material-symbols-outlined text-xs">check</span> {caloriesLeft} kcal left
                        </span>
                      </div>
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant text-center mt-3">
                      Calibrated for 45% Carbs • 24% Protein • 24% Fats • 7% Fibre
                    </p>
                  </div>

                  {/* Detailed Macronutrient Breakdown Bars */}
                  <div className="md:col-span-7 space-y-space-md">
                    {/* Protein */}
                    <div className="bg-surface-container-low p-space-md rounded-xl space-y-2 border border-surface-container-high/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                          <span className="font-label-lg text-label-lg font-semibold text-primary">Protein</span>
                          <span className="font-caption text-caption text-secondary font-semibold">(Tissue Synthesis)</span>
                        </div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">
                          <span>84g</span> <span className="text-outline font-normal">/ 110g (76%)</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container rounded-full transition-all duration-700" style={{ width: '76%' }}></div>
                      </div>
                      <div className="flex justify-between font-caption text-caption text-on-surface-variant">
                        <span>Optimal window for PCOS recovery</span>
                        <span className="font-semibold text-primary">26g needed at Dinner</span>
                      </div>
                    </div>

                    {/* Complex Carbs */}
                    <div className="bg-surface-container-low p-space-md rounded-xl space-y-2 border border-surface-container-high/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></span>
                          <span className="font-label-lg text-label-lg font-semibold text-primary">Complex Carbs</span>
                          <span className="font-caption text-caption text-tertiary font-semibold">(Low GI Millets &amp; Grains)</span>
                        </div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">
                          <span>145g</span> <span className="text-outline font-normal">/ 200g (72%)</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-container rounded-full transition-all duration-700" style={{ width: '72%' }}></div>
                      </div>
                      <div className="flex justify-between font-caption text-caption text-on-surface-variant">
                        <span>Slow glycemic release sustained</span>
                        <span className="font-semibold text-tertiary">55g remaining</span>
                      </div>
                    </div>

                    {/* Healthy Fats */}
                    <div className="bg-surface-container-low p-space-md rounded-xl space-y-2 border border-surface-container-high/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-on-tertiary-container"></span>
                          <span className="font-label-lg text-label-lg font-semibold text-primary">Healthy Fats</span>
                          <span className="font-caption text-caption text-on-surface-variant">(Nuts, Seeds &amp; Desi Ghee)</span>
                        </div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">
                          <span>38g</span> <span className="text-outline font-normal">/ 50g (76%)</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-on-tertiary-container rounded-full transition-all duration-700" style={{ width: '76%' }}></div>
                      </div>
                      <div className="flex justify-between font-caption text-caption text-on-surface-variant">
                        <span>Hormonal support active</span>
                        <span className="font-semibold text-primary">12g remaining</span>
                      </div>
                    </div>

                    {/* Dietary Fibre */}
                    <div className="bg-surface-container-low p-space-md rounded-xl space-y-2 border border-surface-container-high/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-secondary"></span>
                          <span className="font-label-lg text-label-lg font-semibold text-primary">Dietary Fibre</span>
                          <span className="font-caption text-caption text-secondary font-semibold">(Gut Flora Support)</span>
                        </div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">
                          <span>28g</span> <span className="text-outline font-normal">/ 32g (87%)</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full transition-all duration-700" style={{ width: '87%' }}></div>
                      </div>
                      <div className="flex justify-between font-caption text-caption text-on-surface-variant">
                        <span>94% daily microbiome benchmark</span>
                        <span className="font-semibold text-secondary">4g to optimal goal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HYDRATION & VITALS WIDGET (4 cols) */}
              <div className="lg:col-span-4 space-y-space-md flex flex-col justify-between">
                
                {/* Hydration Box */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high/40">
                  <div className="flex items-center justify-between mb-space-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">water_drop</span>
                      <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Hydration Tracker</h3>
                    </div>
                    <span className="font-label-sm text-label-sm font-semibold text-secondary px-2.5 py-0.5 rounded-full bg-secondary-fixed">
                      {Math.round((currentWaterMl / 3000) * 100)}% TARGET
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="font-headline-xl text-headline-xl text-primary font-bold">
                        {currentWaterMl.toLocaleString()}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant font-medium"> / 3,000 ml</span>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      {activeGlassesCount} of 12 glasses
                    </span>
                  </div>

                  {/* Interactive Glasses Grid */}
                  <div className="grid grid-cols-6 gap-2 my-space-md p-space-sm bg-surface-container-low rounded-xl">
                    {loggedGlasses.map((isLogged, idx) => {
                      const mlLabel = (idx + 1) * 250;
                      const displayLabel = mlLabel >= 1000 ? `${(mlLabel / 1000).toFixed(mlLabel % 1000 === 0 ? 1 : 2)}L` : `${mlLabel}`;
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleGlass(idx)}
                          title={`Glass ${idx + 1}: 250ml (${isLogged ? 'Logged' : 'Click to log'})`}
                          className={`h-11 rounded-lg flex flex-col items-center justify-center transition-all hover:scale-105 shadow-xs cursor-pointer ${
                            isLogged
                              ? 'bg-secondary text-on-secondary'
                              : 'bg-surface-container text-outline hover:bg-secondary-fixed hover:text-primary'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">local_drink</span>
                          <span className="font-caption text-[9px] font-bold">{displayLabel}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-on-surface-variant">Tap glass to toggle logged</span>
                    <button 
                      onClick={handleQuickAddWater}
                      className="font-label-sm text-label-sm font-semibold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add</span> +250 ml Quick Add
                    </button>
                  </div>
                </div>

                {/* Biometrics & Restorative Sleep */}
                <div className="grid grid-cols-2 gap-space-sm">
                  {/* Sleep */}
                  <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-1 border border-surface-container-high/40">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-base">bedtime</span>
                      <span className="font-label-sm text-label-sm font-semibold uppercase">Sleep Quality</span>
                    </div>
                    <div className="font-headline-md text-headline-md text-primary font-bold">7h 20m</div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      <span className="font-caption text-caption text-secondary font-medium">Deep / Restorative</span>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-1 border border-surface-container-high/40">
                    <div className="flex items-center gap-1.5 text-tertiary">
                      <span className="material-symbols-outlined text-base">directions_walk</span>
                      <span className="font-label-sm text-label-sm font-semibold uppercase">Daily Movement</span>
                    </div>
                    <div className="font-headline-md text-headline-md text-primary font-bold">8,420</div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-tertiary-container h-full rounded-full" style={{ width: '84.2%' }}></div>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant block">84% of 10,000 steps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* DAILY MEAL LOGS (INDIAN DIET DATABASE INTEGRATION) */}
            {/* ========================================================= */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md border border-surface-container-high/40">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm pb-space-sm">
                <div>
                  <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">
                    CLINICAL DIET SHEET
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                    Today’s Prescribed Meal Logs
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    All items authenticated with verified Indian Food Composition Tables (IFCT 2017)
                  </p>
                </div>
                <div className="flex items-center gap-space-sm">
                  <button 
                    onClick={() => setIsFoodModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-md text-label-md font-semibold hover:bg-secondary-container transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">search</span>
                    Search Indian Database
                  </button>
                </div>
              </div>

              {/* Meal Accordions */}
              <div className="space-y-space-md">
                {/* 1: BREAKFAST */}
                <div className="bg-surface-container-low rounded-xl p-space-md border border-surface-container-high/40">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm pb-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-fixed-variant flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">wb_twilight</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">Breakfast</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-caption text-[10px] font-semibold">
                            LOGGED • 08:45 AM
                          </span>
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant">Recommended Window: 08:00 - 09:30 AM</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm font-bold text-primary">320 kcal</span>
                        <span className="block font-caption text-caption text-on-surface-variant">18g Protein • 34g Carbs</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">check</span>
                      </div>
                    </div>
                  </div>

                  {/* Food items breakdown */}
                  <div className="mt-space-sm pt-space-sm grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <img 
                        className="w-12 h-12 rounded-lg object-cover shrink-0" 
                        alt="Besan Chilla" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKQWpsBo8dR6fjoZeVRI4CadAk5MJ_5jKqAnuNDyLI7e7Xcxfu4yIOFs-Bmt4CP-dL_-_2k9qvG0uAWRcy_WVBJjYnm5AndgkgjN6-RSsPS7g9axaPJDwnkXdK1Ks8tBgpyThQpfG1jHHRrgQeS8raLgnMzFChCa5jy90xkv_k9znzq5Jl-Dm0SkkTYFjHXGGvUgc_h-NcPIkZ6noVQMHEerl0aBR_FMRTg9ouYg" 
                      />
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">2 Besan Chillas</p>
                        <p className="font-caption text-caption text-on-surface-variant">With mint-coriander chutney</p>
                        <span className="font-caption text-caption text-secondary font-semibold">220 kcal • 11g P</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">egg</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">1 Whole Boiled Egg</p>
                        <p className="font-caption text-caption text-on-surface-variant">Rock salt &amp; black pepper</p>
                        <span className="font-caption text-caption text-secondary font-semibold">78 kcal • 6.5g P</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">local_cafe</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">Masala Green Tea</p>
                        <p className="font-caption text-caption text-on-surface-variant">Cardamom, ginger (No sugar)</p>
                        <span className="font-caption text-caption text-secondary font-semibold">22 kcal • 0.5g P</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2: LUNCH */}
                <div className="bg-surface-container-low rounded-xl p-space-md border border-surface-container-high/40">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm pb-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">light_mode</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">Lunch</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-caption text-[10px] font-semibold">
                            LOGGED • 01:20 PM
                          </span>
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant">Recommended Window: 01:00 - 02:00 PM</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm font-bold text-primary">540 kcal</span>
                        <span className="block font-caption text-caption text-on-surface-variant">34g Protein • 58g Carbs</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">check</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-sm pt-space-sm grid grid-cols-1 md:grid-cols-4 gap-space-sm">
                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">flatware</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">2 Multigrain Phulkas</p>
                        <p className="font-caption text-caption text-on-surface-variant">Wheat + Jowar + Ragi</p>
                        <span className="font-caption text-caption text-secondary font-semibold">160 kcal • 6g P</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <img 
                        className="w-12 h-12 rounded-lg object-cover shrink-0" 
                        alt="Palak Paneer" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC1F86Ezub_zm9g5CPGCkxWqHXwhZXHoVlwTWybWeFqsOfIPJePZSZlbNJywwbRHUlr_YeMQiNorA55TTKYMhrVjM5Cp3a7rSZ8jzjeOrQNEUKRwGDaCSCHMOx0Lfun8DsOITqWd1LPjCBwCXQlJXetXAlviGxlMmNiN9AZM6FVIVXcqW3MArd9T6zDCrKeKMljCkNQsucgQN4uNCAd7KbWob_ZD-NugBNhaeDWw" 
                      />
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">Palak Paneer (150g)</p>
                        <p className="font-caption text-caption text-on-surface-variant">Cow milk paneer</p>
                        <span className="font-caption text-caption text-secondary font-semibold">190 kcal • 16g P</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                        <span className="material-symbols-outlined text-2xl">soup_kitchen</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">1 Cup Dal Tadka</p>
                        <p className="font-caption text-caption text-on-surface-variant">Yellow Moong &amp; Toor</p>
                        <span className="font-caption text-caption text-secondary font-semibold">150 kcal • 10g P</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                        <span className="material-symbols-outlined text-2xl">eco</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">Cucumber Salad</p>
                        <p className="font-caption text-caption text-on-surface-variant">Lemon &amp; flax seeds</p>
                        <span className="font-caption text-caption text-secondary font-semibold">40 kcal • 2g P</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3: EVENING SNACK */}
                <div className="bg-surface-container-low rounded-xl p-space-md border border-surface-container-high/40">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm pb-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">nature_people</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">Evening Snack</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-caption text-[10px] font-semibold">
                            LOGGED • 05:00 PM
                          </span>
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant">Pre-workout Sustenance</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm font-bold text-primary">160 kcal</span>
                        <span className="block font-caption text-caption text-on-surface-variant">6g Protein • 18g Carbs</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">check</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-sm pt-space-sm grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">nutrition</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">Roasted Makhana (Foxnuts)</p>
                        <p className="font-caption text-caption text-on-surface-variant">Dry roasted with 2 walnuts &amp; pink salt</p>
                        <span className="font-caption text-caption text-secondary font-semibold">145 kcal • 5.5g P</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3 border border-surface-container-high/30">
                      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl">coffee</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-semibold text-primary truncate">Assam Black Tea</p>
                        <p className="font-caption text-caption text-on-surface-variant">Brewed with ginger &amp; cardamom (Sugar-free)</p>
                        <span className="font-caption text-caption text-secondary font-semibold">15 kcal • 0.5g P</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4: DINNER */}
                <div className={`rounded-xl p-space-md border transition-all ${
                  dinnerEaten 
                    ? 'bg-surface-container-low border-secondary/50' 
                    : 'bg-surface-container border-surface-container-high/60'
                }`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm pb-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">bedtime</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-headline-sm font-bold text-primary">Dinner</span>
                          <span className={`px-2 py-0.5 rounded-full font-caption text-[10px] font-semibold ${
                            dinnerEaten ? 'bg-secondary text-on-secondary' : 'bg-outline-variant text-on-surface'
                          }`}>
                            {dinnerEaten ? 'LOGGED • 08:15 PM' : 'PLANNED • 08:15 PM'}
                          </span>
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Recommended: Minimum 2.5 hours prior to sleep
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm font-bold text-primary">400 kcal</span>
                        <span className="block font-caption text-caption text-on-surface-variant">26g Protein • 35g Carbs</span>
                      </div>
                      <button 
                        onClick={handleConfirmDinner}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-sm text-label-sm font-semibold transition-all shadow-sm cursor-pointer ${
                          dinnerEaten
                            ? 'bg-secondary text-on-secondary cursor-default'
                            : 'bg-primary text-on-primary hover:bg-primary-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        {dinnerEaten ? 'Consumed' : 'Mark as Eaten'}
                      </button>
                    </div>
                  </div>

                  <div className="mt-space-sm pt-space-sm bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between border border-surface-container-high/30">
                    <div className="flex items-center gap-3">
                      <img 
                        className="w-12 h-12 rounded-lg object-cover shrink-0" 
                        alt="Oats Khichdi" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC78LeSrkAjAcCYxUGGVPoKOa0TgvqqKc4XcUxPbh5GDhTvc1kWRcF4vaLOX2wvB_PDA4V1tCiJ0wgpdQdrsKcvJYWQpTgKO45NdG3ZAlwUce6L7S8ch2zlS8TAyaaSENV-CCyDSmRCWGwWYKWR5wiLbUap6AIGQNGnZyjiQH_cBvVh3fmfHr34cIx7jo4_NYUcN3Pj83fCZiqxwOqQHsKvXI-ClP6Ij0DYvfgcQ" 
                      />
                      <div>
                        <p className="font-label-md text-label-md font-semibold text-primary">
                          Prescribed: Oats Khichdi with Steamed Veggies &amp; Low-Fat Curd
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Rolled oats, yellow moong, carrots, beans, 100g probiotic curd
                        </p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block font-label-sm text-label-sm px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                      Exact Target Match
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* WEEKLY ADHERENCE & WEIGHT TRAJECTORY */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              
              {/* Calorie & Protein Adherence Graph */}
              <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md border border-surface-container-high/40">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">
                      COMPLIANCE METRICS
                    </span>
                    <h3 className="font-headline-lg text-headline-lg text-primary font-bold">
                      7-Day Caloric &amp; Protein Adherence
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 font-caption text-caption">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Target (1,850 kcal)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Protein Met (&gt;100g)</span>
                  </div>
                </div>

                {/* SVG Bar Chart */}
                <div className="w-full h-56 pt-2">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 500 200">
                    <line className="text-surface-container" stroke="currentColor" strokeDasharray="3 3" x1="40" x2="490" y1="20" y2="20"></line>
                    <line className="text-surface-container" stroke="currentColor" strokeDasharray="3 3" x1="40" x2="490" y1="65" y2="65"></line>
                    <line className="text-surface-container" stroke="currentColor" strokeDasharray="3 3" x1="40" x2="490" y1="110" y2="110"></line>
                    <line className="text-surface-container" stroke="currentColor" x1="40" x2="490" y1="155" y2="155"></line>
                    
                    <text className="fill-outline text-[10px] font-mono" x="5" y="24">2,000</text>
                    <text className="fill-outline text-[10px] font-mono" x="5" y="69">1,850</text>
                    <text className="fill-outline text-[10px] font-mono" x="5" y="114">1,500</text>
                    <text className="fill-outline text-[10px] font-mono" x="5" y="159">1,000</text>
                    
                    {/* Target Line */}
                    <line className="text-secondary" stroke="currentColor" strokeDasharray="4 2" strokeWidth="1.5" x1="40" x2="490" y1="65" y2="65"></line>
                    
                    {/* Mon */}
                    <rect className="fill-surface-container-high" height="85" rx="4" width="28" x="65" y="70"></rect>
                    <rect className="fill-secondary" height="65" rx="4" width="28" x="65" y="90"></rect>
                    {/* Tue */}
                    <rect className="fill-surface-container-high" height="92" rx="4" width="28" x="125" y="63"></rect>
                    <rect className="fill-secondary" height="70" rx="4" width="28" x="125" y="85"></rect>
                    {/* Wed */}
                    <rect className="fill-surface-container-high" height="80" rx="4" width="28" x="185" y="75"></rect>
                    <rect className="fill-secondary" height="63" rx="4" width="28" x="185" y="92"></rect>
                    {/* Thu */}
                    <rect className="fill-surface-container-high" height="88" rx="4" width="28" x="245" y="67"></rect>
                    <rect className="fill-secondary" height="75" rx="4" width="28" x="245" y="80"></rect>
                    {/* Fri */}
                    <rect className="fill-tertiary-fixed-dim" height="100" rx="4" width="28" x="305" y="55"></rect>
                    <rect className="fill-secondary" height="67" rx="4" width="28" x="305" y="88"></rect>
                    {/* Sat */}
                    <rect className="fill-surface-container-high" height="86" rx="4" width="28" x="365" y="69"></rect>
                    <rect className="fill-secondary" height="73" rx="4" width="28" x="365" y="82"></rect>
                    {/* Today */}
                    <rect className="fill-primary-container" height="55" rx="4" width="28" x="425" y="100"></rect>
                    <rect className="fill-secondary" height="38" rx="4" width="28" x="425" y="117"></rect>

                    <text className="fill-on-surface-variant text-[11px] font-medium" x="70" y="178">Mon</text>
                    <text className="fill-on-surface-variant text-[11px] font-medium" x="130" y="178">Tue</text>
                    <text className="fill-on-surface-variant text-[11px] font-medium" x="190" y="178">Wed</text>
                    <text className="fill-on-surface-variant text-[11px] font-medium" x="250" y="178">Thu</text>
                    <text className="fill-on-surface-variant text-[11px] font-medium" x="310" y="178">Fri</text>
                    <text className="fill-on-surface-variant text-[11px] font-medium" x="370" y="178">Sat</text>
                    <text className="fill-primary text-[11px] font-bold" x="423" y="178">Today</text>
                  </svg>
                </div>

                <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between text-on-surface">
                  <span className="font-caption text-caption flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-secondary font-fill">verified</span>
                    Weekly Caloric Variance: <strong className="font-semibold">+1.2% (Within safe metabolic threshold)</strong>
                  </span>
                  <span className="font-caption text-caption font-semibold text-secondary">Adherence: 96.4%</span>
                </div>
              </div>

              {/* 6-Week Weight & Composition Trajectory */}
              <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md flex flex-col justify-between border border-surface-container-high/40">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">
                      METABOLIC BIOMETRICS
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold bg-secondary-fixed px-2 py-0.5 rounded-full">
                      -4.2 kg Total
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-primary font-bold">Weight Trajectory</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Clinical baseline recorded weekly on calibrated in-clinic scales
                  </p>
                </div>

                {/* Trajectory Sparkline Graphic */}
                <div className="relative py-2">
                  <svg className="w-full h-36" fill="none" viewBox="0 0 320 120">
                    <path 
                      className="fill-secondary/10" 
                      d="M 20 20 L 70 38 L 120 54 L 180 72 L 240 88 L 300 102 L 300 115 L 20 115 Z"
                    />
                    <path 
                      className="text-secondary" 
                      d="M 20 20 L 70 38 L 120 54 L 180 72 L 240 88 L 300 102" 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3"
                    />
                    <circle className="fill-primary" cx="20" cy="20" r="4"></circle>
                    <circle className="fill-primary" cx="70" cy="38" r="4"></circle>
                    <circle className="fill-primary" cx="120" cy="54" r="4"></circle>
                    <circle className="fill-primary" cx="180" cy="72" r="4"></circle>
                    <circle className="fill-primary" cx="240" cy="88" r="4"></circle>
                    <circle className="fill-secondary" cx="300" cy="102" r="5"></circle>

                    <text className="fill-on-surface text-[10px] font-mono font-semibold" x="10" y="14">79.4kg</text>
                    <text className="fill-outline text-[10px] font-mono" x="60" y="32">78.5</text>
                    <text className="fill-outline text-[10px] font-mono" x="110" y="48">77.6</text>
                    <text className="fill-outline text-[10px] font-mono" x="170" y="66">76.8</text>
                    <text className="fill-outline text-[10px] font-mono" x="230" y="82">75.9</text>
                    <text className="fill-secondary text-[10px] font-mono font-bold" x="270" y="98">75.2kg</text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container-high/40">
                    <span className="font-caption text-caption text-on-surface-variant block uppercase">Initial Weight</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">79.4 kg</span>
                    <span className="font-caption text-caption text-outline block">Day 1 (May 4)</span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-secondary-container">
                    <span className="font-caption text-caption text-on-secondary-fixed-variant block uppercase font-semibold">Current Vitals</span>
                    <span className="font-headline-md text-headline-md text-primary font-bold">75.2 kg</span>
                    <span className="font-caption text-caption text-secondary font-semibold block">BMI: 24.1 (Normalized)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* ACTIVE PROTOCOL & DIETITIAN CLINICAL NOTES */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg">
              
              {/* Enrolled Protocol Details */}
              <div className="md:col-span-5 bg-primary rounded-xl p-space-lg text-on-primary shadow-sm flex flex-col justify-between">
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-primary-container text-on-primary font-semibold tracking-wider uppercase">
                      Prescription #TDS-8924
                    </span>
                    <span className="material-symbols-outlined text-secondary-fixed text-xl">shield_with_heart</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg font-bold text-on-primary">
                    PCOS &amp; Metabolic Reset (12 Weeks)
                  </h3>
                  <p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed">
                    Targeting insulin sensitivity restoration, cortisol rhythm leveling, and visceral lipid reduction using clean ancestral Indian wholesome grains and precision macro-timing.
                  </p>
                </div>

                <div className="mt-space-md pt-space-md bg-primary-container/40 p-space-md rounded-xl space-y-2 border border-primary-container/60">
                  <div className="flex justify-between font-label-sm text-label-sm text-primary-fixed font-semibold">
                    <span>Overall Program Milestone</span>
                    <span>Week 4 of 12 (33%)</span>
                  </div>
                  <div className="w-full bg-primary-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary-fixed h-full rounded-full" style={{ width: '33%' }}></div>
                  </div>
                  <span className="font-caption text-caption text-on-primary-container block">
                    Next blood lipid profile check: Day 42 (2 weeks remaining)
                  </span>
                </div>
              </div>

              {/* Dietitian Feedback */}
              <div className="md:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border border-surface-container-high/40">
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <img 
                        className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-secondary-fixed" 
                        alt="Dr. Anjali Sharma" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpi1v-z03wXBfAPQZEOuQFbparTMmyGFWKBFrWJYiBMKS1a_sMk6j9LKR4FJ3mQQCWY2g01Yd_anTfWkU6ToRfNR-7KvnezuriEwBj-daBPHfd1iCGATbhe3NjFiA1_4ve4Gcc_Ujb6U0kBCyYpq4JYi94AZYZyY99yspdJ9n0qAvYRm3KM4l8qXiPW2xY--samucZcTm-7l1Bk9xo4hjUCoGF9OaN-10B6pinyw" 
                      />
                      <div>
                        <p className="font-headline-sm text-headline-sm font-bold text-primary">
                          Clinical Observation &amp; Feedback
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Logged by Dr. Anjali Sharma, Chief Dietitian • Today 09:15 AM
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-2xl">clinical_notes</span>
                  </div>

                  <div className="p-space-md bg-surface-container-low rounded-xl text-on-surface space-y-2 border border-surface-container-high/40">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-lg font-fill">thumb_up</span>
                      <p className="font-label-lg text-label-lg font-semibold text-primary">
                        "Remarkable adherence on protein goals!"
                      </p>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      “Priyanshu, your post-lunch glucose stabilization has visibly flattened on the logs. Great job maintaining protein through paneer and dal combination! On your morning strength days (Tuesday/Thursday), please bump water intake by an additional <strong>500ml</strong> before 2 PM to optimize renal filtration.”
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm border-t border-surface-container-high/40 mt-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">alarm</span>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Next Clinical Checkpoint: Tomorrow, 11:30 AM IST
                    </span>
                  </div>
                  <button 
                    onClick={() => alert('Reply dialog opened: You can send a direct WhatsApp/portal message to Dr. Anjali Sharma.')}
                    className="font-label-sm text-label-sm font-semibold text-primary hover:text-secondary flex items-center gap-1 cursor-pointer"
                  >
                    Reply to Dietitian Notes <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Indian Food Compendium Modal */}
      <IndianFoodModal 
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        onAddFood={handleAddFood}
      />
    </div>
  );
}

