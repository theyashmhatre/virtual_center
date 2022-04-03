import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getSingleChallenge } from "../../utilities/api/challenge";
import { apiURL } from "../../../constants";

const Challenge = () => {
  const [challenge, setChallenge] = useState({});
  const { challengeId } = useParams();

  useEffect(() => {
    if (challengeId)
      getSingleChallenge(challengeId)
        .then(({ data }) => setChallenge(data))
        .catch(() => {});
  }, []);
  
  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col mx-40 mb-20">
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
          <button className="bg-gray-300 p-2 mr-4 mb-5">
            Challenge overview
          </button>
          <Link
            to={`/challenge/${challengeId}/solutions`}
            className="bg-gray-300 p-2 mr-4 mb-5"
          >
            Solutions
          </Link>
          <button className="bg-gray-300 p-2 mb-5">button3</button>
        </div>

        <div className="w-80v md:w-95v sm:w-95v">
          <h1 className="mb-5">{challenge.title}</h1>
          <div className="md:w-full sm:w-full w-60v mb-10">
            {!challenge.description ? null : (
              <div
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(JSON.parse(challenge.description))
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Challenge;
