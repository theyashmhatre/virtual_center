import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Solutions from "../../components/Solutions";
import { getSingleChallenge } from "../../utilities/api/challenge";
import { apiURL } from "../../../constants";
import challenge_cover from "../../../public/challenge_cover.png";

const Challenge = () => {
  const [challenge, setChallenge] = useState({});
  const [tab, setTab] = useState("overview");
  const { challengeId } = useParams();

  useEffect(() => {
    if (challengeId)
      getSingleChallenge(challengeId)
        .then(({ data }) => {
          console.log(data);
          setChallenge(data);
        })
        .catch(() => {});
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
        <h1 className="mb-5 flex justify-center font-serif text-4xl">
          {challenge.title}
        </h1>
        
        <div className="flex justify-start w-full">
          <div className="flex w-80v flex-wrap md:w-95v sm:w-95v">
            <button
              className="bg-gray-300 p-2 mb-1 border-white border-x"
              onClick={() => setTab("overview")}
            >
              Overview
            </button>
            <button
              className="bg-gray-200 p-2 mb-1"
              onClick={() => setTab("solutions")}
            >
              Solutions
            </button>
            <button
              className="bg-gray-200 p-2 mb-1"
              onClick={() => setTab("comments")}
            >
              Comments
            </button>
          </div>
        </div>

        {tab == "overview" ? (
          <div className=" w-full md:w-95v sm:w-95v  border-2 ">
            <h1 className="text-lg pl-2 pt-2 font-bold ">Abstract</h1>
            <div className="md:w-full sm:w-full w-60v mb-10 p-2">
              {!challenge.description ? null : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: draftToHtml(JSON.parse(challenge.description)),
                  }}
                />
              )}
              lorem ipsum loremlorem ipsum loremlorem ipsum loremlorem ipsum
              loremlorem ipsum lorem lorem ipsum loremlorem ipsum loremlorem ipsum
              loremlorem ipsum loremlorem ipsum lorem lorem ipsum loremlorem ipsum
              loremlorem ipsum loremlorem ipsum loremlorem ipsum lorem lorem ipsum
              loremlorem ipsum loremlorem ipsum loremlorem ipsum loremlorem ipsum
              loremlorem ipsum loremlorem ipsum loremlorem ipsum loremlorem ipsum
              loremlorem ipsum loremlorem ipsum loremlorem ipsum loremlorem ipsum
              loremlorem ipsum loremlorem ipsum loremlorem ipsum loremlorem ipsum
              loremlorem ipsum loremlorem ipsum loremlorem ipsum loremlorem ipsum
              lorem lorem ipsum loremlorem ipsum loremlorem ipsum loremlorem ipsum
              loremlorem ipsum lorem loremlorem ipsum lorem loremlorem ipsum lorem
            </div>
          </div>
        ) : tab == "solutions" ? (
          <Solutions />
        ) : tab == "comments" ? (
          <div></div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default Challenge;
