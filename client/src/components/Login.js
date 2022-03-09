import { Link } from "react-router-dom";

const Login = () => {
  return (
    /*grid start*/
    <div className="grid grid-cols-2 divide-x">
      {/* grid child_1 start*/}
      <div className="min-h-screen bg-blue-500 bg-opacity-100 bg-gradient-to-tr from-blue-grd to-green-grd ">
        <li className="text-center pl-4 pt-16">
          <h1 className="font-normal  text-slate-50 text-l">
            TATA CONSULTANCY SERVICES
          </h1>
        </li>
        <li className="text-center pl-4 pt-60">
          <h1 className="font-bold  text-slate-50 text-4xl">TCS Virtual</h1>
        </li>
        <li className="text-center pl-4 pt-1">
          <h1 className="font-bold  text-slate-50 text-4xl">
            Innovation Center
          </h1>
        </li>
      </div>

      {/* grid child_1 end*/}
      {/* grid child_2 start*/}
      {/* flex parent start*/}
      <div>
        <div className=" bg-white text-pink-800 antialiased px-2 py-4 flex flex-col  pt-16 ">
          <h2 className="my-8 font-display font-medium text-4xl text-pink-700 text-center  ">
            Login
          </h2>
          <div className="text-center mb-5  ">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email-id"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-zinc-400 outline-none w-96 "
            />
          </div>
          <div className="text-center mb-10">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              minLength="8"
              required
              className=" py-2 border-b-2 border-gray-400  focus:border-green-400 
                          text-gray-600
                          placeholder-zinc-400 outline-none w-96"
            />
          </div>

          <div className="text-center">
            <button className="py-3 px-14 rounded-full bg-black-btn text-white font-bold">
              Login
            </button>
          </div>
        </div>
        {/* <!--<div>
            <h2 className="my-40 font-display font-thin text-1xl text-pink-700 ">Don't have an account?</h2> <a href="#" className="self-end mt-4 text-gray-600 font-bold"
            >Register</a>
  
        </div>--> */}
        <div className=" pl-48 pt-20 ">
          <label
            htmlFor="account"
            className="inline-block w-25 mr-6 text-center font-medium text-gray-600 "
          >
            Don't have an account?
          </label>

          <Link
            to="/register"
            className="self-end mr-6 text-pink-600 font-bold"
          >
            Register
          </Link>
        </div>
        <div className="pl-48  pt-10 ">
          <a href="#" className="self-end mb-9 text-pink-600 font-semibold">
            Forgot Username?
          </a>
          <label
            htmlFor="account"
            className="inline-block pl-10 w-25 mr-6 text-center font-medium text-gray-600 "
          >
            |
          </label>
          <a href="#" class="pl-2 self-end mb-9 text-pink-600 font-semibold">
            Forgot Password?
          </a>
        </div>

        {/* grid child_2 end*/}
      </div>
    </div>
  );
};

export default Login;
