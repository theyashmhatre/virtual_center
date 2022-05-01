import { useEffect, useState } from "react";
import { roleIds } from "../../constants";
import MainLayout from "../layouts/MainLayout";
import { getDeletedChallenges } from "../utilities/api/challenge";
import { getDeletedOfferings } from "../utilities/api/offering";
import { getAdminDetails, getUserDetails } from "../utilities/api/userDetails";

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [deletedChallenges, setDeletedChallenges] = useState([]);
  const [deletedOfferings, setDeletedOfferings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const limit = 10;

  useEffect(() => {
    getUserDetails()
      .then(({ data }) => setUsers(data))
      .catch((e) => console.log(e));
    
    getAdminDetails()
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
 
  return (
    <MainLayout role={roleIds["super_admin"]}>
      <div className="flex flex-col items-center mb-10">
        <div>
          <h1 className="text-3xl text-center font-bold my-10">User Details</h1>
          <div className="w-90v flex justify-center">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2 sticky left-0 z-10">
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
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {user.username}
                      </td>
                      <td className="border p-2">
                        {user.employee_name}
                      </td>
                      <td className="border p-2">
                        {user.email}
                      </td>
                      <td className="border p-2">
                        {user.contact_number}
                      </td>
                      <td className="border p-2">
                        {user.account_type}
                      </td>
                      <td className="border p-2">
                        {user.status == 1 ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl text-center font-bold my-10">Admin Details</h1>
          <div className="w-90v flex justify-center">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2 sticky left-0 z-10">
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
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {admin.username}
                      </td>
                      <td className="border p-2">
                        {admin.employee_name}
                      </td>
                      <td className="border p-2">
                        {admin.email}
                      </td>
                      <td className="border p-2">
                        {admin.contact_number}
                      </td>
                      <td className="border p-2">
                        {admin.account_type}
                      </td>
                      <td className="border p-2">
                        {admin.status == 1 ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl text-center font-bold my-10">Deleted Challenges</h1>
          <div className="w-90v flex justify-center">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2 sticky left-0 z-10">
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
          <h1 className="text-3xl text-center font-bold my-10">Deleted Offerings</h1>
          <div className="w-90v flex justify-center">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2 sticky left-0 z-10">
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
