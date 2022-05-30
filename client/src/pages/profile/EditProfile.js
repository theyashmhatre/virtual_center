import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { roleIds } from "../../../constants";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import {
  changePassword,
  profile,
  updateProfile,
} from "../../utilities/api/userDetails";
import { isEmptyObject, passwordValidation } from "../../utilities/utils";
import { updateProfileInputValidation } from "../../utilities/validation/user";

const initialInputValues = {
  username: "",
  name: "",
  email: "",
  contact: "",
  location: "",
  accountType: "",
};

const EditProfile = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [displayPicture, setDisplayPicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  useEffect(() => {
    profile(context.auth.id)
      .then(({ data }) => {
        setInputValues({
          username: data.username,
          name: data.employee_name,
          email: data.email,
          contact: data.contact_number,
          location: data.location || "",
          accountType: data.accountName,
        });

        if (data.display_picture)
          new Blob([new Uint8Array(data.display_picture.data)], {
            type: ".png",
          })
            .text()
            .then((result) => setDisplayPicture(result));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    let { name, value, type, files } = e.target;

    if (type == "file") {
      const reader = new FileReader();

      reader.onload = () => setDisplayPicture(reader.result);

      reader.onerror = () =>
        setErrors({
          main: "Error while reading image data",
        });

      reader.readAsDataURL(files[0]);
    } else {
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setErrors({});
    const inputErrors = updateProfileInputValidation(inputValues);

    if (isEmptyObject(inputErrors)) {
      updateProfile({ ...inputValues, displayPicture })
        .then(() => alert("Profile Updated!"))
        .catch((error) => console.log(error));
    } else setErrors(inputErrors);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setErrors({});
    const inputErrors = passwordValidation(password, confirmPassword);

    if (isEmptyObject(inputErrors)) {
      changePassword(password, confirmPassword)
        .then(() => {
          setPassword("");
          setConfirmPassword("");
          alert("Your password is updated!");
        })
        .catch((error) => console.log(error));
    } else setErrors(inputErrors);
  };

  return (
    <MainLayout role={roleIds["user"]}>
      <div className="min-h-screen flex sm:flex-col">
        <div className="w-96 sm:w-full bg-gray-rgb py-10">
          <div className="text-2xl xl:text-3xl xs:text-xl text-center text-gray-500 font-bold border-b-2 px-8 pb-5">
            <h1>Your Profile</h1>
          </div>
          <div className="flex flex-col items-center px-10 pt-10">
            <div className="border-4 bg-white rounded-full p-2">
              <div className="rounded-full h-32 w-32">
                {!displayPicture ? (
                  <div className="flex justify-center items-center h-full w-full">
                    <FontAwesomeIcon
                      icon={faUser}
                      size="6x"
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <img
                    className="object-fill h-full w-full rounded-full"
                    src={displayPicture}
                  />
                )}
              </div>
            </div>
            <p className="text-xl xs:text-lg my-5">
              {inputValues.name}
            </p>
            <label>
              <input
                name="displayPicture"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
              <p className="bg-pink-700 text-white text-center font-bold rounded cursor-pointer py-2 px-4">
                Upload New Image
              </p>
            </label>
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex flex-col xl:flex-row">
            <div className="w-full xl:w-1/2 py-10">
              <div className="text-2xl xl:text-3xl xs:text-xl text-center text-gray-500 font-bold border-b-2 px-10 pb-5">
                <h1>Personal Details</h1>
              </div>
              <div className="py-10 px-6 sm:px-3 xs:px-1">
                <div className="flex flex-wrap my-5">
                  <div className="w-full px-3 xs:px-2 md:mb-0">
                    <label
                      className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-medium"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight cursor-not-allowed"
                      id="username"
                      type="text"
                      name="username"
                      value={inputValues.username}
                      placeholder="Username"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex flex-wrap my-5">
                  <div className="w-full px-3 xs:px-2 md:mb-0">
                    <label
                      className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-medium"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                      id="name"
                      type="text"
                      name="name"
                      value={inputValues.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                    />
                    {!errors.name ? null : (
                      <div className="text-center text-red-700 text-lg mb-5">
                        <p>{errors.name}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap my-5">
                  <div className="w-full px-3 xs:px-2">
                    <label
                      className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-medium"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                      id="email"
                      type="email"
                      name="email"
                      value={inputValues.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                    {!errors.email ? null : (
                      <div className="text-center text-red-700 text-lg mb-5">
                        <p>{errors.email}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap my-5">
                  <div className="w-full px-3 xs:px-2 md:mb-0">
                    <label
                      className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-medium"
                      htmlFor="accountType"
                    >
                      Account Type
                    </label>
                    <input
                      className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight cursor-not-allowed"
                      id="accountType"
                      type="text"
                      name="accountType"
                      value={inputValues.accountType}
                      placeholder="Account Type"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex flex-wrap my-5">
                  <div className="w-full px-3 xs:px-2">
                    <label
                      className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-medium"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <input
                      className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                      id="location"
                      type="text"
                      name="location"
                      value={inputValues.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                    />
                    {!errors.location ? null : (
                      <div className="text-center text-red-700 text-lg mb-5">
                        <p>{errors.location}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap my-5">
                  <div className="w-full px-3 xs:px-2 mb-6 md:mb-0">
                    <label
                      className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-medium"
                      htmlFor="contact-number"
                    >
                      Contact Number
                    </label>
                    <input
                      className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                      id="contact-number"
                      type="text"
                      name="contact"
                      value={inputValues.contact}
                      onChange={handleInputChange}
                      placeholder="Contact Number"
                    />
                    {!errors.contact ? null : (
                      <div className="text-center text-red-700 text-lg mb-5">
                        <p>{errors.contact}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    className="bg-pink-700 text-lg text-white font-bold rounded py-2 px-10"
                    type="button"
                    onClick={handleUpdateProfile}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/2 py-10">
              <div className="text-2xl xl:text-3xl xs:text-xl text-center text-gray-500 font-bold border-b-2 px-10 pb-5">
                <h1>Change Password</h1>
              </div>
              <div className="py-10 px-6 sm:px-3 xs:px-1">
                <div className="flex flex-wrap my-5">
                  <div className="w-full px-3 xs:px-2">
                    <label
                      className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-medium"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <p className="text-gray-600 text-xs italic">
                      Use a strong password
                    </p>
                    {!errors.password ? null : (
                      <div className="text-center text-red-700 text-lg mb-5">
                        <p>{errors.password}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap my-5">
                  <div className="w-full px-3 xs:px-2">
                    <label
                      className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-medium"
                      htmlFor="confirm-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                    <p className="text-gray-600 text-xs italic">
                      Provide similar to password
                    </p>
                    {!errors.confirmPassword ? null : (
                      <div className="text-center text-red-700 text-lg mb-5">
                        <p>{errors.confirmPassword}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    className="bg-pink-700 text-lg text-white font-bold rounded py-2 px-10"
                    type="button"
                    onClick={handleChangePassword}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
