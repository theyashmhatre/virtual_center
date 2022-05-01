import {
  faEnvelope,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roleIds } from "../../../constants";
import { Attachment } from "../../components/Attachement";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import { getOfferings } from "../../utilities/api/offering";
import { getTruncatedContentState } from "../../utilities/utils";

const Offerings = () => {
  const [errors, setErrors] = useState({});
  const [offeringData, setOfferingData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [moreOfferingsAvlbl, setMoreOfferingsAvlbl] = useState(true);
  const limit = 8;
  const context = useContext(AuthContext);

  const handleScroll = (e) => {
    const window = e.currentTarget;
    if (
      window.scrollY >
      window.document.documentElement.scrollHeight -
        window.document.documentElement.clientHeight -
        100
    )
      setPageNo((prevPageNo) => prevPageNo + 1);
  };

  useEffect(() => {
    if (!moreOfferingsAvlbl) return;

    window.addEventListener("scroll", (e) => handleScroll(e));

    return () => {
      window.removeEventListener("scroll", (e) => handleScroll(e));
    };
  }, [window.scrollY]);

  useEffect(() => {
    if (!moreOfferingsAvlbl) return;

    getOfferings(pageNo, limit)
      .then(({ data }) => {
        if (data.offerings_count)
          setOfferingData([...offeringData, ...data.offerings_list]);

        setLoading(false);
        if (data.offerings_count < limit) setMoreOfferingsAvlbl(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [pageNo]);

  return (
    <MainLayout role={roleIds["user"]}>
      <div className="min-h-screen mx-16 my-5">
        <h1 className="text-3xl text-center font-bold mb-10">Offerings</h1>
        
        {context.auth && (context.auth.role == roleIds["super_admin"]) ? (
          <div className="flex justify-end mb-10">
            <Link to={`/main/create-offering`}>
              <h2 className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 p-2">
                Create Offering
              </h2>
            </Link>
          </div>
        ) : null}

        <div className="lg:h-80v w-90v">
          <div className="lg:h-70v lg:w-4/5 flex md:flex-col md:items-center sm:items-center sm:flex-col justify-start flex-wrap">
            {/* Offerings blocks Started */}

            {offeringData.map((offering) => {
              return (
                <div
                  key={offering.offering_id}
                  className="border-2 shadow-sm hover:shadow-xl rounded-lg lg:mb-0 mb-4 mx-1 w-24per md:w-1/2 sm:w-2/3 xs:w-5/6"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="h-full">
                      <div className="h-50per rounded-lg bg-gradient-to-r from-pink-900 to-blue-grd border-gray-500 border-2 p-3">
                        <div className="flex justify-center items-center h-full">
                          <h2 className="text-2xl font-mono font-semibold text-white">
                            {offering.title}
                          </h2>
                        </div>
                      </div>
                      <div className="p-2 font-serif">
                        {offering.description && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: draftToHtml(
                                getTruncatedContentState(
                                  JSON.parse(offering.description)
                                )
                              ),
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <div className="flex flex-col m-4 rounded shadow-lg border-2">
                          <p className="font-semibold flex justify-center align-bottom">
                            <FontAwesomeIcon
                              icon={faUser}
                              size="sm"
                              className="p-1"
                            />
                            {offering.owner_name}
                          </p>
                          <div>
                            <div className="flex justify-center">
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                size="lg"
                                className=" p-1"
                              />
                              <p className="font-serif">{offering.owner_email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Attachment attachmentData={offering.attachment} />
                        </div>
                      </div>
                      <div>
                        <Link to={`/main/offering/${offering.offering_id}`}>
                          <h2 className="text-center p-4 text-pink-700">
                            View Detail
                          </h2>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {moreOfferingsAvlbl && loading ? (
            <div className="flex justify-center w-full my-20">
              <FontAwesomeIcon
                icon={faSpinner}
                size="4x"
                color="pink"
                spin={true}
              />
            </div>
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
};

export default Offerings;
