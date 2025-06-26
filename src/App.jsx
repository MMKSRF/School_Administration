// src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SchoolSpinner from './Components/Ui/SchoolSpinner';

gsap.registerPlugin(ScrollTrigger);

// ==== Lazy Loaded Pages ====
// Auth & School Creation
const Login = lazy(() => import('./Components/Pages/Login/Login.jsx'));
const CreateSchool = lazy(() => import('./Components/Pages/CreateSchool/CreateSchool.jsx'));
const JoinSchool = lazy(() => import('./Components/Pages/JoinSchool/JoinSchool.jsx'));
const RequestSchool = lazy(() => import('./Components/Pages/RequestSchool/RequestSchool.jsx'));
const ForgotPassword = lazy(() => import('./Components/Pages/ForgotPassword/ForgotPassword.jsx'));
const PasswordResetSuccess = lazy(() => import('./Components/Pages/PasswordResetSuccess.jsx'));

// Dashboard Layout
const AdminDashboard = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/AdminDashboard.jsx'));
const DashboardHome = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/DashboardHome.jsx'));
const ViewTeachers = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/ViewTeachers.jsx'));
const SetPeriods = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/SetPeriods.jsx'));
const CreateSchedule = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/CreateSchedule.jsx'));
const TimetableView = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/ViewSchedule.jsx'));
const ConflictDetector = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/ConflictDetector.jsx'));
const SchoolStats = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/SchoolStats.jsx'));
const TeacherRequests = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/TeacherRequests.jsx'));

// Layout
const Layout = lazy(() => import('./Pages/Layout.jsx'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
        <Suspense fallback={<SchoolSpinner />}>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-school" element={<CreateSchool />} />
            <Route path="/join-school" element={<JoinSchool />} />
            <Route path="/request-school" element={<RequestSchool />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset-success" element={<PasswordResetSuccess />} />

            {/* Admin Dashboard */}
            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="teachers" element={<ViewTeachers />} />
              <Route path="periods" element={<SetPeriods />} />
              <Route path="schedule/create" element={<CreateSchedule />} />
              <Route path="timetable" element={<TimetableView />} />
              <Route path="conflicts" element={<ConflictDetector />} />
              <Route path="stats" element={<SchoolStats />} />
              <Route path="teacher-requests" element={<TeacherRequests />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;










// // src/App.js
// import { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);




// import SchoolSpinner from './Components/Ui/SchoolSpinner';

// // Lazy load all pages
// const Login = lazy(() => import('./Components/Pages/Login/Login.jsx'));
// const CreateSchool = lazy(() => import('./Components/Pages/CreateSchool/CreateSchool.jsx'));
// const Layout = lazy(() => import('./Pages/Layout'));
// const JoinSchool = lazy(() => import('./Components/Pages/JoinSchool/JoinSchool.jsx'));
// const RequestSchool = lazy(() => import('./Components/Pages/RequestSchool/RequestSchool.jsx'));
// const ForgotPassword = lazy(() => import('./Components/Pages/ForgotPassword/ForgotPassword.jsx'));
// const PasswordResetSuccess = lazy(() => import('./Components/Pages/PasswordResetSuccess'));




// // Lazy load dashboard pages

//     // Admin Dashboard Components

// const AdminDashboard = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/AdminDashboard.jsx'));
// const DashboardHome = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/DashboardHome.jsx'));
// const ViewTeachers = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/ViewTeachers.jsx'));
// const SetPeriods = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManagePeriods/SetPeriods.jsx'));
// const CreateSchedule = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageSchedule/CreateSchedule.jsx'));
// const TimetableView = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageSchedule/ViewSchedule.jsx'));
// const ConflictDetector = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageSchedule/ConflictDetector.jsx'));
// const SchoolStats = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/SchoolStats.jsx'));

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
//         <Suspense fallback={<SchoolSpinner/>}>
//           <Routes>
//             <Route path="/" element={<Layout />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/create-school" element={<CreateSchool />} />
//             <Route path="/join-school" element={<JoinSchool />} />
//             <Route path="/request-school" element={<RequestSchool />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
            


//             <Route path="/admin-dashboard" element={<AdminDashboard />}>
//               <Route index element={<DashboardHome />} />
//               <Route path="teachers" element={<ViewTeachers />} />
//               <Route path="periods" element={<SetPeriods />} />
//               <Route path="schedule/create" element={<CreateSchedule />} />
//               <Route path="timetable" element={<TimetableView />} />
//               <Route path="conflicts" element={<ConflictDetector />} />
//               <Route path="stats" element={<SchoolStats />} />
//           </Route>
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </Suspense>
//       </div>
//     </Router>
//   );
// }

// export default App;