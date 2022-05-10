import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roleIds } from "../../constants";
import { UserCard } from "../components/UserCard";
import MainLayout from "../layouts/MainLayout";
import { getSolvers } from "../utilities/api/solution";
import { getAccountTypes } from "../utilities/api/user";

const Solvers = () => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountTypeId, setAccountTypeId] = useState(0);
  const [solvers, setSolvers] = useState([]);

  const updateSolvers = (id) => {
    getSolvers(id)
      .then(({ data }) => {
        if (data.solvers_count) setSolvers(data.solvers);
        else setSolvers([]);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAccountTypes()
      .then(({ data }) => {
        setAccountTypes(data);
        setAccountTypeId(1);
        updateSolvers(1);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    updateSolvers(accountTypeId);
  }, [accountTypeId]);

  return (
    <MainLayout role={roleIds["user"]}>
      <div className="flex flex-col items-center px-10 py-5">
        <h1 className="text-3xl text-center font-bold mt-2">Our Solvers</h1>
        <div className="w-full">
          <div className="flex flex-wrap flex-start mt-10">
            <h2 className="mr-2 ">Account type :</h2>
            <select
              className="border-2 px-2"
              name="accountTypeId"
              value={accountTypeId}
              onChange={(e) => setAccountTypeId(Number(e.target.value))}
            >
              <option value={0} label="---Select Account Type---" />
              {accountTypes.map((type) => (
                <option
                  value={type.accountId}
                  label={type.accountName}
                  key={type.accountId}
                />
              ))}
            </select>
          </div>
          <div className="border-2 mt-6 p-4 min-h-100">
            <div className="flex flex-wrap md:flex-col sm:flex-col md:items-center sm:items-center mt-5">
              {solvers.map((solver) => (
                <div
                  key={solver.id}
                  className="border-2 shadow-sm hover:shadow-xl rounded-lg lg:mb-0 mb-4 mr-4 w-24per md:w-1/2 sm:w-2/3 xs:w-5/6"
                >
                  <div className="flex justify-center">
                    <UserCard name={solver.employee_name} email={solver.email} />
                  </div>
                  <div>
                    <Link className="flex justify-center" to={``}>
                      <h2 className="text-center m-4 w-20 p-1 rounded-lg bg-pink-700 text-white">
                        Connect
                      </h2>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Solvers;
