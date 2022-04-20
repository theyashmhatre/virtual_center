import { Link, NavLink } from "react-router-dom";
import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <main className="flex-2  flex flex-col p-3 grow pl-0 pt-0 pr-0  ">
      <ul className="flex justify-end gap-3 p-7 bg-gradient-to-r from-blue-grd to-green-grd">
        <li className="grow">
          <h1 className="font-bold  text-slate-50 text-xl">
            TCS Virtual Innovation Center
          </h1>
        </li>
        <li>
          <input
            className="rounded-full p-1"
            type="text"
            placeholder="Search.."
          />
        </li>
        <li>
          <div className="rounded-full bg-white px-3 p-1">
            <FontAwesomeIcon icon={faUser} size="sm" className="mr-4" />
            Shubham
            <FontAwesomeIcon icon={faAngleDown} size="sm" className="ml-4" />
          </div>
        </li>
      </ul>

      <ul className="flex  gap-16 decoration-from-font font-medium bg-gray-rgb p-4 ">
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "rgb(190 24 93)" : "",
              fontWeight: isActive ? "bold" : "",
            })}
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "rgb(190 24 93)" : "",
              fontWeight: isActive ? "bold" : "",
            })}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "rgb(190 24 93)" : "",
              fontWeight: isActive ? "bold" : "",
            })}
            to="/challenges"
          >
            Challenges
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "rgb(190 24 93)" : "",
              fontWeight: isActive ? "bold" : "",
            })}
            to="/solvers"
          >
            Our Solvers
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "rgb(190 24 93)" : "",
              fontWeight: isActive ? "bold" : "",
            })}
            to="/offerings"
          >
            Our Offerings
          </NavLink>
        </li>
        <li>Resources</li>
        <li>Help</li>
      </ul>
      {/* Home Start */}
    </main>
  );
};

export default Navbar;
