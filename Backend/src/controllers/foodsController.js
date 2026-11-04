import { storage } from '../services/storageService.js';

export const getIndianFoods = (req, res, next) => {
  try {
    const { search, category } = req.query;
    let list = storage.getAllFoods();

    if (search) {
      const term = search.toLowerCase().trim();
      list = list.filter((f) => f.name.toLowerCase().includes(term));
    }

    if (category && category !== 'all') {
      list = list.filter((f) => f.category === category);
    }

    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    next(err);
  }
};

export const addIndianFood = (req, res, next) => {
  try {
    const { name, portion, kcal, protein, carbs, fats, category, tag } = req.body;

    if (!name || !kcal) {
      return res.status(400).json({
        success: false,
        message: 'Name and kcal are required to add a food item.'
      });
    }

    const newFood = storage.addCustomFood({
      name,
      portion: portion || '1 serving',
      kcal: Number(kcal),
      protein: Number(protein || 0),
      carbs: Number(carbs || 0),
      fats: Number(fats || 0),
      category: category || 'custom',
      tag: tag || name.substring(0, 3).toUpperCase(),
      tagBg: 'bg-secondary-container',
      tagText: 'text-on-secondary-container'
    });

    res.status(201).json({
      success: true,
      message: `Food '${name}' added to compendium.`,
      data: newFood
    });
  } catch (err) {
    next(err);
  }
};

