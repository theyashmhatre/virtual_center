import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { navigationData } from "../../constants";
import { AuthContext } from "../contexts";

const Navbar = () => {
  const context = useContext(AuthContext);
  const location = useLocation();

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
        <li className="relative group cursor-pointer">
          <div
            className="rounded-full bg-white px-3 p-1"
          >
            <FontAwesomeIcon icon={faUser} size="sm" className="mr-4" />
            Shubham
            <FontAwesomeIcon icon={faAngleDown} size="sm" className="ml-4" />
          </div>
          <div className="hidden group-hover:flex absolute right-0 top-0 pt-10 w-40">
            <div
              className="flex flex-col items-start bg-white rounded-xl py-4 w-full"
            >
              <button
                className="hover:bg-gray-200 w-full py-2 px-4 flex justify-start"
                onClick={() => context.removeAuth()}
              >
                Logout
              </button>
              <Link
                to="/profile"
                className="hover:bg-gray-200 w-full py-2 px-4"
              >
                Profile
              </Link>
            </div>
          </div>
        </li>
      </ul>

      <div className="flex  gap-16 decoration-from-font font-medium bg-gray-rgb p-4 ">
        {navigationData[location.pathname.split("/")[1]].map(
          ({ title, link }) => (
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgb(190 24 93)" : "",
                fontWeight: isActive ? "bold" : "",
              })}
              to={link}
              exact
            >
              {title}
            </NavLink>
          )
        )}
      </div>
    </main>
  );
};

export default Navbar;
