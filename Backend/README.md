# The Diet Secrets - Node.js Backend API

RESTful API backend for **The Diet Secrets** clinical dietetics and metabolic health platform, powering the React frontend.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js 4.x
- **Cross-Origin:** CORS enabled for frontend communication
- **File Uploads:** Multer (stores clinical blood/lab reports in `uploads/`)
- **Architecture:** Clean MVC pattern (Routes, Controllers, Services, Middlewares)
- **Data Source:** In-memory + JSON persistence (IFCT 2017 Indian Food Compendium, clinical protocols, dietitian directories, live patient logs)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
- **Development (with hot reload):**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm start
  ```

The server will launch at **`http://localhost:5000`**.

---

## 📡 API Endpoints Overview

### 1. Health & Meta
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status and route directory |
| `GET` | `/health` | Server uptime & status check |

---

### 2. Clinical Diet Plans (`/api/plans`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/plans` | Get all protocols (optional query: `?category=hormonal&type=individual`) |
| `GET` | `/api/plans/:id` | Get single protocol details (e.g. `fatloss`, `pcos`, `diabetes`, `family`) |

---

### 3. Dietitians Directory (`/api/dietitians`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dietitians` | Filter specialists (`?search=anjali&mode=video&language=hindi&specialty=pcos`) |
| `GET` | `/api/dietitians/:id` | Get clinician profile by ID (`anjali-sharma`, `vikram-malhotra`, etc.) |
| `GET` | `/api/dietitians/:id/slots` | Get available appointment dates, time windows, and modes |

---

### 4. Consultations & Bookings (`/api/bookings`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings` | Book consultation (multipart/form-data supported for blood test report upload) |
| `GET` | `/api/bookings` | List all booked appointments |
| `GET` | `/api/bookings/:id` | Get booking confirmation by ID |

**Example Booking Payload (JSON or Form-Data):**
```json
{
  "patientName": "Priyanshu Sharma",
  "patientPhone": "+919876543210",
  "doctorId": "anjali-sharma",
  "mode": "video",
  "date": "Thu 24 Oct",
  "timeSlot": "04:00 PM",
  "healthGoal": "pcos"
}
```

---

### 5. Protocol Checkout & Payments (`/api/checkout`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/checkout/create-order` | Generates Razorpay / UPI order ID (`{ planId: "pcos", paymentMethod: "upi" }`) |
| `POST` | `/api/checkout/verify-payment` | Verifies transaction (`{ orderId: "order_tds_...", paymentId: "pay_..." }`) |

---

### 6. Patient Portal & Daily Tracker (`/api/dashboard`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/overview` | Patient profile, active protocol, upcoming session & full daily stats |
| `POST` | `/api/dashboard/log-water` | Log hydration (`{ "glassIndex": 9 }` or empty body for `+250ml quick-add`) |
| `POST` | `/api/dashboard/log-meal` | Log Indian food item to today's calories & macros |
| `PATCH` | `/api/dashboard/meals/:mealId/confirm`| Mark scheduled meal as eaten (e.g. `dinner`) |
| `GET` | `/api/dashboard/analytics/weekly-adherence` | 7-day adherence dataset (Mon-Today) with variance |
| `GET` | `/api/dashboard/analytics/weight-trajectory` | 6-week weight tracking curve & BMI status |
| `GET` | `/api/dashboard/dietitian-notes` | Personalized dietitian clinical observation note |

**Example Log Food Payload:**
```json
{
  "name": "Paneer Bhurji (Low-fat)",
  "kcal": 180,
  "protein": 18,
  "carbs": 4,
  "fats": 10,
  "portion": "100g serving"
}
```

---

### 7. Indian Food Compendium (`/api/foods`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/foods` | Search Indian Food Composition Tables (`?search=roti&category=grains`) |
| `POST` | `/api/foods` | Add custom Indian recipe/dish to database |

---

### 8. Health Assessment & Asian-Indian BMI (`/api/tools`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tools/bmi-calculate` | Calculates Asian-Indian WHO/ICMR calibrated BMI, BMR, TDEE & macro split |
| `GET` | `/api/tools/recipes` | List featured Indian superfood recipes |
| `GET` | `/api/tools/transformations` | List verified clinical patient transformations |

**Example Asian-Indian BMI Calculation Request:**
```json
{
  "height": 172,
  "weight": 74,
  "gender": "female",
  "age": 30,
  "activityLevel": "sedentary",
  "primaryFocus": "PCOS / Hormonal Balancing"
}
```

---

### 9. Post-Payment Clinical Intake (`/api/intake`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/intake` | Submit 5-minute diagnostic questionnaire (food habits, allergies, medical history) |

