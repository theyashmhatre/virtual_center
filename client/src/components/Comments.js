import { faSpinner, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getChallengeComments, postChallengeComment } from "../utilities/api/challenge";
import { getOfferingComments, postOfferingComment } from "../utilities/api/offering";
import { getSolutionComments, postSolutionComment } from "../utilities/api/solution";

const Comments = ({ type, id }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [moreCommentsAvlbl, setMoreCommentsAvlbl] = useState(true);
  const [success, setSuccess] = useState(false);
  const limit = 5;
  
  const onPost = () => {
    let postComment;
    if (type == "solution") postComment = postSolutionComment;
    else if (type == "offering") postComment = postOfferingComment;
    else if (type == "challenge") postComment = postChallengeComment;
    else return;

    postComment(id, commentText)
      .then(() => setSuccess(true))
      .catch(() => {});
  };

  const getCommentsFunction = (page) => {
    setLoading(true);
    let getComments;
    if (type == "solution") getComments = getSolutionComments;
    else if (type == "offering") getComments = getOfferingComments;
    else if (type == "challenge") getComments = getChallengeComments;
    else return;

    getComments(id, page, limit)
      .then(({ data }) => {
        console.log(data);
        if (data.comments_count)
          setComments((prevComments) => [...prevComments, ...data.comments_list]);
        
        setLoading(false);
        setSuccess(false);
        if (!data.comments_count || data.comments_count < limit)
          setMoreCommentsAvlbl(false);
      })
      .catch((e) => {
        console.log(e.response);
        setLoading(false);
      });
  }
  
  useEffect(() => {
    if (!moreCommentsAvlbl || !id) return;
    if (success) return;

    getCommentsFunction(pageNo);
  }, [pageNo]);

  useEffect(() => {
    if (!success || !id) return;

    setComments([]);
    setPageNo(1);
    setMoreCommentsAvlbl(true);

    getCommentsFunction(1);
  }, [success]);

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg">Comments : </h1>
      <div className="border-4 p-2 overflow-y-scroll">
        <textarea
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border-4 mt-2 p-3 w-full"
        />
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={onPost}
            className="bg-pink-700 text-white m-1 border-2 p-2 px-6"
          >
            Post Comment
          </button>
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className="border-4 mt-2 p-3 flex flex-row">
            {/* DO CHECK ID AGAIN */}
            <div className="flex flex-col w-10per justify-center align-middle">
              <div className="w-full flex justify-center mb-3">
                <div className="bg-gray-200 border-2 rounded-full h-20 w-20">
                  {!comment.display_picture ? (
                    <FontAwesomeIcon
                      icon={faUser}
                      size="3x"
                      className=" pl-4 pt-2"
                    />
                  ) : (
                    <img
                      className="object-fill h-full rounded-3xl"
                      src={apiURL + "/public/images/" + comment.display_picture}
                      alt="User Picture"
                    />
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center">
                <p>{comment.employee_name}</p>
              </div>
            </div>
            <div className="w-90per flex flex-col">
              <div className="m-2 mb-1 border-2 h-14">
                {comment.comment_text}
              </div>
              <div className="ml-2 text-xs text-gray-600">
                Posted on {comment.posted_on}
              </div>
              <div>
                <button className="bg-pink-700 text-white m-2 p-1 w-22 flex flex-row border-2">
                  <div>Upvote</div>
                  <FontAwesomeIcon icon={faThumbsUp} size="1x" className=" p-1" />
                  <div className="bg-white text-pink-700 rounded-2xl mx-1 px-1">
                    {comment.totalLikes}
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
        {moreCommentsAvlbl && loading ? (
          <div className="flex justify-center w-full my-20">
            <FontAwesomeIcon
              icon={faSpinner}
              size="4x"
              color="pink"
              spin={true}
            />
          </div>
        ) : null}
        <div className="flex justify-end m-2">
          <button
            className="text-pink-500 cursor-pointer hover:scale-110 duration-150"
            onClick={() => setPageNo(pageNo+1)}
          >
            View More Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
