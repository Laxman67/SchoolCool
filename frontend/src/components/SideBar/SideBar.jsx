import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { IoIosPersonAdd } from 'react-icons/io';
import { TiUserDelete } from 'react-icons/ti';
import { BiSolidFileFind } from 'react-icons/bi';
import { MdOutlineUpdate } from 'react-icons/md';

function SideBar() {
  return (
    <div>
      <div className="sidebar">
        <NavLink to="/find" className="sidebar-option">
          <IoIosPersonAdd />
          <p>Find </p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <BiSolidFileFind />
          <p>Find Student</p>
        </NavLink>
        <NavLink to="/delete" className="sidebar-option">
          <TiUserDelete />
          <p className="text">Delete Student</p>
        </NavLink>
        <NavLink to="/update" className="sidebar-option">
          <div className="icon">
            <MdOutlineUpdate />
          </div>
          <p className="text">Update Student</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
