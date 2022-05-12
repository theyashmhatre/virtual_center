import draftToHtml from "draftjs-to-html";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { postTypeId, roleIds } from "../../../constants";
import { Attachment } from "../../components/Attachement";
import Comments from "../../components/Comments";
import { Like } from "../../components/Like";
import { UserCard } from "../../components/UserCard";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import {
  getSingleSolution,
  getTeamMembers
} from "../../utilities/api/solution";

const Solution = () => {
  const [solution, setSolution] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const { solutionId } = useParams();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (solutionId) {
      getSingleSolution(solutionId)
        .then(({ data }) => {
          setSolution(data);
        })
        .catch(() => {});
      
      getTeamMembers(solutionId)
        .then(({ data }) => {
          if (data.teamSize)
            setTeamMembers(data.teamMembers)
        })
        .catch(() => {});
    }
  }, []);

  return (
    <MainLayout role={roleIds["user"]}>
      <div className="min-h-screen my-10 mx-32 lg:mx-24 md:mx-16 sm:mx-10 xs:mx-5">
        <div>
          <div className="my-5 text-center">
            <h1 className="font-mono font-semibold text-4xl sm:text-3xl">
              {solution.title}
            </h1>
          </div>
          <div className="my-5 flex sm:flex-col justify-between">
            <div className="flex items-center">
              <Like postId={solutionId} typeId={postTypeId["solution"]} />
              <Attachment attachmentData={solution.attachment} />
            </div>
            <div className="flex justify-end items-center sm:mt-5">
              {solution.email !== context.auth.email ? null : (
                <div className="flex ml-2">
                  <Link to={`/challenge/edit-solution/${solutionId}`}>
                    <h2 className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 w-fit p-2">
                      Edit Solution
                    </h2>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-lg pt-2 font-bold mt-2">Owner</h1>
            <div className="w-fit">
              <UserCard
                name={solution.employee_name}
                email={solution.email}
                displayPicture={solution.display_picture}
              />
            </div>
          </div>
          {!teamMembers.length ? null : (
            <div>
              <h1 className="text-lg pt-2 font-bold mt-2">Team Members</h1>
              <div className="flex flex-row">
                {teamMembers.map((member, index) => {
                  if (member.email === solution.email)
                    return null
                  return (
                    <div key={index} className="mr-4">
                      <UserCard
                        name={member.employee_name}
                        email={member.email}
                        displayPicture={member.display_picture}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div>
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
