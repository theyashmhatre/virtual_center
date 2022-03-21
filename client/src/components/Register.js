import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getSecurityQuestions, register } from "../utilities/user";
import { isEmptyObject } from "../utilities/utils";
import { inputValidation } from "../utilities/validation/register";

const initialInputValues = {
  firstName: '',
  lastName: '',
  email: '',
  securityQuestionId: 0,
  securityQuestionAnswer: '',
  password: '',
  confirmPassword: ''
};

const initialVisibility = {
  password: false,
  securityAnswer: false
}

const Register = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [visibility, setVisibility] = useState(initialVisibility);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  }

  useEffect(() => {
    getSecurityQuestions()
      .then(({ data }) => {
        setSecurityQuestions(data);
      })
      .catch((error) => {
        if (error.response)
          if (error.response.data) setErrors(error.response.data);
          else setErrors({ main: 'Some Error Occured, Try Again!' });
        else setErrors({ main: 'Some Error Occured, Try Again!' });
      });
  }, []);

  const onSubmit = () => {
    setErrors({})
    const inputErrors = inputValidation(
      inputValues.firstName,
      inputValues.lastName,
      inputValues.email,
      Number(inputValues.securityQuestionId),
      inputValues.securityQuestionAnswer,
      inputValues.password,
      inputValues.confirmPassword
    )
    
    if (isEmptyObject(inputErrors))
      // register user using api
      register(
        inputValues.firstName,
        inputValues.lastName,
        inputValues.email,
        Number(inputValues.securityQuestionId),
        inputValues.securityQuestionAnswer,
        inputValues.password,
        inputValues.confirmPassword
      )
        .then(() => {
          navigate('/home');
        })
        .catch((error) => {
          if (error.response)
            if (error.response.data) setErrors(error.response.data);
            else setErrors({ main: 'Some Error Occured, Try Again!' });
          else setErrors({ main: 'Some Error Occured, Try Again!' });
        });
    else setErrors(inputErrors)
  };

  return (
    /*grid start*/
    <div className="grid grid-cols-2 divide-x">
      {/* grid child_1 start*/}
      <div className="min-h-screen bg-blue-500 bg-opacity-100 bg-gradient-to-tr from-blue-grd to-green-grd ">
        <li className="text-center pl-4 pt-16">
          <h1 className="font-normal text-slate-50 text-l">
            TATA CONSULTANCY SERVICES
          </h1>
        </li>
        <li className="text-center pl-4 pt-60">
          <h1 className="font-bold text-slate-50 text-4xl">TCS Virtual</h1>
        </li>
        <li className="text-center pl-4 pt-1">
          <h1 className="font-bold text-slate-50 text-4xl">
            Innovation Center
          </h1>
        </li>
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
              name="firstName"
              placeholder="First Name"
              value={inputValues.firstName}
              onChange={handleInputChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
            />
            {!errors.firstName ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.firstName}</p>
              </div>
            )}
          </div>
          <div className="text-center mb-5">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={inputValues.lastName}
              onChange={handleInputChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
            />
            {!errors.lastName ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.lastName}</p>
              </div>
            )}
          </div>
          <div className="text-center mb-5">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={inputValues.email}
              onChange={handleInputChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
            />
            {!errors.email ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.email}</p>
              </div>
            )}
          </div>
          <div className="text-center mb-5">
            <select
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
              name="securityQuestionId"
              value={inputValues.securityQuestionId}
              onChange={handleInputChange}
            >
              <option value={0} label='---Select Secret Question---' />
              {securityQuestions.map((question) => (
                <option
                  value={question.securityQuestionId}
                  label={question.securityQuestionText}
                  key={question.securityQuestionId}
                />
              ))}
            </select>
            {!errors.securityQuestionId ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.securityQuestionId}</p>
              </div>
            )}
          </div>
          <div className="text-center mb-5 pr-22 ">
            <input
              type={visibility.securityAnswer ? 'text' : 'password'}
              id="securityAnswer"
              name="securityQuestionAnswer"
              placeholder="Your answer for the secret question"
              value={inputValues.securityQuestionAnswer}
              onChange={handleInputChange}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96 "
            />
            {!errors.securityQuestionAnswer ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.securityQuestionAnswer}</p>
              </div>
            )}
          </div>
          <div className="text-center mb-5">
            <input
              type={visibility.password ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              minLength="8"
              required
              value={inputValues.password}
              onChange={handleInputChange}
              className="py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
            />
            {!errors.password ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.password}</p>
              </div>
            )}
          </div>
          <div className="text-center mb-10">
            <input
              type="password"
              id="cpassword"
              name="confirmPassword"
              placeholder="Confirm password"
              minLength="8"
              required
              value={inputValues.confirmPassword}
              onChange={handleInputChange}
              className="py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
            />
            {!errors.confirmPassword ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.confirmPassword}</p>
              </div>
            )}
          </div>
          {!errors.main ? null : (
            <div className="text-center text-pink-700 text-lg mb-5">
              <p>{errors.main}</p>
            </div>
          )}
          <div className="text-center">
            <button
              className="py-3 px-14 rounded-full bg-black-btn text-white font-bold"
              onClick={onSubmit}
            >
              Register
            </button>
          </div>
        </div>
       
        <div className="pl-60 pt-2 ">
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
