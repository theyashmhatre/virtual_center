import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword, getSecurityQuestions } from "../utilities/user";
import { isEmptyObject } from "../utilities/utils";
import { inputValidation } from "../utilities/validation/forgotPassword";

initialInputValues = {
  email: '',
  securityQuestionId: 0,
  securityQuestionAnswer: '',
};

const ForgotPassword = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [securityAnswerVisibility, setSecurityAnswerVisibility] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  };
  
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
    setSuccessMessage('')
    setErrors({})
    const inputErrors = inputValidation(
      inputValues.email,
      Number(inputValues.securityQuestionId),
      inputValues.securityQuestionAnswer
    )
    
    if (isEmptyObject(inputErrors))
      // register user using api
      forgotPassword(
        inputValues.email,
        Number(inputValues.securityQuestionId),
        inputValues.securityQuestionAnswer,
      )
        .then(() => {
          setSuccessMessage('Your request to reset password is successfull. Check your email and click on the provided link to reset password.')
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
      <div className="min-h-screen bg-blue-500 bg-opacity-100 bg-gradient-to-tr from-blue-grd to-green-grd">
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
            Forgot Password
          </h2>
          {!successMessage ? null : (
            <div className="text-center text-green-500 text-lg mb-5">
              <p>{successMessage}</p>
            </div>
          )}
          <div className="text-center mb-5">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email-id"
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
          <div className="flex justify-center text-center mb-10">
            <div className="relative w-fit">
              <input
                type={securityAnswerVisibility ? 'text' : 'password'}
                id="securityAnswer"
                name="securityQuestionAnswer"
                placeholder="Your answer for the secret question"
                value={inputValues.securityQuestionAnswer}
                onChange={handleInputChange}
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96 "
              />
              <FontAwesomeIcon
                icon={securityAnswerVisibility ? faEye : faEyeSlash}
                size="lg"
                className="text-gray-600 cursor-pointer absolute float-right z-10 -ml-5 mt-3"
                onClick={() => setSecurityAnswerVisibility(!securityAnswerVisibility)}
              />
            </div>
            {!errors.securityQuestionAnswer ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.securityQuestionAnswer}</p>
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
              Submit
            </button>
          </div>
        </div>

        <div className="pl-48 pt-20">
          <label
            htmlFor="account"
            className="inline-block w-25 mr-6 text-center font-medium text-gray-600"
          >
            Remember your password?
          </label>

          <Link
            to="/"
            className="self-end mr-6 text-pink-600 font-bold"
          >
            Login
          </Link>
        </div>
        {/* grid child_2 end*/}
      </div>
    </div>
  );
};

export default ForgotPassword;
