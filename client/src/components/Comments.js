import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Comment from "./Comment";
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
          <Comment key={comment.comment_id} type={type} comment={comment} />
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
