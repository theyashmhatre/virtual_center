import { faAngleRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getComments, postComment } from "../../utilities/api/comment";
import Comment from "./Comment";

const Comments = ({ typeId, postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [moreCommentsAvlbl, setMoreCommentsAvlbl] = useState(true);
  const [success, setSuccess] = useState(false);
  const limit = 5;
  
  const onPost = () => {
    postComment(postId, typeId, commentText)
      .then(() => {
        setCommentText("");
        setSuccess(true);
      })
      .catch(() => {});
  };

  const getCommentsFunction = (page) => {
    setLoading(true);
    getComments(postId, typeId, page, limit)
      .then(({ data }) => {
        if (data.comments_count)
          setComments((prevComments) => [...prevComments, ...data.comments_list]);
        
        setLoading(false);
        setSuccess(false);
        if (!data.comments_count || data.comments_count < limit)
          setMoreCommentsAvlbl(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }
  
  useEffect(() => {
    if (!moreCommentsAvlbl || !postId) return;
    if (success) return;

    getCommentsFunction(pageNo);
  }, [pageNo]);

  useEffect(() => {
    if (!success || !postId) return;

    setComments([]);
    setPageNo(1);
    setMoreCommentsAvlbl(true);

    getCommentsFunction(1);
  }, [success]);

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg font-medium">Comments</h1>
      <div className="mt-3">
        <textarea
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border-2 mt-2 p-3 w-full"
        />
        <div className="w-full flex flex-row justify-end mb-8">
          <button
            onClick={onPost}
            className="bg-pink-700 text-white rounded mt-2 p-2 px-6"
          >
            Post Comment
          </button>
        </div>
        {comments.map((comment) => (
          <Comment key={comment.comment_id} typeId={typeId} comment={comment} />
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
        {!moreCommentsAvlbl ? null : (
          <div className="flex justify-end m-2">
            <button
              className="flex items-center text-pink-700 font-medium cursor-pointer hover:scale-110 duration-150"
              onClick={() => setPageNo(pageNo+1)}
            >
              View More Comments
              <FontAwesomeIcon
                icon={faAngleRight}
                className="ml-2"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
