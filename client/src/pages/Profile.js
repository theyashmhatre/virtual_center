import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roleIds } from "../../constants";
import { AuthContext } from "../contexts";
import MainLayout from "../layouts/MainLayout";
import { profile } from "../utilities/api/userDetails";

const Profile = () => {
  const [userDetail, setUserDetail] = useState({});
  const [displayPicture, setDisplayPicture] = useState("");
  const context = useContext(AuthContext);
  const userId = context.auth.id;

  useEffect(() => {
    if (userId)
      profile(userId)
        .then(({ data }) => {
          if (data.display_picture)
            new Blob([new Uint8Array(data.display_picture.data)], {
              type: ".png",
            })
              .text()
              .then((result) => setDisplayPicture(result));

          setUserDetail(data);
        })
        .catch(() => {});
  }, []);

  return (
    <MainLayout role={roleIds["user"]}>
      <div>
        <div
          className="h-max mt-10 text-center text-2xl uppercase tracking-wide text-gray-700 font-bold mb-2"
          htmlFor="grid-profile"
        >
          User Profile
        </div>
        <div className="flex justify-center my-10">
          <div className="w-40per pt-10 border-2 p-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex flex-col align-middle justify-center">
              <div className="w-full flex justify-center">
                <div className="w-32 h-32 border-2 rounded-full">
                  {displayPicture ? (
                    <img
                      alt="profile"
                      src={displayPicture}
                      className="w-32 h-32 border-2 rounded-full"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      size="6x"
                      className="pl-5 pt-2"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap my-5">
              <div className="w-full md:w-1/2 px-3">
                <div
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
              <div className="w-full md:w-1/2 px-3">
                <div
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                  value={userDetail.email}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-wrap my-5">
              <div className="w-full px-3">
                <div
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
