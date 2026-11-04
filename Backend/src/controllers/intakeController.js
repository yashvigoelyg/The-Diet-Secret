import { storage } from '../services/storageService.js';

export const submitIntake = (req, res, next) => {
  try {
    const {
      patientName,
      patientPhone,
      dietPreference, // Veg, Non-Veg, Jain
      regionalStaples,
      allergies,
      dailyRoutine,
      primaryHealthGoal,
      pastMedicalReports
    } = req.body;

    const intake = storage.saveIntakeForm({
      patientName,
      patientPhone,
      dietPreference: dietPreference || 'Vegetarian',
      regionalStaples: regionalStaples || ['Roti', 'Dal', 'Sabzi'],
      allergies: allergies || 'None',
      dailyRoutine: dailyRoutine || '',
      primaryHealthGoal: primaryHealthGoal || 'PCOS & Hormonal Healing',
      pastMedicalReports: pastMedicalReports || (req.file ? req.file.filename : null),
      assignedClinician: 'Dr. Anjali Sharma, PhD, RD',
      onboardingCallScheduled: true
    });

    res.status(201).json({
      success: true,
      message: 'Comprehensive health intake assessment submitted successfully! Your Senior Dietitian will review within 4 hours.',
      data: intake
    });
  } catch (err) {
    next(err);
  }
};

