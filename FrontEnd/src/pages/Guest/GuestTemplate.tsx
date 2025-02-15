// src/pages/Order/Order.tsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Adjust the path based on your project

// Lazy load the related components

const GuestRegisteration = lazy(() => import('./GuestRegisteration'));
const GuestList = lazy(() => import('./GuestList'));


const GuestTemplate: React.FC = () => {

  return (
    <Suspense fallback={<h6>Loading...</h6>}>
      <Routes>
        <Route path='/list' element={<GuestList />} />
        <Route path='/register' element={<GuestRegisteration />} />
        <Route path='*' element={<Navigate to='/guest/list' replace />} />
      </Routes>
    </Suspense>
  );
};

export default GuestTemplate;
