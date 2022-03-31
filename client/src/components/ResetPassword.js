import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router";
import { resetPassword } from "../utilities/api/user";
import { isEmptyObject, passwordValidation } from "../utilities/utils";

initialInputValues = {
  password: '',
  confirmPassword: ''
};

initialVisibility = {
  password: false,
  confirmPassword: false
};

const ResetPassword = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [visibility, setVisibility] = useState(initialVisibility);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { username, token } = useParams();

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  };
  
  const handleVisibilityChange = (name) => {
    setVisibility({
      ...visibility,
      [name]: !visibility[name]
    })
  };
  
  const onSubmit = () => {
    setSuccessMessage('');
    setErrors({});
    const inputErrors = passwordValidation(inputValues.password, inputValues.confirmPassword);
    
    if (isEmptyObject(inputErrors))
      // register user using api
      resetPassword(
        username,
        token,
        inputValues.password,
        inputValues.confirmPassword
      )
        .then(() => {
          setSuccessMessage('Your password is updated succesfully.');
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
            Reset Password
          </h2>
          {!successMessage ? null : (
            <div className="text-center text-green-500 text-lg mb-5">
              <p>{successMessage}</p>
            </div>
          )}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="relative w-fit">
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
              <FontAwesomeIcon
                icon={visibility.password ? faEye : faEyeSlash}
                size="lg"
                className="text-gray-600 cursor-pointer absolute float-right z-10 -ml-5 mt-3"
                onClick={() => handleVisibilityChange("password")}
              />
            </div>
            {!errors.password ? null : (
              <div className="text-center text-pink-700 text-lg mt-2">
                <p>{errors.password}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative w-fit">
              <input
                type={visibility.confirmPassword ? 'text' : 'password'}
                id="cpassword"
                name="confirmPassword"
                placeholder="Confirm password"
                minLength="8"
                required
                value={inputValues.confirmPassword}
                onChange={handleInputChange}
                className="py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96"
              />
              <FontAwesomeIcon
                icon={visibility.confirmPassword ? faEye : faEyeSlash}
                size="lg"
                className="text-gray-600 cursor-pointer absolute float-right z-10 -ml-5 mt-3"
                onClick={() => handleVisibilityChange("confirmPassword")}
              />
            </div>
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
              Submit
            </button>
          </div>
        </div>
        {/* grid child_2 end*/}
      </div>
    </div>
  );
};

export default ResetPassword;
