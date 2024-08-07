import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';

import ForgetPassword from '@/pages/ForgetPassword';
import ResetPassword from '@/pages/ResetPassword';

import { useDispatch } from 'react-redux';

export default function AuthRouter() {
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Navigate to="/login" replace />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/resetpassword/:userId/:resetToken" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
