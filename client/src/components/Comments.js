import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comments = ({
  comments,
  commentText,
  setCommentText,
  onClick,
  success
}) => {
  return (
    <div className="mt-10 mb-20">
      <h1 className=" text-lg ">Comments : </h1>
      <div className=" border-4 p-2  overflow-y-scroll">
        <textarea
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border-4 mt-2 p-3  w-full"
        />
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={onClick}
            className="bg-pink-700 text-white m-1 border-2 p-2 px-6"
          >
            Post Comment
          </button>
        </div>
        {!success ? null : (<p>Comment Done!</p>)}
        {comments.map((comment) => (
          <div key={comment.id} className="border-4 mt-2 p-3 flex flex-row">
            {/* DO CHECK ID AGAIN */}
            <div className="flex flex-col w-10per justify-center align-middle">
              <div className="w-full flex justify-center">
                <div className="bg-red-700 rounded-full h-20 w-20">
                  <FontAwesomeIcon
                    icon={faUser}
                    size="lg"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center">
                <div>{comment.user_id}</div>
              </div>
            </div>
            <div className=" w-90per  flex flex-col ">
              <div className="m-2 mb-1 border-2 h-14 ">
                {comment.comment_text}
              </div>
              <div className="ml-2 text-xs text-gray-600">
                Posted on {comment.posted_on}
              </div>
              <div>
                {/* <FontAwesomeIcon icon={faThumbsUp} size="2x" className=" p-1" /> */}
                <button className="bg-pink-700 text-white m-2 p-1 w-22 flex flex-row border-2">
                  <div> Upvote</div>
                  <div className="bg-white text-pink-700 rounded-2xl  mx-1">
                    12
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
