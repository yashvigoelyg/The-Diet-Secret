/**
 * API client to communicate with the Node.js backend running at http://localhost:5000.
 * Falls back to local datasets seamlessly if backend is offline.
 */
import { individualPlans, familyPlan } from '../data/dietPlans';
import { dietitians } from '../data/dietitians';
import { indianFoods } from '../data/indianFoods';
import { superfoodRecipes } from '../data/recipes';
import { clinicalTransformations } from '../data/transformations';

const API_BASE_URL = 'http://localhost:5000/api';

const safeFetch = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API] Fallback used for ${url} (Backend may be offline):`, err.message);
    return null;
  }
};

export const api = {
  // Plans
  getPlans: async (category = 'all', type = 'individual') => {
    const res = await safeFetch(`/plans?category=${category}&type=${type}`);
    if (res && res.success) return res.data;
    if (type === 'family') return familyPlan;
    if (category === 'all') return individualPlans;
    return individualPlans.filter((p) => p.category === category);
  },

  // Dietitians
  getDietitians: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await safeFetch(`/dietitians?${query}`);
    if (res && res.success) return res.data;
    return dietitians;
  },

  // Bookings
  createBooking: async (bookingData) => {
    const res = await safeFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
    if (res && res.success) return res.data;
    return {
      id: `local-booking-${Date.now()}`,
      status: 'confirmed',
      ...bookingData,
    };
  },

  // Checkout & Orders
  createOrder: async (orderData) => {
    const res = await safeFetch('/checkout/create-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    if (res && res.success) return res.data;
    return {
      orderId: `order_tds_${Date.now()}`,
      status: 'pending',
      ...orderData,
    };
  },

  verifyPayment: async (orderId, paymentId) => {
    const res = await safeFetch('/checkout/verify-payment', {
      method: 'POST',
      body: JSON.stringify({ orderId, paymentId }),
    });
    if (res && res.success) return res.data;
    return {
      orderId,
      status: 'paid',
      paymentId: paymentId || `pay_tds_${Date.now()}`,
    };
  },

  // Dashboard
  getDashboardOverview: async () => {
    const res = await safeFetch('/dashboard/overview');
    if (res && res.success) return res.data;
    return null;
  },

  logWater: async (glassIndex = null) => {
    const res = await safeFetch('/dashboard/log-water', {
      method: 'POST',
      body: JSON.stringify({ glassIndex }),
    });
    return res?.data || null;
  },

  logFoodMeal: async (foodItem) => {
    const res = await safeFetch('/dashboard/log-meal', {
      method: 'POST',
      body: JSON.stringify(foodItem),
    });
    return res?.data || null;
  },

  confirmMeal: async (mealId) => {
    const res = await safeFetch(`/dashboard/meals/${mealId}/confirm`, {
      method: 'PATCH',
    });
    return res?.data || null;
  },

  // Foods
  getIndianFoods: async (search = '') => {
    const res = await safeFetch(`/foods?search=${encodeURIComponent(search)}`);
    if (res && res.success) return res.data;
    if (!search) return indianFoods;
    return indianFoods.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  },

  // Tools & BMI
  calculateBmi: async (calcData) => {
    const res = await safeFetch('/tools/bmi-calculate', {
      method: 'POST',
      body: JSON.stringify(calcData),
    });
    return res?.data || null;
  },

  getRecipes: async () => {
    const res = await safeFetch('/tools/recipes');
    if (res && res.success) return res.data;
    return superfoodRecipes;
  },

  getTransformations: async () => {
    const res = await safeFetch('/tools/transformations');
    if (res && res.success) return res.data;
    return clinicalTransformations;
  },
};

