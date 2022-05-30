import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roleIds } from "../../../constants";
import { DisplayPicture } from "../../components/DisplayPicture";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import { profile } from "../../utilities/api/userDetails";

const Profile = () => {
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

  return (
    <MainLayout role={roleIds["user"]}>
      <div className="min-h-screen flex sm:flex-col">
        <div className="w-96 sm:w-full bg-gray-rgb py-10">
          <div className="text-2xl xl:text-3xl xs:text-xl text-center text-gray-500 font-bold border-b-2 px-8 pb-5">
            <h1>Your Profile</h1>
          </div>
          <div className="flex flex-col items-center px-10 pt-10">
            <div className="border-4 bg-white rounded-full p-2">
              <DisplayPicture
                displayPicture={userDetail.display_picture}
                size="6x"
                boxSize={32}
              />
            </div>
            <p className="text-xl my-5">
              {userDetail.employee_name}
            </p>
          </div>
        </div>
        
        <div className="w-full py-10">
          <div className="text-2xl xl:text-3xl xs:text-xl text-center text-gray-500 font-bold border-b-2 px-10 pb-5">
            <h1>Personal Details</h1>
          </div>
          <div className="py-10 px-6 sm:px-3 xs:px-1">
            <div className="flex flex-wrap my-5">
              <div className="w-full px-3">
                <div
                  className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="userId"
                >
                  UserName
                </div>
                <input
                  className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                  id="grid-first-name"
                  type="text"
                  placeholder=""
                  value={userDetail.username}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-wrap my-5">
              <div className="w-full px-3">
                <div
                  className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Name
                </div>
                <input
                  className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                  id="grid-first-name"
                  type="text"
                  placeholder=""
                  value={userDetail.employee_name}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-wrap my-5">
              <div className="w-full px-3">
                <div
                  className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Email
                </div>
                <input
                  className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                  id="grid-email"
                  type="email"
                  placeholder="abc@xyz.com"
                  value={userDetail.email}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-wrap my-5">
              <div className="w-full px-3">
                <div
                  className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="grid-accountType"
                >
                  Account Type
                </div>
                <input
                  className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                  id="grid-accountType"
                  type="text"
                  placeholder="location"
                  value={userDetail.accountName}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-wrap my-5">
              <div className="w-full px-3">
                <div
                  className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="grid-location"
                >
                  Location
                </div>
                <input
                  className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                  id="grid-location"
                  type="text"
                  placeholder="location"
                  value={userDetail.location}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-wrap my-5">
              <div className="w-full px-3">
                <div
                  className="tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  Contact Number
                </div>
                <input
                  className="w-full bg-white text-gray-700 border-2 border-gray-400 rounded py-3 px-4 leading-tight"
                  id="grid-zip"
                  type="text"
                  placeholder=""
                  value={userDetail.contact_number}
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-center w-full mt-5">
              <Link to={`edit-profile`}>
                <button
                  className="bg-pink-700 text-lg text-white font-bold rounded cursor-pointer py-2 px-10"
                  type="button"
                >
                  Update
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
