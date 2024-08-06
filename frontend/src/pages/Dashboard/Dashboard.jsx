import './Dashboard.css';
import { IoIosPersonAdd } from 'react-icons/io';
import { TiUserDelete } from 'react-icons/ti';
import { BiSolidFileFind } from 'react-icons/bi';
import { MdOutlineUpdate } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from '../../components/Add/Add';
import Delete from '../../components/Delete/Delete';
import Update from '../../components/Update/Update';
import Find from '../../components/Find/Find';
import AllStudent from '../../components/AllStudent/AllStudent';

const componentMap = {
  'Find Student': Find,
  'All Student': AllStudent,
  'Add Student': Add,
  'Delete Student': Delete,
  'Update Student': Update,
};

function Dashboard() {
  const [view, setView] = useState('Find Student');
  const [active, setActive] = useState('Find Student');

  const renderComponent = () => {
    const Component = componentMap[view]; // Extracting value from componentMap
    // If Component is true ? then return <Component/>
    return Component ? <Component /> : null;
  };

  const handleSidebarClick = (viewName) => {
    setView(viewName);
    setActive(viewName);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div
          onClick={() => handleSidebarClick('All Student')}
          className={`sidebar-option ${
            active === 'All Student' ? 'active' : ''
          }`}
        >
          <FaUserFriends className="icon" />
          <p>All Student </p>
        </div>
        <div
          onClick={() => handleSidebarClick('Find Student')}
          className={`sidebar-option ${
            active === 'Find Student' ? 'active' : ''
          }`}
        >
          <BiSolidFileFind className="icon" />
          <p>Find Student</p>
        </div>
        <div
          onClick={() => handleSidebarClick('Add Student')}
          className={`sidebar-option ${
            active === 'Add Student' ? 'active' : ''
          }`}
        >
          <IoIosPersonAdd className="icon" />
          <p>Add Student</p>
        </div>
        <div
          onClick={() => handleSidebarClick('Delete Student')}
          className={`sidebar-option ${
            active === 'Delete Student' ? 'active' : ''
          }`}
        >
          <TiUserDelete className="icon" />
          <p>Delete Student</p>
        </div>
        <div
          onClick={() => handleSidebarClick('Update Student')}
          className={`sidebar-option ${
            active === 'Update Student' ? 'active' : ''
          }`}
        >
          <MdOutlineUpdate className="icon" />
          <p>Update Student</p>
        </div>
      </div>
      {/* {toast.success("Welcome !")} */}
      <ToastContainer autoClose={900} />
      <div className="view-panel">{renderComponent()}</div>
    </div>
  );
}

export default Dashboard;
