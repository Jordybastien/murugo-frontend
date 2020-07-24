import React from 'react';
import { Route } from 'react-router-dom';
import DashboardRoute from '../components/ProtectedRoute/DashboardRoute';
import MainBoard from '../components/dashboard/mainBoard';
import Mortgages from '../components/dashboard/mortgages';
import { AllRoles } from '../utils/constants';

const DashboardRouting = () => {
  return (
    <>
      <Route path="/dashboard" exact component={MainBoard} />
      {/* Admin Routes */}
      <DashboardRoute
        path="/dashboard/mortgages"
        component={Mortgages}
        allowedRole={AllRoles.admin}
      />
    </>
  );
};

export default DashboardRouting;
