import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { postTypeId, roleIds } from "../../../constants";
import { Attachment } from "../../components/Attachement";
import Comments from "../../components/Comments";
import { Like } from "../../components/Like";
import MainLayout from "../../layouts/MainLayout";
import { getSingleSolution } from "../../utilities/api/solution";


const Solution = () => {
  const [solution, setSolution] = useState({});
  const { solutionId } = useParams();

  useEffect(() => {
    if (solutionId)
      getSingleSolution(solutionId)
        .then(({ data }) => {
          setSolution(data);
        })
        .catch(() => {});
  }, []);
  
  return (
    <MainLayout role={roleIds["user"]}>
      <div className="mx-16">
        <div className="mb-5">
          <div className="w-80v md:w-95v sm:w-95v">
            <div className="mt-10 flex flex-row">
              <h1 className="font-mono font-semibold text-4xl w-4/5">
                {solution.title}
              </h1>
              <div className="flex justify-end items-center w-full">
                <Like postId={solutionId} typeId={postTypeId["solution"]} />
                <Attachment attachmentData={solution.attachment} />
              </div>
            </div>
            <div>
              <h1>Shubham Patil</h1>
              <h1> patil@tcs.com </h1>
            </div>
            <h1 className="text-lg  pt-2 font-bold mt-2">Team Members</h1>
            <div className="flex flex-row">
              <div className="bg-gray-400 rounded p-0.5 mr-1"> 2292394</div>
            </div>
            <h1 className="text-lg pt-2 font-bold mt-2">Description</h1>
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
        <Comments typeId={postTypeId["solution"]} postId={solutionId} />
      </div>
    </MainLayout>
  );
};

export default Solution;
