import { AiOutlineHome } from 'react-icons/ai';
import {IoIosCalendar} from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min-h-screen fixed w-24 shadow-md bg-neutral-800 pt-4 px-0">
      {/* sidebar */}
      <ul className="flex flex-col gap-9 pr-2">
        <li className="left">
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(190 24 93)" : "",
            })}
            to="/main"
            className="flex items-center justify-center py-4 px-6 h-20 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out rounded-r-lg"
          >
            <AiOutlineHome size={40}/>
          </NavLink>
        </li>
        <li className="left">
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(190 24 93)" : "",
            })}
            to="/challenge"
            className="flex items-center justify-center py-4 px-6 h-20 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out rounded-r-lg"
          >
            <IoIosCalendar size={40} />
          </NavLink>
        </li>
        <li className="left">
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(190 24 93)" : "",
            })}
            to="/support"
            className="flex items-center justify-center py-4 px-6 h-20 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out rounded-r-lg"
          >
            <BsTelephone size={30}/>
          </NavLink>
        </li>
        <li className="left">
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(190 24 93)" : "",
            })}
            to="/help"
            className="flex items-center justify-center py-4 px-6 h-20 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out rounded-r-lg"
          >
            <FaRegCommentAlt size={30}/>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;