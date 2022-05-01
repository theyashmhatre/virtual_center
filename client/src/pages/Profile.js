import MainLayout from "../layouts/MainLayout";
import { roleIds } from "../../constants";
import { AuthContext } from "../contexts";
import { profile } from "../utilities/api/userDetails";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Profile = () => {
  //  const { username } = jwt.decode(sessionStorage.getItem("Access Token"));

  const [userDetail, setUserDetail] = useState({});
  const context = useContext(AuthContext);
  const userId = context.auth.id;
  useEffect(() => {
    if (userId)
      profile(userId)
        .then(({ data }) => {
          setUserDetail(data);
        })
        .catch(() => {});
  }, []);
  console.log(userDetail);

  const {
    username,
    employee_name,
    email,
    contact_number,
    display_picture,
    location,
  } = userDetail;

  return (
    <MainLayout role={roleIds["user"]}>
      <div className="  ">
        <div
          className="h-max mt-10 text-center text-2xl  uppercase tracking-wide text-gray-700 font-bold mb-2  "
          htmlFor="grid-profile"
        >
          User Profile
        </div>
        <form className=" max-w-2xl ml-96  pt-10  border-2 p-6 mb-5 ">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0  flex flex-col align-middle justify-center">
            <div className=" w-full flex justify-center  ">
              <div className=" w-32 h-32 border-2 rounded-full  ">
                {display_picture ? (
                  <img alt="profile" src={display_picture}></img>
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    size="6x"
                    className=" pl-5 pt-2 "
                  />
                )}
              </div>
            </div>

            {/* <input
              type="file"
              accept="image/*"
              name="Image"
              placeholder="Upload photo for profile image"
              classNameName="border-2 rounded-lg w-full"
            /> */}
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full md:w-1/2 px-3  ">
              <div
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="userId"
              >
                UserName
              </div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder=""
                value={username}
                disabled
              ></input>
            </div>

            <div className="w-full md:w-1/2 px-3  ">
              <div
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-name"
              >
                Name
              </div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder=""
                value={employee_name}
                disabled
              ></input>
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                placeholder="abc@xyz.com"
                value={email}
                disabled
              ></input>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Location
              </div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="text"
                placeholder="location"
                value={location}
                disabled
              ></input>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Contact Number
              </div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder=""
                value={contact_number}
                disabled
              ></input>
            </div>

            <Link
              to={`edit-profile`}
              className="pl-4 flex justify-center w-full "
            >
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Edit
              </button>
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Profile;
