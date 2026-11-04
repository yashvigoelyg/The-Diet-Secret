import { storage } from '../services/storageService.js';

export const getDashboardOverview = (req, res, next) => {
  try {
    const dashboard = storage.getDashboard();
    res.json({
      success: true,
      data: dashboard
    });
  } catch (err) {
    next(err);
  }
};

export const logWater = (req, res, next) => {
  try {
    const { action, glassIndex } = req.body;

    let updatedHydration;
    if (glassIndex !== undefined && glassIndex !== null) {
      updatedHydration = storage.toggleWaterGlass(Number(glassIndex));
    } else {
      updatedHydration = storage.logWaterQuick();
    }

    res.json({
      success: true,
      message: 'Hydration updated successfully',
      data: updatedHydration
    });
  } catch (err) {
    next(err);
  }
};

export const logFoodMeal = (req, res, next) => {
  try {
    const { name, kcal, protein = 0, carbs = 0, fats = 0, portion } = req.body;

    if (!name || !kcal) {
      return res.status(400).json({
        success: false,
        message: 'Food item name and kcal are required.'
      });
    }

    const result = storage.logFoodItem({
      name,
      kcal: Number(kcal),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      portion: portion || '1 serving',
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    res.json({
      success: true,
      message: `Logged '${name}' (+${kcal} kcal) to daily journal.`,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const confirmMealStatus = (req, res, next) => {
  try {
    const { mealId } = req.params;
    const updatedMeal = storage.confirmMeal(mealId);

    if (!updatedMeal) {
      return res.status(404).json({
        success: false,
        message: `Meal slot '${mealId}' not found.`
      });
    }

    res.json({
      success: true,
      message: `Meal '${updatedMeal.type}' marked as consumed!`,
      data: updatedMeal,
      consumedCalories: storage.getDashboard().nutrition.consumedCalories
    });
  } catch (err) {
    next(err);
  }
};

export const getAdherenceAnalytics = (req, res, next) => {
  try {
    const adherenceData = {
      targetBaselineKcal: 1850,
      days: [
        { day: 'Mon', kcal: 1820, proteinMet: true },
        { day: 'Tue', kcal: 1860, proteinMet: true },
        { day: 'Wed', kcal: 1790, proteinMet: true },
        { day: 'Thu', kcal: 1840, proteinMet: true },
        { day: 'Fri', kcal: 1910, proteinMet: true },
        { day: 'Sat', kcal: 1830, proteinMet: true },
        { day: 'Today', kcal: storage.getDashboard().nutrition.consumedCalories, proteinMet: true }
      ],
      weeklyCaloricVariance: '+1.2%',
      complianceRate: '96.4%'
    };

    res.json({
      success: true,
      data: adherenceData
    });
  } catch (err) {
    next(err);
  }
};

export const getWeightTrajectory = (req, res, next) => {
  try {
    const trajectory = {
      baselineWeightKg: 79.4,
      currentWeightKg: 75.2,
      netLossKg: -4.2,
      bmi: 24.1,
      bmiStatus: 'Normalized',
      recordedWeeks: [
        { week: 'Week 1', date: 'May 4', weightKg: 79.4 },
        { week: 'Week 2', date: 'May 11', weightKg: 78.5 },
        { week: 'Week 3', date: 'May 18', weightKg: 77.6 },
        { week: 'Week 4', date: 'May 25', weightKg: 76.8 },
        { week: 'Week 5', date: 'Jun 1', weightKg: 75.9 },
        { week: 'Week 6 (Current)', date: 'Jun 8', weightKg: 75.2 }
      ]
    };

    res.json({
      success: true,
      data: trajectory
    });
  } catch (err) {
    next(err);
  }
};

export const getDietitianNotes = (req, res, next) => {
  try {
    const notes = storage.getDashboard().dietitianNotes;
    res.json({
      success: true,
      data: notes
    });
  } catch (err) {
    next(err);
  }
};

