import './Dashboard.css';
import { IoIosPersonAdd } from 'react-icons/io';
import { TiUserDelete } from 'react-icons/ti';
import { BiSolidFileFind } from 'react-icons/bi';
import { MdOutlineUpdate } from 'react-icons/md';
import { useState } from 'react';
import Add from '../../components/Add/Add';
import Delete from '../../components/Delete/Delete';
import Update from '../../components/Update/Update';
import Find from '../../components/Find/Find';

const componentMap = {
  'Find Student': Find,
  'Add Student': Add,
  'Delete Student': Delete,
  'Update Student': Update,
};

function Dashboard() {
  const [view, setView] = useState('Find Student');

  const renderComponent = () => {
    const Component = componentMap[view]; //Extracting value form componentMap
    // If Component is true ? then return <component/>
    return Component ? <Component /> : null;
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div onClick={() => setView('Find Student')} className="sidebar-option">
          <p>
            <BiSolidFileFind />
            Find Student
          </p>
        </div>
        <div onClick={() => setView('Add Student')} className="sidebar-option">
          <p>
            <IoIosPersonAdd />
            Add Student
          </p>
        </div>
        <div
          onClick={() => setView('Delete Student')}
          className="sidebar-option"
        >
          <p>
            <TiUserDelete />
            Delete Student
          </p>
        </div>
        <div
          onClick={() => setView('Update Student')}
          className="sidebar-option"
        >
          <p>
            <MdOutlineUpdate />
            Update Student
          </p>
        </div>
      </div>
      <div className="view-panel">{renderComponent()}</div>
    </div>
  );
}

export default Dashboard;
