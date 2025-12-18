import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CustomerHome from './pages/CustomerHome';
import CustomerMenu from './pages/CustomerMenu';
import CustomerContact from './pages/CustomerContact';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminMenu from './pages/AdminMenu';
import AdminExtras from './pages/AdminExtras';
import AdminLogin from './pages/AdminLogin';
import { isAuthenticated } from './services/storageService';

// Higher Order Component for Protected Routes
// Updated to use React.FC and optional children to resolve strict TypeScript prop checking errors
const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerHome />} />
        <Route path="/menu" element={<CustomerMenu />} />
        <Route path="/contact" element={<CustomerContact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute><AdminOrders /></ProtectedRoute>
        } />
        <Route path="/admin/menu" element={
          <ProtectedRoute><AdminMenu /></ProtectedRoute>
        } />
        <Route path="/admin/extras" element={
          <ProtectedRoute><AdminExtras /></ProtectedRoute>
        } />
        <Route path="/admin/stats" element={
          <ProtectedRoute>
            <div className="p-20 text-center text-stone-400 italic">Page statistiques avancées en construction...</div>
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;