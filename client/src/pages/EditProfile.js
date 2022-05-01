import { useContext, useEffect, useState } from "react";
import { roleIds } from "../../constants";
import { AuthContext } from "../contexts";
import MainLayout from "../layouts/MainLayout";
import {
  changePassword,
  profile,
  updateProfile,
} from "../utilities/api/userDetails";
import { isEmptyObject, passwordValidation } from "../utilities/utils";
import { updateProfileInputValidation } from "../utilities/validation/user";

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
        .then(() => alert("Your password is updated!"))
        .catch((error) => console.log(error));
    } else setErrors(inputErrors);
  };

  return (
    <MainLayout role={roleIds["user"]}>
      <div className="my-10">
        <h1 className="text-center text-2xl block uppercase tracking-wide text-gray-700 font-bold mb-2">
          User Profile
        </h1>
        <div className="flex  border-2 mx-32">
          <div className="w-1/2 px-32 pt-10">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none cursor-not-allowed"
                  id="username"
                  type="text"
                  name="username"
                  value={inputValues.username}
                  placeholder="Username"
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="accountType"
                >
                  Account Type
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none cursor-not-allowed"
                  id="accountType"
                  type="text"
                  name="accountType"
                  value={inputValues.accountType}
                  placeholder="Account Type"
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="contact-number"
                >
                  Contact Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  htmlFor="Profile Image"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="displayPicture"
                  onChange={handleInputChange}
                  placeholder="Upload photo for profile image"
                  className="border-2 rounded-lg w-full"
                />
                {!displayPicture ? null : (
                  <div className="flex justify-center w-full my-5">
                    <div className="w-1/2">
                      <img
                        className="object-fill w-full rounded-3xl"
                        src={displayPicture}
                        alt="Display Picture"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleUpdateProfile}
              >
                Update
              </button>
            </div>
          </div>
          <div className="w-1/2 px-32 pt-10">
            <h2 className="pt-16 text-center text-2xl block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Change Password
            </h2>
            <div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    </MainLayout>
  );
};

export default EditProfile;
