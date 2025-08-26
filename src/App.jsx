// src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WelcomeBanner from '../src/Components/Ui/Basics/WelcomeBanner.jsx'

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



// ADMIN DASHBOARD

// Admin Dashboard Components
const AdminDashboard = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/AdminDashboard.jsx'));
const DashboardHome = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/DashboardHome.jsx'));
        
         // Admin Requests
const ViewRequests = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/Requests/ViewRequests.jsx'));
const HandleRequest = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/Requests/HandleRequest.jsx'));
         // Admin Reports
const PerformanceSummary = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/Reports/PerformanceSummary.jsx'));
const AttendanceSummary = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/Reports/AttendanceSummary.jsx'));
const ExportReports = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/Reports/ExportReports.jsx'));
        // Admin Dashboard Widgets
const Announcements = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/Announcements.jsx'));
const RecentActivity = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/RecentActivity.jsx'));
const SchoolStats = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/SchoolStats.jsx'));
      // Manage Classes
const AssignTeachers = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageClasses/AssignTeachers.jsx'));
const ClassReports = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageClasses/ClassReports.jsx'));
const CreateClass = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageClasses/CreateClass.jsx'));
const ViewClasses = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageClasses/ViewClasses.jsx'));

      // Manage Students
const AssignClasses = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageStudents/AssignClasses.jsx'));
const  AttendanceReports = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageStudents/AttendanceReports.jsx'));
const  StudentRequests = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageStudents/StudentRequests.jsx'));
const EnrollStudent = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageStudents/EnrollStudent.jsx'));
const ViewStudents = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageStudents/ViewStudents.jsx'));


      // Manage Teachers
const ConflictDetector = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/ConflictDetector.jsx'));
const SetPeriods = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/SetPeriods.jsx'));
const TeacherRequests = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/TeacherRequests.jsx'));
const AddTeacher = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/AddTeacher.jsx'));
const CreateSchedule = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/CreateSchedule.jsx'));
const ViewTeachers = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/ViewTeachers.jsx'));
const TeacherSettings = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/ManageTeachers/TeacherSettings.jsx'));

       // Admin HomeRoom
const HomeRoomManagement = lazy(() => import('./Components/Pages/Dashboard/AdminDashboard/HomeRoomManagement/HomeRoomManagement.jsx'));





// Student Dashboard Components
const StudentDashboard = lazy(() => import('./Components/Pages/Dashboard/StudentDashboard/StudentDashboard.jsx'));
const StudentDashboardHome = lazy(() => import('./Components/Pages/Dashboard/StudentDashboard/DashboardHome.jsx'));
const ViewSchedule = lazy(() => import('./Components/Pages/Dashboard/StudentDashboard/MySchedule/ViewSchedule.jsx'));
const ViewGrades = lazy(() => import('./Components/Pages/Dashboard/StudentDashboard/Grades/ViewGrades.jsx'));
const StudentViewRequests = lazy(() => import('./Components/Pages/Dashboard/StudentDashboard/Requests/ViewRequests.jsx'));
const MyCourses = lazy(() => import('./Components/Pages/Dashboard/StudentDashboard/MyCourses/MyCourses.jsx'));
const Settings = lazy(() => import('./Components/Pages/Dashboard/StudentDashboard/Settings/Settings.jsx'));

// Teacher Dashboard Components
const TeacherDashboard = lazy(() => import('./Components/Pages/Dashboard/TeacherDashboard/TeacherDashboard.jsx'));
const DashboardInside = lazy(() => import('./Components/Pages/Dashboard/TeacherDashboard/DashboardInside.jsx'));
const HomeRoom = lazy(() => import('./Components/Pages/Dashboard/TeacherDashboard/HomeRoom/HomeRoom.jsx'));
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
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="dashboard" element={<DashboardHome />} />

            {/*HomeRoom*/}
                <Route path={'homeroom'} element={<HomeRoomManagement/>}/>
              
              {/* Teacher Management */}
              <Route path="teachers" element={<ViewTeachers />} />
              <Route path="teachers/add" element={<AddTeacher />} />
              <Route path="teachers/schedule" element={<CreateSchedule />} />
              
              {/* Student Management */}
              <Route path="students" element={<ViewStudents />} />
              <Route path="students/enroll" element={<EnrollStudent />} />
              
              {/* Class Management */}
              <Route path="classes" element={<ViewClasses />} />
              <Route path="classes/create" element={<CreateClass />} />
              <Route path="classes/assign-teachers" element={<AssignTeachers />} />
              
              {/* Requests */}
              <Route path="requests" element={<ViewRequests />} />
              <Route path="requests/:id" element={<HandleRequest />} />
              
              {/* Reports */}
              <Route path="reports" element={<PerformanceSummary />} />
            </Route>

            {/* Teacher Dashboard */}
            <Route path="/teacher" element={<TeacherDashboard />} >
              <Route index element={<DashboardInside/>}/>
              <Route path='home-room' element={<HomeRoom />} />
              {/* <Route path='*' element={<DashboardInside activeSection="dashboard" />} /> */}
            </Route>

            {/* Student Dashboard */}
            <Route path="/student" element={<StudentDashboard />}>
              <Route index element={<StudentDashboardHome />} />
              <Route path="dashboard" element={<StudentDashboardHome />} />
              <Route path="schedule" element={<ViewSchedule />} />
              <Route path="grades" element={<ViewGrades />} />
              <Route path="requests" element={<StudentViewRequests />} />
              <Route path="courses" element={<MyCourses />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch All */}
            {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
            <Route path="*" element={<Navigate to="/"  />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;