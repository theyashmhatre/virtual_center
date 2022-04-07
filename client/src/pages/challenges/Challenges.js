import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getChallenges, searchChallenges } from "../../utilities/api/challenge";
import { getTruncatedContentState } from "../../utilities/utils";
import { apiURL, monthNames } from "../../../constants";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    if (!searchQuery)
      getChallenges(pageNo)
        .then(({ data }) => {
          console.log(data);
          setChallenges([...challenges, ...data.challenge_list]);
        })
        .catch(() => {});
    else
      searchChallenges(searchQuery, pageNo)
        .then(({ data }) => {
          setChallenges([...challenges, ...data.challenge_list]);
        })
        .catch(() => {});
  }, [pageNo]);

  const onSearch = () => {
    if (searchQuery) {
      setPageNo(1);
      searchChallenges(searchQuery, 1)
        .then(({ data }) => setChallenges(data.challenge_list || []))
        .catch(() => {});
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center  h-20v border">
        <div className="flex border-2 border-gray-200 rounded w-1/2 sm:w-5/6 xs:w-full absolute">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-90per"
            placeholder="what are you looking for?"
          />
          <div className="absolute top-2 right-3">
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              className="text-gray-400 z-20 hover:text-gray-500 cursor-pointer"
              onClick={onSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="lg:h-80v w-90v">
          <div className="h-10v flex items-center sm:flex-col">
            <div className=" w-70per lg:w-60per md:w-50per sm:w-full">
              <h1>Lorem lpsum Dolor Sit Amet</h1>
            </div>
            <div className=" w-30per lg:w-40per md:w-50per sm:w-full flex justify-end flex-wrap">
              <p className=" mr-4">{challenges.length} Results</p>
              <p className="">Sort By : Posted Date Newest</p>
            </div>
          </div>
          <div className="lg:h-70v flex md:flex-col md:items-center sm:items-center sm:flex-col flex-wrap">
            {challenges.map((challenge) => {
              const temp = new Date(challenge.end_date);
              const endDate =
                temp.getDate() +
                " " +
                monthNames[temp.getMonth()] +
                " " +
                temp.getFullYear();

              return (
                <div
                  className="border-2 h-70v lg:mb-0 mb-4 mr-3 w-24per md:w-1/2 sm:w-2/3 xs:w-5/6"
                  key={challenge.challenge_id}
                >
                  <div className="h-40per">
                    <img
                      className="object-fill h-full w-full"
                      src={apiURL + "/public/images/" + challenge.cover_image}
                      alt="challenge cover"
                    />
                  </div>
                  <div className="h-60per border-gray-500 border-2 flex flex-col justify-between p-3">
                    <div className="h-25per flex items-center">
                      <h2>{challenge.title}</h2>
                    </div>
                    <div className="h-10per flex items-center">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            getTruncatedContentState(
                              JSON.parse(challenge.description)
                            )
                          ),
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className=" flex items-center mb-1">
                        <button className="bg-pink-700 px-1 rounded mr-2">
                          Open
                        </button>
                        <p>Until {endDate}</p>
                      </div>
                      <div className="flex items-center mb-1">
                        <button className="bg-gray-300 px-1 rounded mr-2">
                          Awards
                        </button>
                        <button className="bg-gray-300 px-1 rounded mr-2">
                          See Details
                        </button>
                      </div>
                      <div className="flex items-center">
                        <button className="bg-gray-300 px-1 rounded mr-2">
                          Active Solvers
                        </button>
                        <button className="bg-gray-300 px-1 rounded mr-2">
                          6
                        </button>
                      </div>
                    </div>
                    <div>
                      <Link to={`/challenge/${challenge.challenge_id}`}>
                        <h2 className="text-center text-pink-700">
                          View challenge
                        </h2>
                      </Link>
                    </div>
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

export default Challenges;
