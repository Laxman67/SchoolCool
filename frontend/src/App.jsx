import './App.css';
import { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Gallery from './pages/Gallery/Gallery';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import StudentManagement from './pages/StudentManagement/StudentManagement';
import StaffManagement from './pages/StaffManagement/StaffManagement';
import CourseScheduling from './pages/CourseScheduling/CourseScheduling';
import AttendanceTracking from './pages/AttendanceTracking/AttendanceTracking';
// import GradeManagement from "./pages/GradeManagement";
import ParentPortal from './pages/ParentPortal/ParentPortal';
import ResourceManagement from './pages/ResourceManagement/ResourceManagement';
import Reports from './pages/Reports/Reports';
import NotFound from './pages/NotFound/NotFound';

function App() {
  //   eslint-disable-next-line no-unused-vars
  const API_URL = 'http://localhost:3000/api/v1/';

  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : ''}
      <div className="app">
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/login"
            element={<Login setShowLogin={setShowLogin} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/scheduling" element={<CourseScheduling />} />
          <Route path="/attendance" element={<AttendanceTracking />} />
          {/* <Route path="/grades" element={<GradeManagement />} /> */}
          <Route path="/parents" element={<ParentPortal />} />
          <Route path="/resources" element={<ResourceManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
