import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { monthNames } from "../../../constants";
import { downvoteComment, upvoteComment } from "../../utilities/api/comment";
import { DisplayPicture } from "../DisplayPicture";

const Comment = ({ typeId, comment }) => {
  const [isLiked, setIsLiked] = useState(!!comment.isUpvoted);
  const [totalLikes, setTotalLikes] = useState(comment.totalUpvotes || 0);
  const [postedOn, setPostedOn] = useState("");

  useEffect(() => {
    const temp = new Date(comment.posted_on)
    setPostedOn(
      temp.getDate() + " " + monthNames[temp.getMonth()] + " " +
      temp.getFullYear() + " " +
      temp.toISOString().split("T")[1].split(".")[0]
    );
  }, [])

  const upvote = () => {
    if (!isLiked) {
      upvoteComment(comment.comment_id, typeId)
        .then(() => {
          setIsLiked(true);
          setTotalLikes(totalLikes + 1);
        })
        .catch((e) => console.log(e.response));
    } else {
      downvoteComment(comment.comment_id, typeId)
        .then(() => {
          setIsLiked(false);
          setTotalLikes(totalLikes - 1);
        })
        .catch((e) => console.log(e.response));
    };
  };

  return (
    <div className="flex xs:flex-col xs:items-center border-2 mt-2 p-3 xs:px-1">
      <div className="flex flex-col justify-center w-32 align-middle">
        <div className="flex justify-center w-full mb-3">
          <div className="border-4 rounded-full">
            <DisplayPicture
              displayPicture={comment.display_picture}
              size="3x"
              boxSize={20}
            />
          </div>
        </div>
        <div className="text-center w-full">
          <p>{comment.employee_name}</p>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="m-2 mb-1 sm:text-sm">
          {comment.comment_text}
        </div>
        <div className="ml-2 text-sm text-gray-400">
          Posted on {postedOn}
        </div>
        <div>
          <div className="flex flex-row border-2 m-2 p-1 w-fit">
            <FontAwesomeIcon
              icon={faThumbsUp}
              size="1x"
              className={`cursor-pointer ${isLiked
                ? "text-green-700"
                : "text-pink-700"
              } p-1`}
              onClick={upvote}
            />
            <p>Upvote</p>
            <div className="text-gray-400 rounded-2xl mx-1 px-1">
              {totalLikes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
