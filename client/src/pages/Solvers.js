import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getSolvers } from "../utilities/api/solution";
import { getAccountTypes } from "../utilities/api/user";

const Solvers = () => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountTypeId, setAccountTypeId] = useState(0);
  const [solvers, setSolvers] = useState([]);

  const updateSolvers = (id) => {
    getSolvers(id)
      .then(({ data }) => {
        if (data.solvers_count)
          setSolvers(data.solvers);
        else
          setSolvers([]);
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
  }, [accountTypeId])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="w-90v">
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

          <div className="flex flex-wrap md:flex-col sm:flex-col md:items-center sm:items-center mt-10">
            {solvers.map((solver) => (
              <div
                key={solver.id}
                className="flex flex-col items-center rounded-3xl border-4 border-red-600 h-25v w-24per md:w-1/2 sm:w-1/2 xs:w-1/2 mr-3 mb-4 p-4"
              >
                <div className="w-full">
                  <div className="flex space-x-5">
                    <div className="flex flex-col items-center">
                      <div className="border h-20 w-20 bg-gray-200 text-center mb-1 rounded-full">
                        <div className="w-full flex justify-center mb-3">
                          <div className="border-2 rounded-full h-20 w-20">
                            {!solver.display_picture ? (
                              <FontAwesomeIcon
                                icon={faUser}
                                size="3x"
                                className=" pt-2"
                              />
                            ) : (
                              <img
                                src={apiURL + "/public/images/" + solver.display_picture}
                                alt="Profile Pic"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h1>{solver.username}</h1>
                      </div>
                    </div>

                    <div>
                      <div>
                        <h1 className="text-3xl">{solver.employee_name}</h1>
                      </div>

                      <div>
                        <h1 className="text-3xl">{solver.email}</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button className="bg-red-600 rounded-lg px-3 py-1">Connect</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solvers;
