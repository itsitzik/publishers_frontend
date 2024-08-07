import { Routes, Route, Navigate } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import Boarding from '@/pages/Boarding';
import Logout from '@/pages/Logout';

import { useDispatch } from 'react-redux';

export default function AuthRouter() {
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route path="/boarding" element={<Boarding />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/boarding" replace />} />
    </Routes>
  );
}
