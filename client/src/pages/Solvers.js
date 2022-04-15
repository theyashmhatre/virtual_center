import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        console.log(data);
        if (data.solvers_count) setSolvers(data.solvers);
        else setSolvers([]);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAccountTypes()
      .then(({ data }) => {
        console.log(data);
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
                className="border-2 shadow-sm hover:shadow-xl  rounded-lg  lg:mb-0 mb-4 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6"
              >
                <div className="flex flex-col">
                  <div className=" flex  flex-col m-4 rounded   shadow-lg border-2 ">
                    <p className=" font-semibold flex justify-center align-bottom   ">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="sm"
                        className="p-1"
                      />
                      {solver.employee_name}
                    </p>
                    <div>
                      <div className="  flex justify-center   ">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          size="lg"
                          className=" p-1"
                        />
                        <p className="font-serif">{solver.email}</p>
                      </div>
                    </div>
                  </div>
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
  );
};

export default Solvers;
