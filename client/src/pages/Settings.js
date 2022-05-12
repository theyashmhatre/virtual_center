import { useEffect, useState } from "react";
import { roleIds } from "../../constants";
import MainLayout from "../layouts/MainLayout";
import { getDeletedChallenges } from "../utilities/api/challenge";
import { getDeletedOfferings } from "../utilities/api/offering";
import {
  changeAdminToUser,
  changeUserToAdmin,
  getAdmins,
  getUsers,
  updateStatusToActive,
  updateStatusToInactive
} from "../utilities/api/superAdmin";

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [deletedChallenges, setDeletedChallenges] = useState([]);
  const [deletedOfferings, setDeletedOfferings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const limit = 10;

  useEffect(() => {
    getUsers()
      .then(({ data }) => setUsers(data))
      .catch((e) => console.log(e));
    
    getAdmins()
      .then(({ data }) => setAdmins(data))
      .catch((e) => console.log(e));
    
    getDeletedChallenges(pageNo, limit)
      .then(({ data }) => {
        if (data.challenges_count)
          setDeletedChallenges(data.challenge_list);
      })
      .catch((e) => console.log(e));
    
    getDeletedOfferings(pageNo, limit)
      .then(({ data }) => {
        if (data.offerings_count)
          setDeletedOfferings(data.offering_list);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleStatusChange = (index, type) => {
    let user;
    if (type === roleIds["admin"])
      user = admins[index];
    else
      user = users[index];
    
    if (user.status) {
      updateStatusToInactive(user.username)
        .then(() => {
          if (type === roleIds["admin"]) {
            const newAdmins = [...admins];
            newAdmins[index] = { ...admins[index], status: 0};
            setAdmins(newAdmins);
          } else {
            const newUsers = [...users];
            newUsers[index] = { ...users[index], status: 0};
            setUsers(newUsers);
          }
        })
        .catch((e) => console.log(e));
    } else {
      updateStatusToActive(user.username)
        .then(() => {
          if (type === roleIds["admin"]) {
            const newAdmins = [...admins];
            newAdmins[index] = { ...admins[index], status: 1};
            setAdmins(newAdmins);
          } else {
            const newUsers = [...users];
            newUsers[index] = { ...users[index], status: 1};
            setUsers(newUsers);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const changeAccessToAdmin = (index) => {
    const user = users[index];
    changeUserToAdmin(user.username)
      .then(() => {
        setUsers(users.filter((el, i) => i!==index));
        setAdmins([ user, ...admins ]);
      })
      .catch((error) => {
        if (error?.response?.data) {
          alert(error.response.data.main);
        }
      });
  };
  
  const changeAccessToUser = (index) => {
    const user = admins[index];
    changeAdminToUser(user.username)
      .then(() => {
        setAdmins(admins.filter((el, i) => i!==index));
        setUsers([ user, ...users ]);
      })
      .catch((error) => {
        if (error?.response?.data) {
          alert(error.response.data.main);
        }
      });
  };
 
  return (
    <MainLayout role={roleIds["super_admin"]}>
      <div className="min-h-screen my-10 mx-32 lg:mx-24 md:mx-16 sm:mx-10 xs:mx-5">
        <div>
          <h1 className="text-3xl sm:text-2xl text-center font-bold my-10">
            User Details
          </h1>
          <div className="flex justify-center">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2">
                      Employee Id
                    </th>
                    <th className="border p-2">
                      Employee Name
                    </th>
                    <th className="border p-2">
                      Email
                    </th>
                    <th className="border p-2">
                      Contact Number
                    </th>
                    <th className="border p-2">
                      Account Type
                    </th>
                    <th className="border p-2">
                      Status
                    </th>
                    <th className="border p-2">
                      Change Role To Admin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {users[index].username}
                      </td>
                      <td className="border p-2">
                        {users[index].employee_name}
                      </td>
                      <td className="border p-2">
                        {users[index].email}
                      </td>
                      <td className="border p-2">
                        {users[index].contact_number}
                      </td>
                      <td className="border p-2">
                        {users[index].account_type}
                      </td>
                      <td className="border p-2">
                        <select
                          className="py-2 border-2 border-gray-400 rounded-xl focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none"
                          name="status"
                          value={users[index].status}
                          onChange={() => handleStatusChange(index, roleIds["user"])}
                        >
                          <option value={0} label="Inactive" />
                          <option value={1} label="Active" />
                        </select>
                      </td>
                      <td className="border p-2 flex justify-center">
                        <button
                          className="py-3 px-10 rounded-full bg-pink-800 text-white font-bold"
                          onClick={() => changeAccessToAdmin(index)}
                        >
                          Change
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center my-5">
            <p className="text-pink-800">
              Note: Each account can have only one admin.
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-2xl text-center font-bold my-10">
            Admin Details
          </h1>
          <div className="flex justify-center">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2">
                      Employee Id
                    </th>
                    <th className="border p-2">
                      Employee Name
                    </th>
                    <th className="border p-2">
                      Email
                    </th>
                    <th className="border p-2">
                      Contact Number
                    </th>
                    <th className="border p-2">
                      Account Type
                    </th>
                    <th className="border p-2">
                      Status
                    </th>
                    <th className="border p-2">
                      Change Role To User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {admins[index].username}
                      </td>
                      <td className="border p-2">
                        {admins[index].employee_name}
                      </td>
                      <td className="border p-2">
                        {admins[index].email}
                      </td>
                      <td className="border p-2">
                        {admins[index].contact_number}
                      </td>
                      <td className="border p-2">
                        {admins[index].account_type}
                      </td>
                      <td className="border p-2">
                        <select
                          className="py-2 border-2 border-gray-400 rounded-xl focus:border-green-400 text-gray-600 placeholder-zinc-400 outline-none"
                          name="status"
                          value={admins[index].status}
                          onChange={() => handleStatusChange(index, roleIds["admin"])}
                        >
                          <option value={0} label="Inactive" />
                          <option value={1} label="Active" />
                        </select>
                      </td>
                      <td className="border p-2 flex justify-center">
                        <button
                          className="py-3 px-10 rounded-full bg-pink-800 text-white font-bold"
                          onClick={() => changeAccessToUser(index)}
                        >
                          Change
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-2xl text-center font-bold my-10">
            Deleted Challenges
          </h1>
          <div className="flex justify-center">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2">
                      Challenge Id
                    </th>
                    <th className="border p-2">
                      Title
                    </th>
                    <th className="border p-2">
                      Cloud Provider
                    </th>
                    <th className="border p-2">
                      Account Type
                    </th>
                    <th className="border p-2">
                      Created By
                    </th>
                    <th className="border p-2">
                      Posted On
                    </th>
                    <th className="border p-2">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deletedChallenges.map((challenge, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {challenge.challenge_id}
                      </td>
                      <td className="border p-2">
                        {challenge.title}
                      </td>
                      <td className="border p-2">
                        {challenge.cloud_provider}
                      </td>
                      <td className="border p-2">
                        {challenge.account_type}
                      </td>
                      <td className="border p-2">
                        {challenge.employee_name}
                      </td>
                      <td className="border p-2">
                        {new Date(challenge.posted_on).toISOString().split('T')[0]}
                      </td>
                      <td className="border p-2">
                        {new Date(challenge.end_date).toISOString().split('T')[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-2xl text-center font-bold my-10">
            Deleted Offerings
          </h1>
          <div className="flex justify-center">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2">
                      Offering Id
                    </th>
                    <th className="border p-2">
                      Title
                    </th>
                    <th className="border p-2">
                      Owner Name
                    </th>
                    <th className="border p-2">
                      Owner Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deletedOfferings.map((offering, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {offering.offering_id}
                      </td>
                      <td className="border p-2">
                        {offering.title}
                      </td>
                      <td className="border p-2">
                        {offering.owner_name}
                      </td>
                      <td className="border p-2">
                        {offering.owner_email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
