# The Diet Secrets - Full-Stack Clinical Nutrition & Wellness Platform

An evidence-based Indian clinical dietetics & metabolic health platform converted from the Stitch design system, featuring a **React 18 + Tailwind CSS** frontend and a **Node.js + Express** RESTful API backend.

---

## 🏗️ Project Architecture

```
stitch_the_diet_secrets_platform/
├── frontend/                          # React + Vite + Tailwind CSS Client
│   ├── src/
│   │   ├── components/                # Navbar, Footer, Sidebar, Modals
│   │   ├── pages/                     # Home, Diet Plans, Booking, Patient Dashboard
│   │   ├── services/api.js            # API client connected to backend (Port 5000)
│   │   └── data/                      # Client-side datasets (fallback)
│   ├── package.json
│   └── vite.config.js                 # Runs on http://localhost:3000
│
├── backend/                           # Node.js + Express REST API
│   ├── server.js                      # Entry point running on http://localhost:5000
│   ├── src/
│   │   ├── controllers/               # Plans, Dietitians, Bookings, Checkout, Dashboard, Foods, Tools
│   │   ├── routes/                    # Express modular routers
│   │   ├── services/                  # In-memory storage & Asian-Indian WHO/ICMR BMI calculator
│   │   ├── middlewares/               # Error handling, request logger, Multer file upload
│   │   └── data/                      # IFCT 2017 foods, protocols, doctor profiles, patient log
│   ├── uploads/                       # Medical blood test reports uploaded by patients
│   └── package.json
│
└── stitch_the_diet_secrets_platform/  # Original Stitch design templates & assets
```

---

## ⚡ Quick Start Guide

### 1. Start the Backend API (Port 5000)
In your terminal / PowerShell:
```bash
cd backend
npm install
npm run dev
```
> Server will start at **`http://localhost:5000`** with live reload.
> Health check: `http://localhost:5000/health`
> API Directory: `http://localhost:5000/`

### 2. Start the Frontend Application (Port 3000)
In a second terminal / PowerShell:
```bash
cd frontend
npm install
npm run dev
```
> Frontend will open at **`http://localhost:3000`** with instant Hot Module Replacement (HMR).

---

## 🌟 Key Features

1. **Evidence-Based Medical Nutrition Therapy (Home Page):**
   - Asian-Indian calibrated BMI tool with real-time ICMR cutoff classification (`<18.5`, `18.5-22.9`, `23.0-24.9`, `≥25.0`).
   - Verified clinical transformations with NABL-accredited lab markers.
   - Clinical specialties bento grid & 4 core scientific pillars.

2. **Diet Plans & Checkout (Diet Plans Page):**
   - Switch between Individual and Couple/Family protocols with 25% discount.
   - Category filtering (All, Hormonal & PCOS, Diabetes & Metabolic, Fat Loss).
   - Sticky interactive checkout drawer with live price/plan selection, UPI/Card/EMI options.

3. **Clinician Booking & Triage (Booking Page):**
   - Multi-faceted specialist directory (search by name, hospital, condition; filter by mode, language, focus).
   - Mode selector (Online Video vs In-Clinic Visit in Mumbai, Delhi, Bengaluru).
   - 7-day interactive date picker & time slots.
   - Patient intake form with medical blood report upload.
   - Appointment confirmation modal with instant WhatsApp invite generation.

4. **Patient Portal & Calorie Tracker (Dashboard):**
   - Day 24 of 84 milestone tracker with direct telehealth video consultation card.
   - Daily Calorie & Macro Distribution with reactive circular SVG donut gauge.
   - Interactive 12-glass hydration tracker (+250ml quick-add and individual glass toggle).
   - Prescribed daily meal logs with "Mark as Eaten" meal confirmation.
   - 7-Day Caloric & Protein adherence chart and 6-week weight trajectory sparkline.
   - Indian Food Compendium search modal to log traditional Indian meals in real-time.

