// src/App.js
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);




import SchoolSpinner from './Components/Ui/SchoolSpinner';

// Lazy load all pages
const Login = lazy(() => import('./Components/Pages/Login/Login.jsx'));
const CreateSchool = lazy(() => import('./Components/Pages/CreateSchool/CreateSchool.jsx'));
const Layout = lazy(() => import('./Pages/Layout'));
const JoinSchool = lazy(() => import('./Components/Pages/JoinSchool/JoinSchool.jsx'));
const RequestSchool = lazy(() => import('./Components/Pages/RequestSchool/RequestSchool.jsx'));
const ForgotPassword = lazy(() => import('./Components/Pages/ForgotPassword/ForgotPassword.jsx'));
const PasswordResetSuccess = lazy(() => import('./Components/Pages/PasswordResetSuccess'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
        <Suspense fallback={<SchoolSpinner/>}>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-school" element={<CreateSchool />} />
            <Route path="/join-school" element={<JoinSchool />} />
            <Route path="/request-school" element={<RequestSchool />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;