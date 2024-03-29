import { useContext, useEffect, useState } from "react";
import { roleIds } from "../../constants";
import { UserCard } from "../components/UserCard";
import { AuthContext } from "../contexts";
import MainLayout from "../layouts/MainLayout";
import { getSolvers } from "../utilities/api/solution";
import { getAccountTypes } from "../utilities/api/user";

const Solvers = () => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountTypeId, setAccountTypeId] = useState(0);
  const [solvers, setSolvers] = useState([]);
  const context = useContext(AuthContext);

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
      <div className="flex flex-col items-center min-h-screen my-10 mx-32 lg:mx-24 md:mx-16 sm:mx-10 xs:mx-5">
        <h1 className="text-3xl text-center font-bold mt-2">Our Solvers</h1>
        <div className="w-full">
          <div className="flex flex-wrap flex-start mt-10">
            <h2 className="mr-2 ">Account type :</h2>
            <select
              className="border-2 px-2 xs:w-40"
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
          <div className="border-2 my-5 p-5 xs:p-1 min-h-100">
            <div className="flex flex-wrap sm:justify-center">
              {solvers.map((solver) => (
                <div
                  key={solver.user_id}
                  className="border-2 shadow-sm hover:shadow-xl rounded-lg m-2 p-5 xs:p-2"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-fit">
                      <UserCard
                        name={solver.employee_name}
                        email={solver.email}
                        displayPicture={solver.display_picture}
                      />
                    </div>
                    <div>
                      <button
                        className={`
                          text-center m-4 w-20 p-1 rounded-lg text-white
                          ${context.auth.id !== solver.user_id
                            ? "bg-pink-700 cursor-pointer"
                            : "bg-pink-500 cursor-not-allowed"
                          }
                        `}
                        onClick={() => {
                          if (context.auth.id !== solver.user_id) {
                            context.setShowMessages(true)
                            context.setMessageUserId(solver.user_id)
                          }
                        }}
                      >
                        Connect
                      </button>
                    </div>
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
