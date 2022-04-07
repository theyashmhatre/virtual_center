import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser, faPaperclip } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { getOfferings } from "../../utilities/api/offering";
import { Link } from "react-router-dom";

const Offerings = () => {
  const [errors, setErrors] = useState({});
  const [offeringData, setOfferingData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    getOfferings(pageNo)
      .then(({ data }) => {
        setOfferingData([...offeringData, ...data.offerings_list]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNo]);

  return (
    <div className="">
      <Navbar />

      <div className=" flex justify-center lg:w-4/5 ">
        <div className="lg:h-80v  w-90v">
          <div className="lg:h-70v lg:w-4/5 flex md:flex-col md:items-center sm:items-center sm:flex-col justify-between flex-wrap">
            {/* Offerings blocks Started */}

            {offeringData.map((data, id) => {
              return (
                <div
                  key={id}
                  className="border-2 shadow-sm hover:shadow-xl  rounded-lg  lg:mb-0 mb-4 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6"
                >
                  <div className="rounded-lg bg-gradient-to-r from-pink-900 to-blue-grd  border-gray-500 border-2 flex flex-col justify-between p-3">
                    <div className="h-25per   flex  justify-center ">
                      <h2 className=" text-2xl font-mono font-semibold text-white   ">
                        {data.title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-2  font-serif flex items-center justify-center ">
                    <p>
                      {data.description} This is description Of TCS Offering to
                      get more details of the offering click on view Detail...{" "}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex  flex-col m-4 rounded   shadow-lg border-2 ">
                      <p className=" font-semibold flex justify-center align-bottom   ">
                        <FontAwesomeIcon
                          icon={faUser}
                          size="sm"
                          className="p-1"
                        />
                        {data.owner_name} Patil
                      </p>
                      <div>
                        <div className="  flex justify-center   ">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            size="lg"
                            className=" p-1"
                          />
                          <p className="font-serif">{data.owner_email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <button className="bg-pink-600 text-white ml-4  px-1 rounded ">
                        View Attachment
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          size="md"
                          className="p-0 pl-1"
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <Link to={`/offering/${data.offering_id}`}>
                      <h2 className="text-center p-4 text-pink-700">
                        View Detail
                      </h2>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-5 mb-10">
            <button
              className="text-lg text-red-700 font-bold"
              onClick={() => setPageNo(pageNo + 1)}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Offerings;
