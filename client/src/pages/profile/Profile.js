import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roleIds } from "../../../constants";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import { profile } from "../../utilities/api/userDetails";
import { DisplayPicture } from "../../components/DisplayPicture";

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
      <div className="min-h-screen mx-28 lg:mx-20 md:mx-16 sm:mx-10 xs:mx-3 my-10">
        <h1 className="text-3xl text-center tracking-wide text-gray-700 font-bold mb-10">
          USER PROFILE
        </h1>
        
        <div className="flex justify-center my-10">
          <div className="w-50per lg:w-60per md:w-70per sm:w-full border-2 py-10 px-6 sm:px-3 xs:px-1">
            <div className="w-full flex justify-center">
              <div className="border-4 rounded-full">
                <DisplayPicture
                  displayPicture={userDetail.display_picture}
                  size="6x"
                  boxSize={32}
                />
              </div>
            </div>

            <div className="flex flex-wrap my-5">
              <div className="w-full px-3">
                <div
                  className="block uppercase tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="userId"
                >
                  UserName
                </div>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                  className="block uppercase tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Name
                </div>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                  className="block uppercase tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Email
                </div>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  className="block uppercase tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="griduserDetail.-email"
                >
                  Location
                </div>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email"
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
                  className="block uppercase tracking-wide text-gray-700 text-lg md:text-base sm:text-sm font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  Contact Number
                </div>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Edit
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
