import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";
import AuthLayout from "../../layouts/AuthLayout";
import { login } from "../../utilities/api/user";
import { isEmptyObject } from "../../utilities/utils";
import { loginInputValidation } from "../../utilities/validation/user";

initialInputValues = {
  username: 0,
  password: "",
};

const Login = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const handleInputChange = (e) => {
    let { name, value, type } = e.target;

    setErrors({
      ...errors,
      [name]: null,
    });

    setInputValues({
      ...inputValues,
      [name]: type == 'number' ? Number(value) : value,
    });
  };

  const onClick = () => {
    setErrors({});
    const inputErrors = loginInputValidation(inputValues);

    if (isEmptyObject(inputErrors))
      // signin using api
      login(inputValues)
        .then(({ data }) => {
          context.storeAuth(data.token);
          navigate("/");
        })
        .catch((error) => {
          if (error.response)
            if (error.response.data) setErrors(error.response.data);
            else setErrors({ main: "Some Error Occured, Try Again!" });
          else setErrors({ main: "Some Error Occured, Try Again!" });
        });
    else setErrors(inputErrors);
  };

  return (
    <AuthLayout>
      {/* grid child_2 start*/}
      {/* flex parent start*/}
      <div>
        <div className="bg-white text-pink-800 antialiased px-2 py-4 flex flex-col pt-16">
          <h2 className="my-8 font-display font-medium text-4xl text-pink-700 text-center">
            Login
          </h2>
          <div className="flex justify-center mb-5">
            <div>
              <input
                type="number"
                id="username"
                name="username"
                placeholder="Enter your Employee Id or Username"
                value={!inputValues.username ? '' : inputValues.username}
                onChange={handleInputChange}
                className={`flex-1 py-2 border-b-2 ${
                  !errors.username ? "border-gray-400" : "border-red-500"
                } focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96`}
              />
              {!errors.username ? null : (
                <div className="text-sm text-pink-700 text-lg mt-2 w-96 whitespace-normal">
                  <p>{errors.username}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-10">
            <div>
              <div className="relative w-fit">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  minLength="8"
                  required
                  value={inputValues.password}
                  onChange={handleInputChange}
                  className={`py-2 border-b-2 ${
                    !errors.password ? "border-gray-400" : "border-red-500"
                  } focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none w-96`}
                />
                <FontAwesomeIcon
                  icon={passwordVisibility ? faEye : faEyeSlash}
                  size="lg"
                  className="text-gray-600 cursor-pointer absolute float-right z-10 -ml-5 mt-3"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                />
              </div>
              {/* flex end */}
              {!errors.password ? null : (
                <div className="text-sm text-pink-700 text-lg mt-2 w-96 whitespace-normal">
                  <p>{errors.password}</p>
                </div>
              )}
            </div>
          </div>
          {!errors.main ? null : (
            <div className="text-sm text-center text-pink-700 text-lg mb-5">
              <p>{errors.main}</p>
            </div>
          )}
          <div className="text-center">
            <button
              className="py-3 px-14 rounded-full bg-black-btn text-white font-bold"
              onClick={onClick}
            >
              Login
            </button>
          </div>
        </div>

        <div className="pl-48 pt-20">
          <label
            htmlFor="account"
            className="inline-block w-25 mr-6 text-center font-medium text-gray-600"
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
            className="inline-block pl-10 w-25 mr-6 text-center font-medium text-gray-600"
          >
            |
          </label>
          <Link
            to="/forgot-password"
            className="pl-2 self-end mb-9 text-pink-600 font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        {/* grid child_2 end*/}
      </div>
    </AuthLayout>
  );
};

export default Login;
