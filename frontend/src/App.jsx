import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudentManagement from "./pages/StudentManagement/StudentManagement";
import StaffManagement from "./pages/StaffManagement/StaffManagement";
import CourseScheduling from "./pages/CourseScheduling/CourseScheduling";
import AttendanceTracking from "./pages/AttendanceTracking/AttendanceTracking";
// import GradeManagement from "./pages/GradeManagement";
import ParentPortal from "./pages/ParentPortal/ParentPortal";
import ResourceManagement from "./pages/ResourceManagement/ResourceManagement";
import Reports from "./pages/Reports/Reports";
import NotFound from "./pages/NotFound/NotFound";

function App() {
     const API_URL = "http://localhost:3000/api/v1/";

     return (
          <>
               <NavBar />
               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<StudentManagement />} />
                    <Route path="/staff" element={<StaffManagement />} />
                    <Route path="/scheduling" element={<CourseScheduling />} />
                    <Route
                         path="/attendance"
                         element={<AttendanceTracking />}
                    />
                    {/* <Route path="/grades" element={<GradeManagement />} /> */}
                    <Route path="/parents" element={<ParentPortal />} />
                    <Route path="/resources" element={<ResourceManagement />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="*" element={<NotFound />} />
               </Routes>
          </>
     );
}

export default App;
