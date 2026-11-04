import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../data');

// Load JSON helper
const loadJson = (filename) => {
  try {
    const raw = fs.readFileSync(path.join(dataDir, filename), 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading ${filename}:`, err.message);
    return null;
  }
};

class StorageService {
  constructor() {
    this.plansData = loadJson('dietPlans.json') || { individualPlans: [], familyPlan: {} };
    this.dietitians = loadJson('dietitians.json') || [];
    this.indianFoods = loadJson('indianFoods.json') || [];
    this.recipes = loadJson('recipes.json') || [];
    this.transformations = loadJson('transformations.json') || [];
    this.dashboard = loadJson('initialDashboard.json') || {};
    
    // Dynamic collections
    this.bookings = [];
    this.orders = [];
    this.intakes = [];
  }

  // --- Plans ---
  getAllPlans() {
    return this.plansData;
  }

  getPlanById(id) {
    if (id === 'family') {
      return this.plansData.familyPlan;
    }
    return this.plansData.individualPlans.find((p) => p.id === id);
  }

  // --- Dietitians ---
  getAllDietitians() {
    return this.dietitians;
  }

  getDietitianById(id) {
    return this.dietitians.find((d) => d.id === id);
  }

  // --- Bookings ---
  createBooking(bookingData) {
    const newBooking = {
      id: `booking-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      ...bookingData
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  getAllBookings() {
    return this.bookings;
  }

  getBookingById(id) {
    return this.bookings.find((b) => b.id === id);
  }

  // --- Checkout & Orders ---
  createOrder(orderData) {
    const newOrder = {
      orderId: `order_tds_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      currency: 'INR',
      ...orderData
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  verifyPayment(orderId, paymentId) {
    const order = this.orders.find((o) => o.orderId === orderId);
    if (!order) return null;
    order.status = 'paid';
    order.paymentId = paymentId || `pay_tds_${Date.now()}`;
    order.paidAt = new Date().toISOString();
    return order;
  }

  // --- Dashboard & Daily Log ---
  getDashboard() {
    return this.dashboard;
  }

  logWaterQuick() {
    const glasses = this.dashboard.hydration.loggedGlasses;
    const nextUnloggedIndex = glasses.findIndex((g) => !g);
    if (nextUnloggedIndex !== -1) {
      glasses[nextUnloggedIndex] = true;
    }
    this.dashboard.hydration.currentMl = glasses.filter(Boolean).length * 250;
    return this.dashboard.hydration;
  }

  toggleWaterGlass(index) {
    const glasses = this.dashboard.hydration.loggedGlasses;
    if (index >= 0 && index < glasses.length) {
      glasses[index] = !glasses[index];
      this.dashboard.hydration.currentMl = glasses.filter(Boolean).length * 250;
    }
    return this.dashboard.hydration;
  }

  logFoodItem(foodItem) {
    const kcal = Number(foodItem.kcal || foodItem.calories || 0);
    const protein = Number(foodItem.protein || 0);
    const carbs = Number(foodItem.carbs || 0);
    const fats = Number(foodItem.fats || 0);

    this.dashboard.nutrition.consumedCalories += kcal;
    this.dashboard.nutrition.macros.protein.current += protein;
    this.dashboard.nutrition.macros.carbs.current += carbs;
    this.dashboard.nutrition.macros.fats.current += fats;

    return {
      consumedCalories: this.dashboard.nutrition.consumedCalories,
      targetCalories: this.dashboard.nutrition.targetCalories,
      macros: this.dashboard.nutrition.macros,
      addedFood: foodItem
    };
  }

  confirmMeal(mealId) {
    const meal = this.dashboard.meals.find((m) => m.id === mealId);
    if (meal && meal.status !== 'Logged') {
      meal.status = 'Logged';
      this.dashboard.nutrition.consumedCalories += (meal.calories || 0);
      return meal;
    }
    return meal;
  }

  // --- Indian Foods Compendium ---
  getAllFoods() {
    return this.indianFoods;
  }

  addCustomFood(food) {
    const newFood = {
      id: `food-${Date.now()}`,
      ...food
    };
    this.indianFoods.push(newFood);
    return newFood;
  }

  // --- Recipes & Transformations ---
  getAllRecipes() {
    return this.recipes;
  }

  getAllTransformations() {
    return this.transformations;
  }

  // --- Clinical Intake Forms ---
  saveIntakeForm(intakeData) {
    const newIntake = {
      intakeId: `intake-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      ...intakeData
    };
    this.intakes.push(newIntake);
    return newIntake;
  }
}

export const storage = new StorageService();

