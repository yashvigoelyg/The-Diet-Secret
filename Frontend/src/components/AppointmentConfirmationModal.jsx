import React from 'react';

export default function AppointmentConfirmationModal({ isOpen, onClose, details }) {
  if (!isOpen || !details) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm px-4">
      <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-space-lg space-y-space-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>
        
        <div className="text-center space-y-space-xs">
          <h3 className="font-headline-lg text-headline-lg text-primary font-bold">
            Appointment Confirmed!
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We've reserved your 45-minute clinical session. You will receive an instant WhatsApp invitation and Google Meet/Zoom link shortly.
          </p>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl space-y-2 font-body-sm text-body-sm text-on-surface">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Dietitian:</span>
            <span className="font-semibold text-primary">{details.doctorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Date &amp; Time:</span>
            <span className="font-semibold text-primary">{details.dateTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Patient Name:</span>
            <span className="font-semibold text-primary">{details.patientName || 'Priyanshu'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Consultation Mode:</span>
            <span className="font-semibold text-primary capitalize">{details.mode || 'Video Consult'}</span>
          </div>
          <div className="flex justify-between border-t border-surface-container-high/60 pt-2">
            <span className="text-on-surface-variant">Consultation Fee:</span>
            <span className="font-semibold text-secondary text-headline-sm">{details.fee}</span>
          </div>
        </div>

        <div className="space-y-2">
          <button 
            className="w-full py-3 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary transition-all" 
            onClick={onClose}
          >
            Done &amp; Return to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}

