import { Link } from "react-router-dom";

const Register = () => {
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
            Register
          </h2>
          <div className="text-center mb-5 pr-22 ">
            <input
              type="text"
              id="text"
              name="fname"
              placeholder="First name"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-zinc-400 outline-none w-96 "
            />
          </div>
          <div className="text-center mb-5  ">
            <input
              type="text"
              id="text"
              name="lname"
              placeholder="Last name"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-zinc-400 outline-none w-96 "
            />
          </div>
          <div className="text-center mb-5  ">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-zinc-400 outline-none w-96 "
            />
          </div>
          <div className="text-center mb-10">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              minLength="8"
              required
              className=" py-2 border-b-2 border-gray-400  focus:border-green-400 
                            text-gray-600
                            placeholder-zinc-400 outline-none w-96"
            />
          </div>
          <div className="text-center mb-10">
            <input
              type="cpassword"
              id="cpassword"
              name="password"
              placeholder="Confirm password"
              minLength="8"
              required
              className=" py-2 border-b-2 border-gray-400  focus:border-green-400 
                            text-gray-600
                            placeholder-zinc-400 outline-none w-96"
            />
          </div>
          <div className="text-center">
            <Link
              to="/home"
              className="py-3 px-14 rounded-full bg-black-btn text-white font-bold"
            >
              Register
            </Link>
          </div>
        </div>

        <div className=" pl-60 pt-10 ">
          <label
            htmlFor="account"
            className="inline-block w-25 mr-6 text-center font-medium text-gray-600 "
          >
            Already have an account?
          </label>
          <a href="#" className="self-end mr-6 text-pink-600 font-bold">
            Login
          </a>
        </div>

        {/* grid child_2 end*/}
      </div>
    </div>
  );
};

export default Register;
