import { storage } from '../services/storageService.js';

export const getPlans = (req, res, next) => {
  try {
    const { category, type } = req.query;
    const all = storage.getAllPlans();

    if (type === 'family') {
      return res.json({
        success: true,
        data: all.familyPlan
      });
    }

    let plans = all.individualPlans;
    if (category && category !== 'all') {
      plans = plans.filter((p) => p.category === category);
    }

    res.json({
      success: true,
      count: plans.length,
      data: plans,
      familyPlan: all.familyPlan
    });
  } catch (err) {
    next(err);
  }
};

export const getPlanById = (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = storage.getPlanById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: `Plan with ID '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: plan
    });
  } catch (err) {
    next(err);
  }
};

