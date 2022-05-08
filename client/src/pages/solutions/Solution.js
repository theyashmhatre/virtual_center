import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { postTypeId, roleIds } from "../../../constants";
import { Attachment } from "../../components/Attachement";
import Comments from "../../components/Comments";
import { Like } from "../../components/Like";
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
                {solution.email !== context.auth.email ? null : (
                  <div className="flex ml-2">
                    <Link to={`/challenge/edit-solution/${solutionId}`}>
                      <h2 className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 p-2">
                        Edit Solution
                      </h2>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-lg pt-2 font-bold mt-2">Owner</h1>
              <div className="flex flex-col rounded-lg shadow-lg border-2 w-fit py-2 px-10 my-4">
                <p className="font-semibold flex justify-center align-bottom">
                  <FontAwesomeIcon
                    icon={faUser}
                    size="sm"
                    className="p-1"
                  />
                  {solution.employee_name}
                </p>
                <div>
                  <div className="flex justify-center">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size="lg"
                      className=" p-1"
                    />
                    <p className="font-serif">{solution.email}</p>
                  </div>
                </div>
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
                      <div
                        key={index}
                        className="flex flex-col rounded-lg shadow-lg border-2 w-fit py-2 px-10 my-4 mr-4"
                      >
                        <p className="font-semibold flex justify-center align-bottom">
                          <FontAwesomeIcon
                            icon={faUser}
                            size="sm"
                            className="p-1"
                          />
                          {member.employee_name}
                        </p>
                        <div>
                          <div className="flex justify-center">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              size="lg"
                              className=" p-1"
                            />
                            <p className="font-serif">{member.email}</p>
                          </div>
                        </div>
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
        </div>
        <Comments typeId={postTypeId["solution"]} postId={solutionId} />
      </div>
    </MainLayout>
  );
};

export default Solution;
