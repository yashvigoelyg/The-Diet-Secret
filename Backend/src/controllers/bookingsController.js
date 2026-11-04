import { storage } from '../services/storageService.js';

export const createBooking = (req, res, next) => {
  try {
    const {
      patientName,
      patientPhone,
      doctorId,
      doctorName,
      mode,
      date,
      timeSlot,
      healthGoal,
      notes
    } = req.body;

    if (!patientName || !patientPhone) {
      return res.status(400).json({
        success: false,
        message: 'Patient name and WhatsApp phone number are required.'
      });
    }

    // Resolve doctor if ID is provided
    let doctor = null;
    if (doctorId) {
      doctor = storage.getDietitianById(doctorId);
    }

    const bookingPayload = {
      patientName,
      patientPhone,
      doctorId: doctor ? doctor.id : (doctorId || 'anjali-sharma'),
      doctorName: doctor ? doctor.name : (doctorName || 'Dr. Anjali Sharma, PhD, RD'),
      fee: doctor ? doctor.fee : '₹1,499',
      mode: mode || 'video',
      date: date || 'Thu 24 Oct 2025',
      timeSlot: timeSlot || '04:00 PM',
      healthGoal: healthGoal || 'pcos',
      notes: notes || '',
      uploadedReport: req.file ? req.file.filename : null,
      meetLink: mode === 'video' ? 'https://meet.google.com/tds-consult' : null,
      clinicLocation: mode === 'clinic' ? 'Bandra West, Linking Rd, Mumbai' : null
    };

    const booking = storage.createBooking(bookingPayload);

    res.status(201).json({
      success: true,
      message: 'Consultation appointment confirmed successfully! WhatsApp invitation generated.',
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

export const getBookings = (req, res, next) => {
  try {
    const bookings = storage.getAllBookings();
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};

export const getBookingById = (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = storage.getBookingById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

