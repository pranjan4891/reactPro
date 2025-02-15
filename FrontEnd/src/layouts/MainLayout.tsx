// src/layouts/MainTemplate.tsx
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { RootState } from '../store';
import { roleBasedRoutes } from '../utils/roles';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import AddPlan from '../pages/Plans/addPlan';
import PlansList from '../pages/Plans/plansList';
import ChooseTemplate from '../pages/Voucher/ChooseTemplate';

const DashboardComponent = lazy(() => import('../pages/Dashboard/Dashboard'));
const Location = lazy(() => import('../pages/Location/Location'));
const Vouchers = lazy(() => import('../pages/Voucher/Vouchers'));
const AddGreeting = lazy(() => import('../pages/Greetings/AddGreeting'));
const Venue = lazy(() => import('../pages/Venue/Venue'));
const Employees = lazy(() => import('../pages/Employees/Employees'));
const AfForm = lazy(() => import('../pages/AF_Form/AfForm'));
const AfformList = lazy(() => import('../pages/AF_Form/AfFormList'));
const AfFormDetails = lazy(() => import('../pages/AF_Form/AfFormDetails'));
const GuestTemplate = lazy(() => import('../pages/Guest/GuestTemplate'));
const EditGuest = lazy(() => import('../pages/Guest/EditGuest'));

interface MainTemplateProps {
  onNavigate: (path: string) => void;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ onNavigate }) => {
  const location = useLocation();
  const shouldShowSidebar = location.pathname !== '/login';
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );

  const allowedRoutes = [
    ...(roleBasedRoutes[role] || []),
    ...roleBasedRoutes.accessibleToAll,
  ];

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  console.log(`allowedRoutes ==> `, allowedRoutes);
  return (
    <>
      {shouldShowSidebar && <Sidebar onNavigate={onNavigate} />}
      <main className='flex flex-col w-full h-screen px-2 bg-slate-100 overflow-y-auto'>
        <Header />
        <div className='flex bg-white rounded-xl mb-1 border-t-2 border-b-4 border-t-gray-200 flex-1 flex-co pt-0 shadow-xl overflow-x-hidden overflow-y-auto'>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {allowedRoutes.includes('/') && (
                <Route
                  path='/'
                  element={<DashboardComponent />}
                />
              )}
              {allowedRoutes.includes('/dashboard') && (
                <Route
                  path='/dashboard'
                  element={<DashboardComponent />}
                />
              )}
              {/* AF Form Template Route */}
              {allowedRoutes.includes('/guest') && (
                <Route
                  path='/guest/*'
                  element={<GuestTemplate />}
                />
              )}
              {allowedRoutes.includes('/vouchers') && (
                <Route
                  path='/vouchers'
                  element={<Vouchers />}
                />
              )}
              // greeting
              {allowedRoutes.includes('/greetings/add') && (
                <Route
                  path='/greetings/add'
                  element={<AddGreeting />}
                />
              )}
              {allowedRoutes.includes('/edit-guest/:guestId') && (
                <Route
                  path='/edit-guest/:guestId'
                  element={<EditGuest />}
                />
              )}
              {allowedRoutes.includes('/location') && (
                <Route
                  path='/location'
                  element={<Location />}
                />
              )}
              {allowedRoutes.includes('/venue') && (
                <Route
                  path='/venue'
                  element={<Venue />}
                />
              )}
              {allowedRoutes.includes('/employees') && (
                <Route
                  path='/employees'
                  element={<Employees />}
                />
              )}
              {/* {allowedRoutes.includes('/af-form') && (
                <Routes
                  path='/af-form'
                  element={<AfForm />}
                />
              )} */}
              {allowedRoutes.includes('/af-form-list') && (
                <Route
                  path='/af-form-list'
                  element={<AfformList />}
                />
              )}
              {allowedRoutes.includes('/af-form/:id') && (
                <Route
                  path='/af-form/:id'
                  element={<AfFormDetails />}
                />
              )}
              {allowedRoutes.includes('/add-plan') && (
                <Route
                  path='/add-plan'
                  element={<AddPlan />}
                />
              )}
              {allowedRoutes.includes('/plans') && (
                <Route
                  path='/plans'
                  element={<PlansList />}
                />
              )}
              {allowedRoutes.includes('/location') && (
                <Route
                  path='/location'
                  element={<Location />}
                />
              )}
              {allowedRoutes.includes('/venue') && (
                <Route
                  path='/venue'
                  element={<Venue />}
                />
              )}
              {allowedRoutes.includes('/employees') && (
                <Route
                  path='/employees'
                  element={<Employees />}
                />
              )}
              {allowedRoutes.includes('/af-form') && (
                <Route
                  path='/af-form'
                  element={<AfForm />}
                />
              )}
              {allowedRoutes.includes('/af-form-list') && (
                <Route
                  path='/af-form-list'
                  element={<AfformList />}
                />
              )}
              {allowedRoutes.includes('/af-form/:id') && (
                <Route
                  path='/af-form/:id'
                  element={<AfFormDetails />}
                />
              )}
              {allowedRoutes.includes('/Voucher/temp/:voucherId') && (
                <Route
                  path='/Voucher/temp/:voucherId'
                  element={<ChooseTemplate />}
                />
              )}
              {/* Default route */}
              <Route
                index
                element={<DashboardComponent />}
              />
              <Route
                path='*'
                element={<PageNotFound />}
              />
            </Routes>
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default MainTemplate;
