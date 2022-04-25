import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comments from "../../components/Comments";
import MainLayout from "../../layouts/MainLayout";
import {
  getSingleSolution,
  getTotalLikes,
  likeSolution
} from "../../utilities/api/solution";


const Solution = () => {
  const [solution, setSolution] = useState({});
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { solutionId } = useParams();

  useEffect(() => {
    if (solutionId) {
      getSingleSolution(solutionId)
        .then(({ data }) => setSolution(data))
        .catch(() => {});
      
      getTotalLikes(solutionId)
        .then(({ data }) => {
          setIsLiked(data.isLiked);
          setTotalLikes(data.noOfLikes);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <MainLayout>
      <div className="mx-16">
        <div className="mb-5">
          <div className="w-80v md:w-95v sm:w-95v">
            <div className="mt-10 flex flex-row">
              <h1 className="font-mono font-semibold text-4xl w-4/5">
                {solution.title}
              </h1>
              <div className="flex w-full justify-end mr-2">
                <div className="bg-green-500 text-white rounded-2xl mx-2 py-1 px-2 h-fit">
                  {totalLikes}
                </div>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  size="2x"
                  className="cursor-pointer"
                  color={isLiked ? "green" : "black"}
                  onClick={() => {
                    likeSolution(solutionId)
                      .then(() => {
                        if (!isLiked) {
                          setIsLiked(true)
                          setTotalLikes(totalLikes+1)
                        } else {
                          setIsLiked(false)
                          setTotalLikes(totalLikes-1)
                        }
                      })
                      .catch(() => {})
                  }}
                />
              </div>
            </div>
            <div>
              <h1>Shubham Patil</h1>
              <h1> patil@tcs.com </h1>
            </div>
            <h1 className="text-lg  pt-2 font-bold mt-2">Team Members</h1>
            <div className="flex flex-row">
              <div className="bg-gray-400  rounded p-0.5 mr-1"> 2292394</div>
            </div>
            <h1 className="text-lg  pt-2 font-bold mt-2">Description</h1>
            <div className="md:w-full sm:w-full w-60v  border-2 p-4">
              {!solution.description ? null : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: draftToHtml(JSON.parse(solution.description)),
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <Comments type="solution" id={solutionId} />
      </div>
    </MainLayout>
  );
};

export default Solution;
