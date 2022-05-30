import draftToHtml from "draftjs-to-html";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { postTypeId, roleIds } from "../../../constants";
import Comments from "../../components/Comments";
import { Like } from "../../components/Like";
import CreateSolution from "../../components/Solutions/CreateSolution";
import Solutions from "../../components/Solutions/Solutions";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import { deleteChallenge, getSingleChallenge } from "../../utilities/api/challenge";

const Challenge = () => {
  const [challenge, setChallenge] = useState({});
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState([]);
  const [tab, setTab] = useState("overview");
  const { challengeId } = useParams();
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (challengeId)
      getSingleChallenge(challengeId)
        .then(({ data }) => {
          if (data.cover_image)
            new Blob(
              [new Uint8Array(data.cover_image.data)],
              {type: ".png"}
            )
              .text()
              .then((result) => setCoverImage(result));
          
          if (data.tags)
            setTags(data.tags.split(","));
          setChallenge(data);
        })
        .catch(() => {});
  }, []);
  
  const onDelete = () => {
    deleteChallenge(challengeId)
      .then(() => navigate("/challenge/challenges"))
      .catch((error) => console.log(error));
  };
  
  return (
    <MainLayout role={roleIds["user"]}>
      <div className="min-h-screen">
        <div className="mb-4">
          <div className="h-30v">
            <img
              className="w-full h-full"
              src={coverImage}
              alt="challenge cover"
            />
          </div>
          <div className="bg-gray-200 w-full">
            <h1 className="text-center text-4xl sm:text-3xl py-3">
              {challenge.title}
            </h1>
          </div>
        </div>

        <div className="mx-24 md:mx-16 sm:mx-10 xs:mx-5 my-10">
          <div className="flex sm:flex-col justify-between xs:text-sm w-full mb-5">
            <div className="flex sm:flex-wrap items-start sm:mb-5">
              <button
                className={`text-lg sm:text-sm font-medium ${
                  tab == "overview" ? "border-b-4" : "hover:border-b-4"
                } border-pink-800 p-2 mr-2 mt-1`}
                onClick={() => setTab("overview")}
              >
                Overview
              </button>
              <button
                className={`text-lg sm:text-sm font-medium ${
                  tab == "solutions" ? "border-b-4" : "hover:border-b-4"
                } border-pink-800 p-2 mr-2 mt-1`}
                onClick={() => setTab("solutions")}
              >
                Solutions
              </button>
              <button
                className={`text-lg sm:text-sm font-medium ${
                  tab == "create solution"
                    ? "border-b-4"
                    : "hover:border-b-4"
                } border-pink-800 p-2 mr-2 mt-1`}
                onClick={() => setTab("create solution")}
              >
                Create solution
              </button>
            </div>
            <div className="flex justify-end ml-2">
              {tab == "overview" && (
                context.auth.role == roleIds["super_admin"] || 
                context.auth.id == challenge.user_id
                ? (
                  <div className="flex">
                    <Link to={`/challenge/edit-challenge/${challengeId}`}>
                      <h2 className="border-2 border-gray-300 hover:scale-110 text-center text-pink-700 font-medium py-2 px-5 sm:px-2 mt-1">
                        Edit Challenge
                      </h2>
                    </Link>
                    <div>
                      <button
                        className="border-2 border-gray-300 hover:scale-110 text-center text-pink-700 font-medium py-2 px-5 sm:px-2 ml-2 mt-1"
                        onClick={() => {
                          if(confirm("Are you sure, you want to delete this challenge?"))
                            onDelete();
                        }}
                      >
                        Delete Challenge
                      </button>
                    </div>
                  </div>
                ) : (
                  <Like postId={challengeId} typeId={postTypeId["challenge"]} />
                )
              )}
            </div>
          </div>

          {tab == "overview" ? (
            <div className="w-full">
              <div className="w-full md:w-95v sm:w-95v border-2 p-2">
                <div>
                  <h1 className="text-lg pl-2 pt-2 font-medium">Description</h1>
                  <div className="md:w-full sm:w-full w-60v mb-2 p-2">
                    {!challenge.description ? null : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(JSON.parse(challenge.description)),
                        }}
                      />
                    )}
                    <br />
                  </div>
                </div>
                <h1 className="text-lg pl-2 pt-2 font-medium">Tags</h1>
                <div className="flex flex-row flex-wrap p-2">
                  {tags.map((tag) => {
                    return (
                      <div key={tag} className="bg-gray-200 rounded py-1 px-4 sm:px-2 my-1 mr-1">
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10 pl-2 pt-2 flex xs:flex-col items-center xs:items-start">
                  <h1 className="text-lg font-medium">Cloud Provider</h1>
                  <div className="text-gray-400 ml-10 xs:ml-0">{challenge.cloud_provider}</div>
                </div>
                <div className="my-10 pl-2 pt-2 flex xs:flex-col items-center xs:items-start">
                  <h1 className="text-lg font-medium">Account Type</h1>
                  <div className="text-gray-400 ml-10 xs:ml-0">{challenge.accountName}</div>
                </div>
              </div>
              <Comments typeId={postTypeId["challenge"]} postId={challengeId} />
            </div>
          ) : tab == "solutions" ? (
            <Solutions />
          ) : tab == "create solution" ? (
            <CreateSolution />
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenge;
