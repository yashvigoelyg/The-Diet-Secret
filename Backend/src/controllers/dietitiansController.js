import { storage } from '../services/storageService.js';

export const getDietitians = (req, res, next) => {
  try {
    const { search, mode, language, specialty } = req.query;
    let list = storage.getAllDietitians();

    if (search) {
      const term = search.toLowerCase().trim();
      list = list.filter((doc) =>
        doc.name.toLowerCase().includes(term) ||
        doc.title.toLowerCase().includes(term) ||
        doc.bio.toLowerCase().includes(term)
      );
    }

    if (mode && mode !== 'all') {
      list = list.filter((doc) => doc.mode === mode || doc.mode === 'both');
    }

    if (language && language !== 'all') {
      list = list.filter((doc) => doc.languageCodes.includes(language.toLowerCase()));
    }

    if (specialty && specialty !== 'all') {
      list = list.filter((doc) => doc.categoryCodes.includes(specialty.toLowerCase()));
    }

    res.json({
      success: true,
      total: list.length,
      data: list
    });
  } catch (err) {
    next(err);
  }
};

export const getDietitianById = (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = storage.getDietitianById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: `Dietitian with ID '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: doctor
    });
  } catch (err) {
    next(err);
  }
};

export const getAvailableSlots = (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = storage.getDietitianById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: `Dietitian with ID '${id}' not found.`
      });
    }

    const availableSlots = {
      dates: [
        { day: 'Thu', date: '24', isAvailable: true },
        { day: 'Fri', date: '25', isAvailable: true },
        { day: 'Sat', date: '26', isAvailable: true },
        { day: 'Mon', date: '28', isAvailable: true },
        { day: 'Tue', date: '29', isAvailable: true }
      ],
      timeSlots: {
        morning: ['10:00 AM', '11:30 AM'],
        afternoon: ['02:00 PM', '03:30 PM'],
        evening: ['04:00 PM', '05:30 PM', '07:00 PM']
      },
      modes: ['video', 'clinic']
    };

    res.json({
      success: true,
      doctor: doctor.name,
      fee: doctor.fee,
      slots: availableSlots
    });
  } catch (err) {
    next(err);
  }
};

