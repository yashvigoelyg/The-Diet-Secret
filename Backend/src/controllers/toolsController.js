import { calculateBmiScore } from '../services/bmiService.js';
import { storage } from '../services/storageService.js';

export const calculateBmi = (req, res, next) => {
  try {
    const { height, weight, gender, age, activityLevel, primaryFocus } = req.body;

    if (!height || !weight) {
      return res.status(400).json({
        success: false,
        message: 'Height (cm) and Weight (kg) are required.'
      });
    }

    const result = calculateBmiScore({
      height,
      weight,
      gender,
      age,
      activityLevel,
      primaryFocus
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const getRecipes = (req, res, next) => {
  try {
    const recipes = storage.getAllRecipes();
    res.json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (err) {
    next(err);
  }
};

export const getTransformations = (req, res, next) => {
  try {
    const transformations = storage.getAllTransformations();
    res.json({
      success: true,
      count: transformations.length,
      data: transformations
    });
  } catch (err) {
    next(err);
  }
};

