import React, { useState } from 'react';
import { dietitians } from '../data/dietitians';
import AppointmentConfirmationModal from '../components/AppointmentConfirmationModal';

export default function DietitianBookingPage({ setActivePage, selectedDoctorId }) {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState('all'); // 'all' | 'video' | 'clinic' | 'both'
  const [languageFilter, setLanguageFilter] = useState('all'); // 'all' | 'english' | 'hindi' | ...
  const [activeSpec, setActiveSpec] = useState('all'); // 'all' | 'diabetes' | 'pcos' | 'bariatric' | 'gut' | 'sports'

  // Booking console state
  const initialDoctor = dietitians.find((d) => d.id === selectedDoctorId) || dietitians[0];
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor);
  const [bookingMode, setBookingMode] = useState('video'); // 'video' | 'clinic'
  const [selectedDate, setSelectedDate] = useState('Thu 24');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('04:00 PM');
  
  // Patient form state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [healthGoal, setHealthGoal] = useState('pcos');
  const [uploadedFile, setUploadedFile] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);

  // Filter dietitians
  const filteredDietitians = dietitians.filter((doc) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || 
      doc.name.toLowerCase().includes(term) ||
      doc.title.toLowerCase().includes(term) ||
      doc.bio.toLowerCase().includes(term);

    const matchesSpec = activeSpec === 'all' || doc.categoryCodes.includes(activeSpec);
    const matchesMode = modeFilter === 'all' || doc.mode === modeFilter || doc.mode === 'both';
    const matchesLang = languageFilter === 'all' || doc.languageCodes.includes(languageFilter);

    return matchesSearch && matchesSpec && matchesMode && matchesLang;
  });

  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
    // Smooth scroll to booking panel on mobile
    if (window.innerWidth < 1280) {
      document.getElementById('booking-panel')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!patientPhone.trim()) {
      alert('Please enter your WhatsApp contact number');
      return;
    }

    setModalDetails({
      doctorName: selectedDoctor.name,
      dateTime: `${selectedDate} Oct 2025 at ${selectedTimeSlot}`,
      patientName: patientName,
      mode: bookingMode === 'video' ? 'Online Video Consult' : 'In-Clinic Visit',
      fee: selectedDoctor.fee,
    });
    setIsModalOpen(true);
  };

  const dates = [
    { day: 'Thu', date: '24' },
    { day: 'Fri', date: '25' },
    { day: 'Sat', date: '26' },
    { day: 'Mon', date: '28' },
    { day: 'Tue', date: '29' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Subtle Ambient Glows */}
      <div className="relative w-full overflow-hidden bg-surface py-space-lg lg:py-space-xl px-margin-mobile lg:px-margin">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-surface-container-high/40 blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto space-y-space-xl">
          {/* Top Clinical Intro & Breadcrumb Meta */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="space-y-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
                <span className="material-symbols-outlined text-sm font-fill">verified</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  IDA Accredited Registered Dietitians
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                Clinical Dietitian Consultations
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Schedule an evidence-backed medical nutrition therapy session. Personalized metabolic protocols, clinical laboratory review, and sustainable Indian dietary management.
              </p>
            </div>
            
            <div className="flex items-center gap-space-md self-start md:self-end bg-surface-container-lowest px-4 py-2.5 rounded-full shadow-sm border border-surface-container-high/60">
              <div className="flex items-center -space-x-2">
                <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                  4.9
                </span>
                <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-sm text-label-sm font-bold">
                  ★
                </span>
              </div>
              <div className="text-left">
                <p className="font-label-md text-label-md text-on-surface font-semibold">1,950+ Clinical Reviews</p>
                <p className="font-caption text-caption text-secondary">Verified Metabolic Transformations</p>
              </div>
            </div>
          </div>

          {/* Search & Multifaceted Filtering Matrix */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-sm space-y-space-md border border-surface-container-high/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
              <div className="lg:col-span-6 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input 
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all" 
                  placeholder="Search by clinical specialist, hospital background, or health condition..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="lg:col-span-3">
                <div className="relative">
                  <label className="block font-caption text-caption uppercase text-on-surface-variant mb-1 font-semibold">
                    Consultation Mode
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface focus:outline-none"
                    value={modeFilter}
                    onChange={(e) => setModeFilter(e.target.value)}
                  >
                    <option value="all">All Consultation Modes</option>
                    <option value="video">Online Video Consult (Zoom/Meet)</option>
                    <option value="clinic">Clinic Visit (Mumbai, Delhi, BLR)</option>
                    <option value="both">Both Available</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="relative">
                  <label className="block font-caption text-caption uppercase text-on-surface-variant mb-1 font-semibold">
                    Consult Language
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface focus:outline-none"
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                  >
                    <option value="all">Any Language (English, Hindi+)</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="tamil">Tamil</option>
                    <option value="telugu">Telugu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Specialization Pill Filters */}
            <div className="pt-space-xs">
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-2 font-semibold">
                Filter by Clinical Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Disciplines' },
                  { id: 'diabetes', label: 'Clinical Nutrition & Diabetes' },
                  { id: 'pcos', label: 'PCOS & Hormonal Health' },
                  { id: 'bariatric', label: 'Weight Management & Bariatric' },
                  { id: 'gut', label: 'Thyroid & Gut Health' },
                  { id: 'sports', label: 'Sports Nutrition & Recomp' },
                ].map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setActiveSpec(spec.id)}
                    className={`font-label-sm text-label-sm px-4 py-2 rounded-full transition-all cursor-pointer ${
                      activeSpec === spec.id
                        ? 'bg-primary-container text-on-primary shadow-sm font-bold'
                        : 'bg-surface-container-low text-on-surface hover:bg-secondary-container hover:text-on-secondary-container'
                    }`}
                  >
                    {spec.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Layout: Grid of Profiles + Interactive Live Booking Side Dock */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
            
            {/* Left: Dietitian Profiles Grid */}
            <div className="xl:col-span-8 space-y-space-md">
              <div className="flex items-center justify-between pb-space-xs">
                <p className="font-label-lg text-label-lg text-primary font-semibold">
                  Available Clinical Specialists ({filteredDietitians.length})
                </p>
                <span className="font-caption text-caption text-secondary flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span>
                  Live slots open today
                </span>
              </div>

              {filteredDietitians.length === 0 ? (
                <div className="bg-surface-container-lowest p-8 rounded-xl text-center text-on-surface-variant">
                  No clinical specialists match your search criteria. Try resetting filters.
                </div>
              ) : (
                filteredDietitians.map((doc) => {
                  const isSelected = selectedDoctor.id === doc.id;
                  return (
                    <article
                      key={doc.id}
                      onClick={() => handleSelectDoctor(doc)}
                      className={`bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer border ${
                        isSelected 
                          ? 'ring-2 ring-secondary/40 border-secondary/40' 
                          : 'border-surface-container-high/60'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row gap-space-md">
                        {/* Avatar & Badges */}
                        <div className="flex flex-col items-center md:items-start shrink-0">
                          <div className="relative">
                            <img 
                              className="w-24 h-24 lg:w-28 lg:h-28 rounded-xl object-cover shadow-sm ring-1 ring-secondary/30" 
                              src={doc.avatar} 
                              alt={doc.name} 
                            />
                            <span className="absolute -bottom-2 -right-2 bg-secondary text-on-secondary font-caption text-caption px-2 py-0.5 rounded-full shadow font-semibold">
                              {doc.badge}
                            </span>
                          </div>
                          <div className="mt-4 flex items-center gap-1 text-tertiary-container">
                            <span className="material-symbols-outlined text-base font-fill">star</span>
                            <span className="font-label-md text-label-md font-bold text-on-surface">{doc.rating}</span>
                            <span className="font-caption text-caption text-on-surface-variant">({doc.reviewsCount} reviews)</span>
                          </div>
                        </div>

                        {/* Bio & Details */}
                        <div className="flex-1 space-y-space-xs">
                          <div className="flex flex-wrap items-center justify-between gap-space-xs">
                            <div>
                              <h2 className="font-headline-md text-headline-md text-primary font-bold">
                                {doc.name}
                              </h2>
                              <p className="font-label-md text-label-md text-secondary font-semibold">
                                {doc.title}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-headline-sm text-headline-sm text-primary font-bold">{doc.fee}</p>
                              <p className="font-caption text-caption text-on-surface-variant">{doc.duration}</p>
                            </div>
                          </div>

                          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                            {doc.bio}
                          </p>

                          {/* Specialties and languages tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {doc.specialties.map((spec, i) => (
                              <span key={i} className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-medium">
                                {spec}
                              </span>
                            ))}
                            <span className="font-label-sm text-label-sm bg-surface-container-low text-on-surface-variant px-2.5 py-0.5 rounded-full">
                              {doc.languages.join(', ')}
                            </span>
                          </div>

                          {/* Footer Action & Availability */}
                          <div className="pt-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-t border-surface-container-high/40 mt-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                              <span className="font-caption text-caption text-secondary font-semibold">{doc.availability}</span>
                              <span className="font-caption text-caption text-on-surface-variant">• {doc.modeText}</span>
                            </div>
                            
                            <div className="flex items-center gap-space-xs">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectDoctor(doc);
                                }}
                                className={`font-label-md text-label-md px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-1.5 cursor-pointer font-bold ${
                                  isSelected
                                    ? 'bg-secondary text-on-secondary'
                                    : 'bg-primary-container text-on-primary hover:bg-primary'
                                }`}
                              >
                                <span>{isSelected ? 'Practitioner Selected' : 'Book Appointment'}</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* Right: Interactive Booking Panel / Sticky Console */}
            <aside className="xl:col-span-4 sticky top-24 space-y-space-md" id="booking-panel">
              <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-md space-y-space-md border border-surface-container-high/60">
                {/* Active Specialist Card Header */}
                <div className="flex items-start justify-between gap-space-xs pb-space-xs border-b border-surface-container-high/40">
                  <div>
                    <span className="font-caption text-caption uppercase tracking-wider text-secondary font-semibold">
                      Selected Practitioner
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                      {selectedDoctor.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {selectedDoctor.shortTitle}
                    </p>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold bg-surface-container-low px-3 py-1 rounded-lg">
                    {selectedDoctor.fee}
                  </span>
                </div>

                {/* 1. Consultation Mode Selector */}
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-2">
                    1. Consultation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBookingMode('video')}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg font-label-md text-label-md transition-all text-center cursor-pointer ${
                        bookingMode === 'video'
                          ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                          : 'bg-surface-container-low text-on-surface hover:bg-secondary-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl mb-1">videocam</span>
                      <span>Video Consult</span>
                      <span className="font-caption text-caption opacity-80">Google Meet / Zoom</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingMode('clinic')}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg font-label-md text-label-md transition-all text-center cursor-pointer ${
                        bookingMode === 'clinic'
                          ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                          : 'bg-surface-container-low text-on-surface hover:bg-secondary-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl mb-1">location_on</span>
                      <span>Clinic Visit</span>
                      <span className="font-caption text-caption text-on-surface-variant">Mumbai / Delhi / BLR</span>
                    </button>
                  </div>
                </div>

                {/* 2. Interactive Date Picker */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                      2. Select Consultation Date
                    </label>
                    <span className="font-caption text-caption text-secondary font-medium">October 2025</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {dates.map((d) => {
                      const dateKey = `${d.day} ${d.date}`;
                      const isSelected = selectedDate === dateKey;
                      return (
                        <button
                          key={dateKey}
                          type="button"
                          onClick={() => setSelectedDate(dateKey)}
                          className={`shrink-0 w-14 py-2.5 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-on-primary shadow-sm font-bold'
                              : 'bg-surface-container-low text-on-surface hover:bg-secondary-container'
                          }`}
                        >
                          <span className="font-caption text-caption uppercase">{d.day}</span>
                          <span className="font-headline-sm text-headline-sm font-bold">{d.date}</span>
                          <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-secondary-container' : 'bg-secondary'}`}></span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Time Slots */}
                <div className="space-y-space-xs">
                  <label className="block font-label-sm text-label-sm text-on-surface font-semibold">
                    3. Select Time Window
                  </label>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="font-caption text-caption text-on-surface-variant mb-1 font-semibold">Morning</p>
                      <div className="grid grid-cols-2 gap-2">
                        {['10:00 AM', '11:30 AM'].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-3 rounded-md font-label-sm text-label-sm transition-all cursor-pointer ${
                              selectedTimeSlot === slot
                                ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                                : 'bg-surface-container-low text-on-surface hover:bg-secondary-container'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-caption text-caption text-on-surface-variant mb-1 font-semibold">Afternoon</p>
                      <div className="grid grid-cols-2 gap-2">
                        {['02:00 PM', '03:30 PM'].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-3 rounded-md font-label-sm text-label-sm transition-all cursor-pointer ${
                              selectedTimeSlot === slot
                                ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                                : 'bg-surface-container-low text-on-surface hover:bg-secondary-container'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-caption text-caption text-on-surface-variant mb-1 font-semibold">Evening</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['04:00 PM', '05:30 PM', '07:00 PM'].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-2 text-center rounded-md font-label-sm text-label-sm transition-all cursor-pointer ${
                              selectedTimeSlot === slot
                                ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                                : 'bg-surface-container-low text-on-surface hover:bg-secondary-container'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Patient Details Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-space-xs pt-space-xs">
                  <label className="block font-label-sm text-label-sm text-on-surface font-semibold">
                    4. Patient Clinical Details
                  </label>

                  <div>
                    <input 
                      className="w-full px-3 py-2.5 rounded-md bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary" 
                      placeholder="Full Name" 
                      required 
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>

                  <div>
                    <input 
                      className="w-full px-3 py-2.5 rounded-md bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary" 
                      placeholder="WhatsApp Number (+91...)" 
                      required 
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <select 
                      className="w-full px-3 py-2.5 rounded-md bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none"
                      value={healthGoal}
                      onChange={(e) => setHealthGoal(e.target.value)}
                    >
                      <option value="pcos">Primary Goal: PCOS &amp; Hormonal Balance</option>
                      <option value="diabetes">Primary Goal: HbA1c Reduction / Diabetes</option>
                      <option value="fatloss">Primary Goal: Medical Fat Loss / Visceral Fat</option>
                      <option value="gut">Primary Goal: Gut Motility &amp; IBS Management</option>
                      <option value="sports">Primary Goal: Athletic Conditioning &amp; Hypertrophy</option>
                    </select>
                  </div>

                  {/* Lab File Upload dropzone */}
                  <div className="relative p-3 rounded-lg bg-surface-container-low text-center cursor-pointer hover:bg-secondary-container/30 transition-colors">
                    <input 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      type="file"
                      onChange={(e) => setUploadedFile(e.target.files[0]?.name || null)}
                    />
                    <div className="flex items-center justify-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-base">upload_file</span>
                      <span className="font-caption text-caption font-semibold">
                        {uploadedFile ? `Attached: ${uploadedFile}` : 'Upload Recent Blood Reports (PDF/JPG)'}
                      </span>
                    </div>
                    <p className="font-caption text-caption text-outline mt-0.5">
                      CBC, Fasting Insulin, Lipid profile, Thyroid (Optional)
                    </p>
                  </div>

                  {/* Order Summary & Confirm */}
                  <div className="pt-space-xs space-y-2 border-t border-surface-container-high/40 mt-3">
                    <div className="flex items-center justify-between text-on-surface-variant font-caption text-caption px-1">
                      <span>Consultation Fee:</span>
                      <span className="font-semibold text-on-surface">{selectedDoctor.fee}</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-caption text-caption px-1">
                      <span>Clinical Assessment Guide:</span>
                      <span className="text-secondary font-semibold">Included Free</span>
                    </div>
                    <div className="flex items-center justify-between font-label-md text-label-md text-primary font-bold px-1 pt-1">
                      <span>Total Payable:</span>
                      <span className="text-headline-sm text-headline-sm">{selectedDoctor.fee}</span>
                    </div>
                    
                    <button 
                      className="w-full py-3 px-4 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2" 
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-base">lock</span>
                      <span>Confirm &amp; Proceed to Pay</span>
                    </button>
                  </div>

                  {/* Guarantee chips */}
                  <div className="flex items-center justify-center gap-3 pt-2 text-on-surface-variant">
                    <span className="flex items-center gap-1 font-caption text-caption">
                      <span className="material-symbols-outlined text-secondary text-sm">bolt</span>
                      Instant Confirmation
                    </span>
                    <span className="flex items-center gap-1 font-caption text-caption">
                      <span className="material-symbols-outlined text-secondary text-sm">chat</span>
                      WhatsApp Reminders
                    </span>
                    <span className="flex items-center gap-1 font-caption text-caption">
                      <span className="material-symbols-outlined text-secondary text-sm">security</span>
                      100% Encrypted
                    </span>
                  </div>
                </form>
              </div>
            </aside>
          </div>

          {/* Section: Patient Clinical Journey / What to Expect */}
          <section className="mt-space-xl bg-surface-container-low rounded-xl p-space-lg lg:p-space-xl space-y-space-lg border border-surface-container-high/40">
            <div className="max-w-3xl space-y-space-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-sm">clinical_notes</span>
                <span>Clinical Transparency Protocol</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                What to Expect in Your 45-Minute Consultation
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Our consultations are structured around evidence-based medical nutrition therapy. We avoid generic template diets; every protocol is calibrated to your individual metabolic profile.
              </p>
            </div>

            {/* 4 Step Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-space-xs shadow-sm border border-surface-container-high/40">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                  01
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                  Metabolic &amp; Recall Assessment
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Comprehensive 48-hour dietary recall analysis, assessment of digestive transit time, sleep architecture, and stress biomarkers.
                </p>
                <div className="pt-2">
                  <span className="font-caption text-caption text-secondary font-semibold">Minutes 00 - 12</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-space-xs shadow-sm border border-surface-container-high/40">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                  02
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                  Blood Lab Pathology Review
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  In-depth interpretation of fasting glucose, HbA1c, lipid sub-fractions, vitamin D3, B12, and thyroid antibodies with clinical correlation.
                </p>
                <div className="pt-2">
                  <span className="font-caption text-caption text-secondary font-semibold">Minutes 12 - 24</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-space-xs shadow-sm border border-surface-container-high/40">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                  03
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                  Body Composition Analysis
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Evaluation of skeletal muscle mass, visceral adipose score, and metabolic rate to establish precise caloric-glycemic targets.
                </p>
                <div className="pt-2">
                  <span className="font-caption text-caption text-secondary font-semibold">Minutes 24 - 34</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-space-xs shadow-sm border border-surface-container-high/40">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm text-headline-sm font-bold">
                  04
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                  Custom 7-Day Action Protocol
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Co-creating an actionable meal blueprint tailored to your family kitchen, work schedule, regional preferences, and supplement timing.
                </p>
                <div className="pt-2">
                  <span className="font-caption text-caption text-secondary font-semibold">Minutes 34 - 45</span>
                </div>
              </div>
            </div>

            {/* Clinical Assurance Banner */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm border border-surface-container-high/40">
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl font-fill">verified_user</span>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-primary font-bold">Post-Consultation Support Included</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Receive your digitized Medical Diet Chart within 2 hours on WhatsApp with direct 7-day query follow-up.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-xs shrink-0">
                <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-semibold">
                  PDF Prescription
                </span>
                <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-semibold">
                  Pantry Guide
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AppointmentConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        details={modalDetails}
      />
    </div>
  );
}

