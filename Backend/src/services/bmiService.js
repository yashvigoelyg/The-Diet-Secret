/**
 * Service to calculate Asian-Indian specific BMI according to
 * WHO Expert Consultation for Asian Populations & ICMR-NIN 2024 Guidelines.
 */
export const calculateBmiScore = ({ height, weight, gender = 'female', age = 30, activityLevel = 'sedentary', primaryFocus }) => {
  const h = parseFloat(height);
  const w = parseFloat(weight);

  if (!h || !w || h <= 40 || w <= 20) {
    throw new Error('Invalid height or weight values provided.');
  }

  const heightMeters = h / 100;
  const bmi = parseFloat((w / (heightMeters * heightMeters)).toFixed(1));

  let category = 'Normal / Healthy Weight';
  let riskLevel = 'Low';
  let badgeClass = 'bg-secondary text-on-secondary';
  let recommendation = 'Maintain balanced nutrient timing with whole Indian regional grains.';

  // Asian Indian Specific BMI Cutoffs:
  // Underweight: < 18.5
  // Healthy: 18.5 - 22.9
  // Overweight: 23.0 - 24.9
  // High Metabolic Risk: >= 25.0
  if (bmi < 18.5) {
    category = 'Underweight';
    riskLevel = 'Nutritional Deficiency Risk';
    badgeClass = 'bg-surface-container-high text-on-surface';
    recommendation = 'Focus on nutrient-dense calorie surplus with healthy fats, paneer, nuts, seeds, and slow-digesting carbs.';
  } else if (bmi <= 22.9) {
    category = 'Normal / Healthy Weight';
    riskLevel = 'Low Metabolic Risk';
    badgeClass = 'bg-secondary text-on-secondary';
    recommendation = 'Ideal Asian-Indian cutoff. Focus on maintaining lean muscle mass and optimizing micronutrient variety.';
  } else if (bmi <= 24.9) {
    category = 'Overweight';
    riskLevel = 'Moderate Metabolic Risk';
    badgeClass = 'bg-tertiary-fixed text-on-tertiary-fixed';
    recommendation = 'Elevated visceral fat risk. Recommended 15-20% caloric deficit with high fiber pulses and evening carb restriction.';
  } else {
    category = 'High Metabolic Risk / Obese';
    riskLevel = 'High Cardiovascular & Glycemic Risk';
    badgeClass = 'bg-error text-on-error';
    recommendation = 'Clinical nutrition therapy recommended. Prioritize insulin-sensitizing millets, seed cycling, and post-meal 15-minute walks.';
  }

  // BMR (Mifflin-St Jeor Formula)
  let bmr = (10 * w) + (6.25 * h) - (5 * age);
  bmr = gender.toLowerCase() === 'male' ? bmr + 5 : bmr - 161;
  bmr = Math.round(bmr);

  // Activity multiplier
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };
  const multiplier = multipliers[activityLevel] || 1.2;
  const tdee = Math.round(bmr * multiplier);

  // Recommended Macro Distribution according to Health Focus
  let macroSplit = { carbsPercent: 45, proteinPercent: 25, fatsPercent: 25, fibreGrams: 30 };
  if (primaryFocus?.includes('Diabetes')) {
    macroSplit = { carbsPercent: 35, proteinPercent: 30, fatsPercent: 30, fibreGrams: 38 };
  } else if (primaryFocus?.includes('PCOS')) {
    macroSplit = { carbsPercent: 40, proteinPercent: 28, fatsPercent: 27, fibreGrams: 32 };
  } else if (primaryFocus?.includes('Sports')) {
    macroSplit = { carbsPercent: 50, proteinPercent: 30, fatsPercent: 20, fibreGrams: 35 };
  }

  return {
    heightCm: h,
    weightKg: w,
    bmi,
    category,
    riskLevel,
    badgeClass,
    bmrKcal: bmr,
    tdeeKcal: tdee,
    targetCalorieRange: `${tdee - 350} - ${tdee - 150} kcal`,
    recommendation,
    macroSplit,
    primaryFocus: primaryFocus || 'Fat Loss & Metabolic Conditioning',
    standard: 'WHO Asian-Indian & ICMR-NIN 2024 Guidelines'
  };
};

