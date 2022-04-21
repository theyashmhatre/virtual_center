import { AiOutlineHome } from 'react-icons/ai';
import {IoIosCalendar} from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Side = () => {
  return (

    <div className="min-h-screen fixed w-24 shadow-md bg-neutral-800 pt-8 px-0 ">
      {/* sidebar */}
        <ul className="flex flex-col gap-9 pt-8">
          <li className="left">
          <Link to="/" class="flex items-center  py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out"  >
          <AiOutlineHome size={50}/>
          </Link>
          </li>

          
          <li className="left">
          <Link to="/Dashboard" class="flex items-center  py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out"  >
          <IoIosCalendar size={50} />
          </Link>
          </li>
          
          {/* <li className="left">
          <a class="flex items-center  py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap  hover:bg-pink-700 transition duration-300 ease-in-out" href="#!" >
          <svg aria-hidden="true" focusable="false" data-prefix="fas" class="" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
          </svg>
          <img
          src="https://img.icons8.com/emoji/48/000000/white-flag.png"  class="w-12 h-12 mr-12"
          />
          </a>
          </li> */}

          
          <li className="left">
          <Link to="/support" class="flex items-center  py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out"  >  
          <BsTelephone  size={40}/>
          </Link>
          </li>

          <li className="left">
          <a class="flex items-center  py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap hover:bg-pink-700 transition duration-300 ease-in-out" href="#!" >
          <FaRegCommentAlt size={40}/>
          </a>
          </li>

        </ul>
      </div>
 );
};

export default Side;