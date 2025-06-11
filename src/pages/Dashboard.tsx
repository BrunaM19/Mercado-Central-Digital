
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import BuyerDashboard from '@/components/dashboards/BuyerDashboard';
import SellerDashboard from '@/components/dashboards/SellerDashboard';
import TransporterDashboard from '@/components/dashboards/TransporterDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.userType) {
    case 'buyer':
      return <BuyerDashboard />;
    case 'seller':
      return <SellerDashboard />;
    case 'transporter':
      return <TransporterDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default Dashboard;
