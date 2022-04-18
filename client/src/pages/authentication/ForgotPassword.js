import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthSidebar } from "../../components/AuthSidebar";
import { forgotPassword, getSecurityQuestions } from "../../utilities/api/user";
import { isEmptyObject } from "../../utilities/utils";
import { forgotPasswordInputValidation } from "../../utilities/validation/user";

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
    let { name, value, type } = e.target;

    setErrors({
      ...errors,
      [name]: null,
    });

    setInputValues({
      ...inputValues,
      [name]: type == 'select-one' ? Number(value) : value
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
    setSuccessMessage('');
    setErrors({});
    const inputErrors = forgotPasswordInputValidation(inputValues);
    
    if (isEmptyObject(inputErrors))
      // register user using api
      forgotPassword(inputValues)
        .then(() => {
          setSuccessMessage('Your request to reset password is successfull. Check your email and click on the provided link to reset password.')
        })
        .catch((error) => {
          if (error.response)
            if (error.response.data) setErrors(error.response.data);
            else setErrors({ main: 'Some Error Occured, Try Again!' });
          else setErrors({ main: 'Some Error Occured, Try Again!' });
        });
    else setErrors(inputErrors);
  };

  return (
    /*grid start*/
    <div className="grid grid-cols-2 divide-x">
      {/* grid child_1 start*/}
      <AuthSidebar />
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
          <div className="flex justify-center mb-5">
            <div>
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
                <div className="text-sm text-pink-700 text-lg mt-2 w-96 whitespace-normal">
                  <p>{errors.email}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mb-5">
            <div>
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
                <div className="text-sm text-pink-700 text-lg mt-2 w-96 whitespace-normal">
                  <p>{errors.securityQuestionId}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-10">
            <div>
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
                <div className="text-sm text-pink-700 text-lg mt-2 w-96 whitespace-normal">
                  <p>{errors.securityQuestionAnswer}</p>
                </div>
              )}
            </div>
          </div>
          {/* flex  end*/}
          {!errors.main ? null : (
            <div className="text-sm text-center text-pink-700 text-lg mb-5">
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
            to="/login"
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
