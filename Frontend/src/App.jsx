import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DietPlansCheckoutPage from './pages/DietPlansCheckoutPage';
import DietitianBookingPage from './pages/DietitianBookingPage';
import UserDashboardPage from './pages/UserDashboardPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedPlanId, setSelectedPlanId] = useState('pcos');
  const [selectedDoctorId, setSelectedDoctorId] = useState('anjali-sharma');

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
    setActivePage('diet-plans');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setActivePage('dietitian-booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the current active page
  const renderPage = () => {
    switch (activePage) {
      case 'diet-plans':
        return (
          <DietPlansCheckoutPage 
            setActivePage={setActivePage}
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
          />
        );
      case 'dietitian-booking':
        return (
          <DietitianBookingPage 
            setActivePage={setActivePage}
            selectedDoctorId={selectedDoctorId}
          />
        );
      case 'calorie-tracker-and-dashboard':
        return (
          <UserDashboardPage 
            setActivePage={setActivePage}
          />
        );
      case 'home':
      default:
        return (
          <HomePage 
            setActivePage={setActivePage}
            onSelectPlan={handleSelectPlan}
            onSelectDoctor={handleSelectDoctor}
          />
        );
    }
  };

  const isDashboard = activePage === 'calorie-tracker-and-dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Show Navbar on all pages except the dedicated Patient Portal which has its own sidebar & header */}
      {!isDashboard && (
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
        />
      )}

      {/* Main Page Content */}
      <main className={`flex-1 ${!isDashboard ? 'pt-20' : ''}`}>
        {renderPage()}
      </main>

      {/* Show Footer on public platform pages */}
      {!isDashboard && (
        <Footer 
          setActivePage={setActivePage} 
        />
      )}
    </div>
  );
}

