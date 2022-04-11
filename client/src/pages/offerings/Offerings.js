import { faEnvelope, faPaperclip, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getOfferings } from "../../utilities/api/offering";
import { getTruncatedContentState } from "../../utilities/utils";

const Offerings = () => {
  const [errors, setErrors] = useState({});
  const [offeringData, setOfferingData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [moreOfferingsAvlbl, setMoreOfferingsAvlbl] = useState(true);
  const limit = 2;

  const handleScroll = (e) => {
    const window = e.currentTarget;
    if (
      window.scrollY > (
        window.document.documentElement.scrollHeight -
        window.document.documentElement.clientHeight -
        100
      )
    )
      setPageNo(prevPageNo => prevPageNo+1);
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
        if (data.offerings_count < limit)
          setMoreOfferingsAvlbl(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [pageNo]);

  return (
    <div className="">
      <Navbar />

      <div className="min-h-screen mx-16 my-5">
        <h1 className="text-3xl text-center font-bold mb-10">
          Offerings
        </h1>
        <div className="lg:h-80v w-90v">
          <div className="lg:h-70v lg:w-4/5 flex md:flex-col md:items-center sm:items-center sm:flex-col justify-start flex-wrap">
            {/* Offerings blocks Started */}

            {offeringData.map((data, id) => {
              return (
                <div
                  key={id}
                  className="border-2 shadow-sm hover:shadow-xl rounded-lg lg:mb-0 mb-4 mx-2 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6"
                >
                  <div className="rounded-lg bg-gradient-to-r from-pink-900 to-blue-grd border-gray-500 border-2 flex flex-col justify-between p-3">
                    <div className="h-25per flex justify-center">
                      <h2 className="text-2xl font-mono font-semibold text-white">
                        {data.title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-2 font-serif flex items-center justify-center">
                    {data.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            getTruncatedContentState(
                              JSON.parse(data.description)
                            )
                          ),
                        }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col m-4 rounded shadow-lg border-2">
                      <p className="font-semibold flex justify-center align-bottom">
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
      <Footer />
    </div>
  );
};

export default Offerings;
