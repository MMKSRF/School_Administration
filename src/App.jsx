// src/App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


import Login from './Components/Pages/Login';
import CreateSchool from './Components/Pages/CreateSchool';
import Layout from './Pages/LayOut';
import JoinSchool from './Components/Ui/JoinSchool';
import RequestSchool from './Components/Pages/RequestSchool ';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
        <Routes>
          <Route path="/" element={
           <Layout/>
          } />
          
          <Route path="/login" element={<Login />} />
          <Route path="/create-school" element={<CreateSchool />} />
          <Route path="/join-school" element={<JoinSchool />} />
          <Route path="/request-school" element={<RequestSchool />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;