import { faAngleDown, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { navigationData, roleIds } from "../../constants";
import Log from "../../public/Log.png"
import { AuthContext } from "../contexts";

const Navbar = () => {
  const context = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className="flex-2 flex flex-col grow">
      <ul
        className="flex justify-end items-center gap-3 p-7 bg-gradient-to-r from-blue-grd to-green-grd"
      >
        <li>
          <img alt="background_image" src={Log} width={55} height={55} />
        </li>
        <li className="grow">
          <h1 className="font-bold text-slate-50 text-3xl">
            TCS Virtual Innovation Center
          </h1>
        </li>
        <li
          className="flex justify-between items-center bg-white rounded-full px-1"
        >
          <input
            className="rounded-full p-2"
            type="text"
            placeholder="Search.."
          />
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="ml-4 mr-2 cursor-pointer"
          />
        </li>
        <li className="relative group cursor-pointer">
          <div
            className="rounded-full bg-white px-3 py-2"
          >
            <FontAwesomeIcon icon={faUser} size="lg" className="mr-4" />
            {context.auth.name}
            <FontAwesomeIcon icon={faAngleDown} size="lg" className="ml-4" />
          </div>
          <div
            className="hidden group-hover:flex absolute right-0 top-0 pt-12 w-40"
          >
            <div
              className="flex flex-col items-start bg-white rounded-xl py-4 w-full"
            >
              <Link
                to="/account/profile"
                className="hover:bg-gray-200 w-full py-2 px-4"
              >
                Profile
              </Link>
              {context.auth.role == roleIds["super_admin"] && (
                <Link
                  to="/account/settings"
                  className="hover:bg-gray-200 w-full py-2 px-4"
                >
                  Settings
                </Link>
              )}
              <button
                className="hover:bg-gray-200 w-full py-2 px-4 flex justify-start"
                onClick={() => {
                  context.removeAuth();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div
        className="flex gap-16 decoration-from-font font-medium bg-gray-rgb p-4"
      >
        {navigationData[location.pathname.split("/")[1]].map(
          ({ title, link, roles }, index) => {
            for (i in roles) {
              if (context.auth.role == roles[i])
                return (
                  <NavLink
                    key={index}
                    style={({ isActive }) => ({
                      color: isActive ? "rgb(190 24 93)" : "",
                      fontWeight: isActive ? "bold" : "",
                    })}
                    to={link}
                    className="text-xl"
                    end
                  >
                    {title}
                  </NavLink>
                )
            }
            return null
          }
        )}
      </div>
    </main>
  );
};

export default Navbar;
