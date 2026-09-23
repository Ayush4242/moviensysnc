import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import VisitorsPage from './pages/visitors/VisitorsPage';
import VendorsPage from './pages/vendors/VendorsPage';
import DriversPage from './pages/vendors/DriversPage';
import VehiclesPage from './pages/vendors/VehiclesPage';
import RoutesPage from './pages/shuttle/RoutesPage';
import BookingsPage from './pages/shuttle/BookingsPage';
import DriverSchedulePage from './pages/shuttle/DriverSchedulePage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-medium">
        Loading DriveHub...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="visitors" element={<VisitorsPage />} />
        <Route path="vendors" element={<VendorsPage />} />
        <Route path="drivers" element={<DriversPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="routes" element={<RoutesPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="schedules" element={<DriverSchedulePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
