import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
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
          setChallenge(data);
        })
        .catch(() => {});
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col mx-10 mb-10 min-h-screen">
        <div className="flex flex-col mb-1">
          <div className="h-30v flex items-center justify-center">
            <img
              className="object-fill h-full rounded-3xl"
              src={
                !challenge.cover_image
                  ? challenge_cover
                  : apiURL + "/public/images/" + challenge.cover_image
              }
              alt="challenge cover"
            />
          </div>
        </div>
        <h1 className="my-5 flex justify-center font-serif text-4xl">
          {challenge.title}
        </h1>
        
        <div className="flex justify-between w-full mb-5">
          <div className="flex w-80v flex-wrap md:w-95v sm:w-95v">
            <button
              className={`${tab == "overview" ? "border-2" : "border-b-2 hover:border-2"} border-black hover:scale-110 p-2 mr-2`}
              onClick={() => setTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${tab == "solutions" ? "border-2" : "border-b-2 hover:border-2"} border-black hover:scale-110 p-2 mx-2`}
              onClick={() => setTab("solutions")}
            >
              Solutions
            </button>
          </div>
          
          {tab == "solutions" ? (
            <div className="flex justify-end">
              <Link to={`/challenge/${challengeId}/create-solution`}>
                <h2 className="border-b-2 hover:border-2 border-black hover:scale-110 text-center text-pink-700 p-2">
                  Create solution
                </h2>
              </Link>
            </div>
          ) : null}
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
