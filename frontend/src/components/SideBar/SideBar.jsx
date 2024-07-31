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
          <p>
            <IoIosPersonAdd />
            Find Student
          </p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <p>
            <BiSolidFileFind />
            Find Student
          </p>
        </NavLink>
        <NavLink to="/delete" className="sidebar-option">
          <p>
            <TiUserDelete />
            Delete Student
          </p>
        </NavLink>
        <NavLink to="/update" className="sidebar-option">
          <p>
            <MdOutlineUpdate />
            Update Student
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
