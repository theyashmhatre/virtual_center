import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getSingleChallenge } from "../../utilities/api/challenge";
import { getSolutions } from "../../utilities/api/solution";
import { getTruncatedContentState } from '../../utilities/utils';
import { apiURL } from "../../../constants";

const Solutions = () => {
  const [challenge, setChallenge] = useState({});
  const [solutions, setSolutions] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const { challengeId } = useParams();
  
  useEffect(() => {
    if (challengeId) {
      getSolutions(challengeId, pageNo)
        .then(({ data }) => {
          setSolutions([ ...solutions, ...data.solution_list]);
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
      <div className="flex items-center flex-col">
        <div className="flex flex-col sm:w-full mb-5">
          <div className="bg-red-500 h-30v flex items-center justify-center">
            <img
              className="object-fill h-full w-full"
              src={apiURL + "/public/images/" + challenge.cover_image}
              alt="challenge cover"
            />
          </div>
        </div>

        <div className="flex w-80v flex-wrap md:w-95v sm:w-95v">
          <Link
            to={`/challenges/${challengeId}`}
            className="bg-gray-300 p-2 mr-4 mb-5"
          >
            Challenge overview
          </Link>
          <Link
            to={`/challenge/${challengeId}/solutions`}
            className="bg-gray-300 p-2 mr-4 mb-5"
          >
            Solutions
          </Link>
          <button className="bg-gray-300 p-2 mb-5">button3</button>
        </div>

        <div className=" w-80v md:w-95v sm:w-95v flex flex-col items-center justify-center">
          {solutions.map(solution => (
            <div
              key={solution.solution_id}
              className="border-4 rounded w-70per md:w-full sm:w-full flex p-4 md:flex-col sm:flex-col mb-4"
            >
              <div className="flex flex-col mb-2 mr-1">
                <div className="border h-50 w-50 bg-red-600 text-center mb-1">
                  image
                </div>

                <div>username</div>
                <div></div>
              </div>
              <div className="">
                <div className="mb-3">
                  <h1>{solution.title}</h1>
                  <div className='my-10'>
                    {!solution.description ? null : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            getTruncatedContentState(
                              JSON.parse(solution.description)
                            )
                          )
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap justify-center">
                  <button className="mr-2 bg-gray-300 px-2">update</button>
                  <button className="bg-gray-300 px-2">comment</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5 mb-10">
          <button
            className="text-lg text-red-700 font-bold"
            onClick={() => setPageNo(pageNo+1)}
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
