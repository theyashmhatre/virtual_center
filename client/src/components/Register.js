import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { apiURL, emailRegex, passwordRegex } from "../../constants";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [securityQuestionId, setSecurityQuestionId] = useState(0);
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState('');
  const [securityAnswerVisibility, setSecurityAnswerVisibility] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getSecurityQuestions = () => {
    const endpoint = new URL('/user/securityQuestions', apiURL).href;
    axios
      .get(endpoint)
      .then(({ data }) => {
        setSecurityQuestions(data);
      })
      .catch((e) => {
        if (error.response)
          if (error.response.data) setError(error.response.data.error);
          else setError('Some Error Occured, Try Again!');
        else setError('Some Error Occured, Try Again!');
      });
  };

  const signUp = () => {
    const endpoint = new URL('/user/register', apiURL).href;
    axios
      .post(endpoint, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        securityQuestionId: securityQuestionId,
        securityQuestionAnswer: securityQuestionAnswer,
        password: password,
        password2: confirmPassword
      })
      .then(() => {
        navigate('/home');
      })
      .catch((e) => {
        if (error.response)
          if (error.response.data) setError(error.response.data.error);
          else setError('Some Error Occured, Try Again!');
        else setError('Some Error Occured, Try Again!');
      });
  };

  useEffect(() => {
    getSecurityQuestions();
  }, []);

  const onSubmit = () => {
    setError('')
    if (firstName && lastName && email && securityQuestionId && securityQuestionAnswer && password && confirmPassword)
      if (emailRegex.test(email))
        if (passwordRegex.test(password))
          if (password == confirmPassword)
            // signup user using api
            signUp()
          else setError('Confirm Password should be same as Password');
        else setError('Follow privacy rule for password');
      else setError('Email is incorrect');
    else setError('All fields are required');
  };

  return (
    /*grid start*/
    <div className="grid grid-cols-2 divide-x">
      {/* grid child_1 start*/}
      <div className="min-h-screen bg-blue-500 bg-opacity-100 bg-gradient-to-tr from-blue-grd to-green-grd ">
      <li class="text-center pl-4 pt-16" ><h1 class="font-normal  text-slate-50 text-l" >TATA CONSULTANCY SERVICES</h1></li> 
      <li class="text-center pl-4 pt-60" ><h1 class="font-bold  text-slate-50 text-4xl" >TCS Virtual</h1></li> 
      <li class="text-center pl-4 pt-1" ><h1 class="font-bold  text-slate-50 text-4xl" >Innovation Center</h1></li> 
      </div>
     
      {/* grid child_1 end*/}

      {/* grid child_2 start*/}
      {/* flex parent start*/}
      <div>
        <div className="bg-white text-pink-800 antialiased px-2 py-4 flex flex-col pt-16">
          <h2 className="my-8 font-display font-medium text-4xl text-pink-700 text-center">
            Register
          </h2>
          <div className="text-center mb-5 pr-22">
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
            />
          </div>
          <div className="text-center mb-5">
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
            />
          </div>
          <div className="text-center mb-5">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-zinc-400 outline-none w-96 "/>
          </div>
          <div className="text-center mb-5  ">
            < select class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-zinc-400 outline-none w-96 ">
            <option>---Select Secret Question---</option>
            <option>What is your shoe size?</option>
            <option>What is your mother's maiden name? </option>
            <option>What was your childhood ambition?</option>
            </select>
          </div> 


          <div className="text-center mb-5 pr-22 ">
            <input
              type="text"
              id="text"
              name="fname"
              placeholder="Your answer for the secret question"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-zinc-400 outline-none w-96 "
            />
          </div>


          <div className="text-center mb-5">
            <input
              type={passwordVisibility ? 'text' : 'password'}
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
              type="password"
              id="cpassword"
              name="confirm password"
              placeholder="Confirm password"
              minLength="8"
              required
              className=" py-2 border-b-2 border-gray-400  focus:border-green-400 
                          text-gray-600
                          placeholder-zinc-400 outline-none w-96"
            />
          </div> 



          <div className="text-center">
            <button
              className="py-3 px-14 rounded-full bg-black-btn text-white font-bold"
              onClick={onSubmit}
            >
              Register
            </button>
          </div>
        </div>
       
        <div className=" pl-60 pt-2 ">
          <label
            htmlFor="account"
            className="inline-block w-25 mr-6 text-center font-medium text-gray-600"
          >
            Already have an account?
          </label>
          <Link to="/" className="self-end mr-6 text-pink-600 font-bold">
            Login
          </Link>
        </div>

          

  
        {/* grid child_2 end*/}
      </div>
    </div>
  );
};

export default Register;
