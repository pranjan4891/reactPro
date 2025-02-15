// src/App.tsx
import React, { lazy, Suspense, useState, startTransition } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import MainTemplate from './layouts/MainLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ChooseTemplate from './pages/Voucher/ChooseTemplate';

const Login = lazy(() => import('./pages/Login/Login'));
const queryClient = new QueryClient();

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigation = (path: string) => {
    startTransition(() => {
      setCurrentPath(path);
    });
  };

  console.warn(`Base URL API ==> `, import.meta.env.VITE_API_URL);
  console.warn(`Environment ==> `, import.meta.env.MODE);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <div className='flex flex-1 min-w-full max-w-full h-screen bg-slate-50'>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route
                  path='/login'
                  element={<Login />}
                />
                <Route
                  path='/Voucher/temp/:voucherId'
                  element={<ChooseTemplate />}
                />
                <Route
                  path='/*'
                  element={<MainTemplate onNavigate={handleNavigation} />}
                />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
