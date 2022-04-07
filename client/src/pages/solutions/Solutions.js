import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getSingleChallenge } from "../../utilities/api/challenge";
import { getSolutions } from "../../utilities/api/solution";
import { getTruncatedContentState } from "../../utilities/utils";
import { apiURL, monthNames } from "../../../constants";
import challenge_cover from "../../../public/challenge_cover.png";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Solutions = () => {
  const [challenge, setChallenge] = useState({});
  const [solutions, setSolutions] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const { challengeId } = useParams();

  useEffect(() => {
    if (challengeId) {
      getSolutions(challengeId, pageNo)
        .then(({ data }) => {
          setSolutions([...solutions, ...data.solution_list]);
          console.log(data.solution_list);
        })
        .catch(() => {});

      getSingleChallenge(challengeId)
        .then(({ data }) => setChallenge(data))
        .catch(() => {});
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col mx-2 mb-4 ">
        <div className="flex flex-col sm:w-full w-full mb-1 border-2  ">
          <div className="bg-red-500 h-30v flex items-center justify-center">
            <img
              className="object-fill h-full w-full"
              src={
                !challenge.cover_image
                  ? challenge_cover
                  : apiURL + "/public/images/" + challenge.cover_image
              }
              alt="challenge cover"
            />
          </div>
        </div>
        <h1 className="mb-5 flex justify-center font-serif text-4xl  ">
          {challenge.title}
        </h1>
        <div className="flex flex-col"></div>
        <div className="flex justify-start w-full ">
          <div className="flex w-80v flex-wrap md:w-95v sm:w-95v">
            <Link
              to={`/challenge/${challengeId}`}
              className="bg-gray-200 p-2 mb-1  "
            >
              Overview
            </Link>
            <Link
              to={`/challenge/${challengeId}/solutions`}
              className="bg-gray-300 p-2  mb-1 border-white border-x"
            >
              Solutions
            </Link>
            <button className="bg-gray-200 p-2 mb-1">Comments</button>
          </div>
        </div>

        <div className=" w-80v md:w-95v sm:w-95v flex-wrap border-2 w-full flex  items-center justify-center">
          {solutions.map((solution) => {
            const temp = new Date(solution.posted_on);
            const postedOn_date =
              temp.getDate() +
              " " +
              monthNames[temp.getMonth()] +
              " " +
              temp.getFullYear();
            return (
              <div
                key={solution.solution_id}
                className="border-2 shadow-sm hover:shadow-xl  rounded-lg  lg:mb-0 mb-2 mt-2 p-4 m-1 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6"
              >
                <div className="rounded-lg bg-gradient-to-r from-pink-900 to-blue-grd  border-gray-500 border-2 flex flex-col justify-between p-3">
                  <div className="h-25per   flex  justify-center ">
                    <h2 className=" text-2xl font-mono font-semibold text-white   ">
                      {solution.title}
                    </h2>
                  </div>
                </div>
                <div className="p-2  font-serif flex items-center justify-center ">
                  <p>
                    {!solution.description ? null : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            getTruncatedContentState(
                              JSON.parse(solution.description)
                            )
                          ),
                        }}
                      />
                    )}
                  </p>
                </div>
                <p className="text-xs pl-2 text-gray-400">
                  Posted on : {postedOn_date}
                </p>
                <div className="flex flex-col">
                  <div className=" flex  flex-col m-4 rounded   shadow-lg border-2 ">
                    <p className=" font-semibold flex justify-center align-bottom   ">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="sm"
                        className="p-1"
                      />
                      Patil
                    </p>
                    <div>
                      <div className="  flex justify-center   ">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          size="lg"
                          className=" p-1"
                        />
                        <p className="font-serif">patil@hmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Link to={`/solution/${solution.solution_id}`}>
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
      <Footer />
    </div>
  );
};

export default Solutions;
