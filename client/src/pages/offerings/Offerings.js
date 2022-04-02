import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getOfferings } from "../../utilities/api/offering";

const Offerings = () => {
  const [errors, setErrors] = useState({});
  const [offeringData, setOfferingData] = useState([]);

  useEffect(() => {
    getOfferings(1)
      .then(({ data }) => {
        console.log(data.offerings_list);
        setOfferingData(data.offerings_list);
      })
      .catch((error) => {
        if (error.response)
          if (error.response.data) setErrors(error.response.data);
          else setErrors({ main: "Some Error Occured, Try Again!" });
        else setErrors({ main: "Some Error Occured, Try Again!" });
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className=" flex justify-center">
        <div className="lg:h-80v  w-90v">
          <div className="lg:h-70v lg:w-4/5 flex md:flex-col md:items-center sm:items-center sm:flex-col justify-between flex-wrap">
            {/* Offerings blocks Started */}

            {offeringData.map((data, id) => {
              return (
                <div
                  key={id}
                  className="border-2   lg:mb-0 mb-4 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6"
                >
                  <div className=" bg-gradient-to-r from-pink-900 to-blue-grd  border-gray-500 border-2 flex flex-col justify-between p-3">
                    <div className="h-25per   flex  justify-center ">
                      <h2 className=" text-2xl text-white   ">{data.title}</h2>
                    </div>
                  </div>
                  <div className="p-2 flex items-center justify-center ">
                    <p>{data.description}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex  px-1 rounded mr-2 mb-2">
                      <p className="bg-gray-300">{data.owner_name}</p>
                      <p>
                        <div className=" pl-16 flex items-end ">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            size="lg"
                            className=""
                          />
                          <p className="bg-gray-300">{data.owner_email}</p>
                        </div>
                      </p>
                    </div>

                    <div className="flex items-center">
                      <button className="bg-gray-300  px-1 rounded mr-2">
                        See Attachment
                      </button>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-center p-4 text-pink-700">
                      View Detail
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offerings;
