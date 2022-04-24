import { AiOutlineHome } from 'react-icons/ai';
import {IoIosCalendar} from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min-h-screen fixed w-24 shadow-md bg-neutral-800 pt-8 px-0">
      {/* sidebar */}
      <ul className="flex flex-col gap-9 pt-8">
        <li className="left">
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(190 24 93)" : "",
            })}
            to="/main"
            className="flex items-center py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out"
          >
            <AiOutlineHome size={50}/>
          </NavLink>
        </li>
        <li className="left">
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(190 24 93)" : "",
            })}
            to="/challenge"
            className="flex items-center py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out"
          >
            <IoIosCalendar size={50} />
          </NavLink>
        </li>
        <li className="left">
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(190 24 93)" : "",
            })}
            to="/support"
            className="flex items-center py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out"
          >
            <BsTelephone size={40}/>
          </NavLink>
        </li>
        <li className="left">
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(190 24 93)" : "",
            })}
            to="/help"
            className="flex items-center py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out"
          >
            <FaRegCommentAlt size={40}/>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;