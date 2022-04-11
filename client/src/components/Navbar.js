import { Link } from "react-router-dom";

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
          <div className="rounded-full bg-white px-11 p-1">Shubham </div>
        </li>
      </ul>

      <ul className="flex  gap-16 decoration-from-font font-medium bg-gray-rgb p-4 ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/challenges">Challenges</Link>
        </li>
        <li>
          <Link to="/solvers">Our Solvers</Link>
        </li>
        <li>
          {" "}
          <Link to="/offerings">Our Offerings</Link>
        </li>
        <li>Resources</li>
        <li>Help</li>
      </ul>
      {/* Home Start */}
    </main>
  );
};

export default Navbar;
