import draftToHtml from "draftjs-to-html";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { postTypeId } from "../../../constants";
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
    <MainLayout role="employee">
      <div className="flex items-center flex-col mx-10 my-10 min-h-screen">
        <div className="flex flex-col mb-1">
          <div className="h-30v flex items-center justify-center">
            <img
              className="object-fill h-full rounded-3xl"
              src={coverImage}
              alt="challenge cover"
            />
          </div>
        </div>
        <h1 className="my-5 flex justify-center font-serif text-4xl">
          {challenge.title}
        </h1>

        <div className="flex justify-between w-full mb-5">
          <div className="flex w-80v flex-wrap md:w-95v sm:w-95v w-4/5">
            <button
              className={`${
                tab == "overview" ? "border-2" : "border-b-2 hover:border-2"
              } border-black hover:scale-110 p-2 mr-2`}
              onClick={() => setTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${
                tab == "solutions" ? "border-2" : "border-b-2 hover:border-2"
              } border-black hover:scale-110 p-2 mx-2`}
              onClick={() => setTab("solutions")}
            >
              Solutions
            </button>
            <button
              className={`${
                tab == "create solution"
                  ? "border-2"
                  : "border-b-2 hover:border-2"
              } border-black hover:scale-110 p-2 mx-2`}
              onClick={() => setTab("create solution")}
            >
              Create solution
            </button>
          </div>
          <div className="flex w-full justify-end mr-2">
            {tab == "overview" && (
              context.auth.role == "super_admin" || 
              context.auth.id == challenge.user_id
              ? (
                <div className="flex">
                  <Link to={`/challenge/edit-challenge/${challengeId}`}>
                    <h2 className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 p-2">
                      Edit Challenge
                    </h2>
                  </Link>
                  <button
                    className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 p-2 ml-2"
                    onClick={() => {
                      if(confirm("Are you sure, you want to delete this challenge?"))
                        onDelete();
                    }}
                  >
                    Delete Challenge
                  </button>
                </div>
              ) : (
                <Like postId={challengeId} typeId={postTypeId["challenge"]} />
              )
            )}
          </div>
        </div>

        {tab == "overview" ? (
          <div className="w-full">
            <div className="w-full md:w-95v sm:w-95v border-2">
              <div>
                <h1 className="text-lg pl-2 pt-2 font-bold">Description</h1>
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
              <h1 className="text-lg pl-2 pt-2 font-bold">Tags</h1>
              <div className="flex flex-row p-2 ">
                {tags.map((tag) => {
                  return (
                    <div key={tag} className="bg-gray-400 rounded p-0.5 mr-1">
                      {tag}
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 pl-2 pt-2 flex items-center">
                <h1 className="text-lg font-bold">Cloud Provider</h1>
                <div className="ml-10">{challenge.cloud_provider}</div>
              </div>
              <div className="my-10 pl-2 pt-2 flex items-center">
                <h1 className="text-lg font-bold">Account Type</h1>
                <div className="ml-10">{challenge.accountName}</div>
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
    </MainLayout>
  );
};

export default Challenge;
