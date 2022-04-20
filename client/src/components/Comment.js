import { faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { downvoteChallengeComment, upvoteChallengeComment } from "../utilities/api/challenge";
import { downvoteOfferingComment, upvoteOfferingComment } from "../utilities/api/offering";
import { downvoteSolutionComment, upvoteSolutionComment } from "../utilities/api/solution";
import { apiURL } from "../../constants";

const Comment = ({ type, comment }) => {
  const [isLiked, setIsLiked] = useState(!!comment.isLiked);
  const [totalLikes, setTotalLikes] = useState(comment.totalLikes || 0);

  const upvote = () => {
    if (!isLiked) {
      let upvoteComment;
      if (type == "solution") upvoteComment = upvoteSolutionComment;
      else if (type == "offering") upvoteComment = upvoteOfferingComment;
      else if (type == "challenge") upvoteComment = upvoteChallengeComment;
      else return;

      upvoteComment(comment.comment_id)
        .then(() => {
          setIsLiked(true);
          setTotalLikes(totalLikes + 1);
        })
        .catch((e) => console.log(e.response));
    } else {
      let downvoteComment;
      if (type == "solution") downvoteComment = downvoteSolutionComment;
      else if (type == "offering") downvoteComment = downvoteOfferingComment;
      else if (type == "challenge") downvoteComment = downvoteChallengeComment;
      else return;
      
      downvoteComment(comment.comment_id)
        .then(() => {
          setIsLiked(false);
          setTotalLikes(totalLikes - 1);
        })
        .catch((e) => console.log(e.response));
    };
  };

  return (
    <div className="border-4 mt-2 p-3 flex flex-row">
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
          <button
            className={`flex flex-row border-2 ${isLiked
              ? "bg-green-700"
              : "bg-pink-700"
            } text-white m-2 p-1 w-22`}
            onClick={upvote}
          >
            <div>Upvote</div>
            <FontAwesomeIcon icon={faThumbsUp} size="1x" className=" p-1" />
            <div className="bg-white text-pink-700 rounded-2xl mx-1 px-1">
              {totalLikes}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
