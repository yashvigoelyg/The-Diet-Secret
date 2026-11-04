import { storage } from '../services/storageService.js';

export const createOrder = (req, res, next) => {
  try {
    const { planId, planType = 'individual', paymentMethod = 'upi' } = req.body;

    let plan = null;
    if (planType === 'family' || planId === 'family') {
      plan = storage.getAllPlans().familyPlan;
    } else {
      plan = storage.getPlanById(planId || 'pcos');
    }

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found.'
      });
    }

    const order = storage.createOrder({
      planId: plan.id,
      planTitle: plan.title,
      planType,
      amount: plan.priceNum || parseInt(plan.price.replace(/,/g, ''), 10),
      originalAmount: plan.orig ? parseInt(plan.orig.replace(/,/g, ''), 10) : null,
      paymentMethod,
      gstExempted: true,
      onboardingIncluded: true
    });

    res.status(201).json({
      success: true,
      message: 'Razorpay / UPI Order created successfully',
      data: order
    });
  } catch (err) {
    next(err);
  }
};

export const verifyPayment = (req, res, next) => {
  try {
    const { orderId, paymentId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required to verify payment.'
      });
    }

    const verifiedOrder = storage.verifyPayment(orderId, paymentId);

    if (!verifiedOrder) {
      return res.status(404).json({
        success: false,
        message: `Order with ID '${orderId}' not found.`
      });
    }

    res.json({
      success: true,
      message: 'Payment verified successfully! Health intake unlocked.',
      data: verifiedOrder,
      nextStep: {
        action: 'open_intake_assessment',
        estimatedMinutes: 5
      }
    });
  } catch (err) {
    next(err);
  }
};

