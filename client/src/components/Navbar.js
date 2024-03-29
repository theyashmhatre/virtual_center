import { faAngleDown, faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { navigationData, roleIds } from "../../constants";
import Log from "../../public/Log.png"
import { AuthContext } from "../contexts";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const context = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className="flex-2 flex flex-col grow">
      <ul className="flex justify-end items-center gap-3 p-7 md:p-5 sm:p-4 bg-gradient-to-r from-blue-grd to-green-grd">
        <li className="w-16">
          <img alt="background_image" src={Log} width={100} height={100} />
        </li>
        <li className="grow">
          <h1 className="font-bold text-slate-50 text-3xl md:text-2xl sm:text-2xl">
            TCS Virtual Innovation Center
          </h1>
        </li>
        <li className="flex justify-between items-center bg-white rounded-full px-1 sm:hidden">
          <input
            className="rounded-full p-2 lg:w-40 md:w-28"
            type="text"
            placeholder="Search.."
          />
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="ml-4 mr-2 cursor-pointer"
          />
        </li>
        <li className="relative group cursor-pointer xs:hidden">
          <div className="flex flex-nowrap items-center rounded-full bg-white px-3 py-2">
            <FontAwesomeIcon icon={faUser} size="lg" className="mr-4" />
            <p className="h-6 overflow-hidden">{context.auth.name}</p>
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
              <button
                className="hover:bg-gray-200 w-full py-2 px-4 flex justify-start"
                onClick={() => context.setShowMessages(!context.showMessages)}
              >
                <p className="relative">
                  Conversations
                  {!context.unReadConversations ? null : (
                    <span className="flex absolute -top-2 -right-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                      <span className="text-sky-500">{context.unReadConversations}</span>
                    </span>
                  )}
                </p>
              </button>
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
          {!context.unReadConversations ? null : (
            <span className="flex justify-end absolute h-5 w-5 top-0 right-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="bg-sky-500 rounded-full h-3 w-3" />
            </span>
          )}
        </li>
      </ul>

      {navigationData[location.pathname.split("/")[1]] && (
        <div>
          <div className="hidden sm:flex justify-between items-center font-medium bg-gray-rgb p-4">
            <p className="text-xl">TCS VIC</p>
            <button
              className="rounded-lg py-1 px-2 hover:bg-gray-300"
              onClick={() => setActive(!active)}
            >
              <FontAwesomeIcon icon={faBars} size="xl" />
            </button>
          </div>

          <div className={`${!active ? "sm:hidden" : "flex-col gap-4"} flex gap-16 decoration-from-font font-medium bg-gray-rgb p-4`}>
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
        </div>
      )}
    </main>
  );
};

export default Navbar;
