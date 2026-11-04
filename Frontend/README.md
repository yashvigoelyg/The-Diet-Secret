# The Diet Secrets - Clinical Nutrition & Wellness Platform (React)

A modern, responsive, evidence-based Indian clinical dietetics & metabolic nutrition web application converted from the Stitch design system.

## 🌿 Overview of Pages Converted

1. **Home Page (`src/pages/HomePage.jsx`)**
   - **Hero Section:** Clinical credibility badges (ICMR & IDA Certified, Indian Regional Diets, 98% Success Rate), high-converting CTAs, micro-proof statistics (15,000+ lives, 4.9/5 rating, 28+ days habit reset).
   - **Composite Live Nutrition Preview:** Clinician node (Dr. Anjali Sharma), daily target balance gauge with donut chart, macronutrient breakdown tags (Carbs, Protein, Fats), hydration tracker, and floating glycemic index badge.
   - **Clinical Specialties Bento Grid:** 6 programs including Diabetes Reversal, PCOS/PCOD & Thyroid, Sustainable Fat Loss, Gut Microbiome, Sports Nutrition, Cardio-Renal.
   - **Why India Trusts The Diet Secrets:** 4 Core scientific pillars (100% Customized Indian Meals, Weekly 1-on-1 Consults, Continuous Bio-Tracking, Lab-Aligned Protocols).
   - **Featured Indian Superfood Meals:** 4 curated recipes (Sprouted Moong Paneer Bowl, Ragi Chilla, Quinoa Dal, Turmeric Elixir) with preparation times and macro counts.
   - **Verified Clinical Transformations:** Real NABL-accredited transformation case studies with before/after clinical lab metrics.
   - **Interactive Asian-Indian BMI Calculator:** Reactive BMI calculator calibrated strictly to Asian-Indian WHO/ICMR cutoffs (<18.5, 18.5-22.9, 23.0-24.9, >=25.0) with dynamic category and styling updates.
   - **Booking Lead & WhatsApp Support Bar:** Direct booking and consultation inquiries.

2. **Diet Plans & Checkout Page (`src/pages/DietPlansCheckoutPage.jsx`)**
   - **Individual vs Couple / Family Protocol Switcher:** Dynamic switcher with instant price adjustments (SAVE 25% on Family Plan).
   - **Category Filters:** Filter by All Plans, Hormonal & PCOS, Diabetes & Metabolic, Fat Loss.
   - **Specialized Plan Cards:** Weight Management & Fat Loss Protocol, PCOS & Hormonal Healing Plan, Diabetes Reversal Plan, Thyroid & Gut Reset, Sports Performance & Lean Muscle.
   - **Interactive Protocol Checkout Aside:** Real-time synchronization of selected plan, duration, discounted pricing, step-by-step clinical intake teaser, payment method selector (UPI/GPay, Card, No-Cost EMI), and secure checkout action.
   - **Clinical Success Outcomes:** 24-month clinical progress metrics (PCOS period regularization 88.4%, HbA1c reduction -1.8%, 1-year weight maintenance 92.1%).
   - **Frequently Asked Questions:** Expandable accordion FAQs with transparent clinical guidelines.

3. **Dietitian Booking Page (`src/pages/DietitianBookingPage.jsx`)**
   - **Specialist Directory & Multifaceted Filtering:** Real-time search by doctor name, hospital, condition; filter by consultation mode (Video, Clinic Visit, Both); filter by language; filter by clinical specialty pills.
   - **Doctor Profile Cards:** Detailed profiles for Dr. Anjali Sharma (AIIMS/Apollo), Dr. Vikram Malhotra (Sports), Dr. Sunita Kulkarni (CDE), Dr. Ritu Sen (Gut Microbiome) with ratings, degrees, consultation fees, and availability.
   - **Interactive Booking Console:** Mode selector (Video Consult vs In-Clinic), 7-day horizontal date picker, time slot selector (Morning, Afternoon, Evening), and patient intake form.
   - **Lab Report Upload Dropzone:** PDF/JPG recent blood test reports attachment.
   - **Appointment Confirmation Modal:** Interactive modal displaying confirmed booking details, date, time, and follow-up guidance.
   - **What to Expect in Your 45-Minute Consultation:** 4-step consultation structure (Metabolic recall, blood pathology, body composition, custom 7-day protocol).

4. **User Dashboard & Calorie Tracker (`src/pages/UserDashboardPage.jsx`)**
   - **Patient Portal Sidebar Navigation:** Overview & Tracking, My Diet Sheet, Dietitian Visits, Vitals & Biometrics, Prescribed Recipes, Public Site.
   - **Personalized Header & Telehealth Notice:** Day 24 of 84 tracker with direct Google Meet/Zoom video link for next dietitian check-in.
   - **Daily Calorie & Macro Distribution:** Reactive SVG donut gauge showing consumed vs target calories (1,420 / 1,850 kcal) with live stroke recalculation.
   - **Macronutrient Progress Bars:** Protein, Complex Carbs, Healthy Fats, Dietary Fibre with target milestones and clinical recommendations.
   - **Interactive Hydration Tracker:** 12-glass grid (tap any glass to toggle logged/unlogged, +250ml quick add) updating water volume live.
   - **Sleep Quality & Step Counter Cards:** 7h 20m restorative sleep, 8,420 steps.
   - **Daily Meal Logs:** Breakfast, Lunch, Evening Snack, Dinner with Indian Food Composition Tables (IFCT 2017) integration and interactive "Mark as Eaten" meal confirmation.
   - **Visual Analytics:** 7-Day Caloric & Protein Adherence SVG chart, 6-Week Weight Trajectory sparkline (-4.2 kg total).
   - **Dietitian Clinical Feedback Note:** Personalized clinical notes from Dr. Anjali Sharma.
   - **Indian Food Compendium Modal (`IndianFoodModal`):** Search and add Indian dishes (Phulka, Dal Tadka, Paneer Bhurji, Curd, Brown Rice, Sprouts) that dynamically increase the daily calorie counter and ring progress.

---

## 🚀 Running the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine (v18+ recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000` with instant hot-module-replacement (HMR).

### 3. Build for Production
```bash
npm run build
```

---

## 🎨 Design Tokens & System

Configured in `tailwind.config.js` following the `clinical_botanics` design specifications:
- **Primary Color:** `#163328` (Deep Forest Green)
- **Primary Container:** `#2d4a3e`
- **Secondary Color:** `#406840` (Sage Green)
- **Secondary Container:** `#beecb9`
- **Background / Surface:** `#f9f9ff`
- **Typography:** `Plus Jakarta Sans` for headlines & titles, `Inter` for clinical data & body copy
- **Iconography:** Google Material Symbols Outlined

