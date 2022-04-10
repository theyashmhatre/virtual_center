import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comments from "../../components/Comments";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  getSingleSolution,
  getComments,
  postComment,
} from "../../utilities/api/solution";

const Solution = () => {
  const [solution, setSolution] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [postSuccess, setPostSuccess] = useState(false);
  const { solutionId } = useParams();

  useEffect(() => {
    if (solutionId)
      getSingleSolution(solutionId)
        .then(({ data }) => setSolution(data))
        .catch(() => {});
  }, []);

  useEffect(() => {
    if (solutionId)
      getComments(solutionId, pageNo)
        .then(({ data }) => {
          setComments(data.comments);
          setPostSuccess(false);
        })
        .catch((e) => {
          console.log(e.response);
        });
  }, [postSuccess]);

  const onPost = () => {
    postComment(solutionId, commentText)
      .then(() => setPostSuccess(true))
      .catch(() => {});
  };

  return (
    <div>
      <Navbar />
      <div className="mx-16">
        <div className="mb-5">
          <div className="w-80v md:w-95v sm:w-95v">
            <div className="mt-10">
              <h1 className=" font-mono font-semibold text-4xl">
                {solution.title}
              </h1>
            </div>
            <div>
              <h1>Shubham Patil</h1>
              <h1> patil@tcs.com </h1>
            </div>
            <div className="md:w-full sm:w-full w-60v mt-10 border-2 p-4">
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
        <Comments
          comments={comments}
          commentText={commentText}
          setCommentText={setCommentText}
          onClick={onPost}
          success={postSuccess}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Solution;
