import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTruncatedContentState } from "../../utilities/utils";
import { monthNames } from "../../../constants";

const ChallengeCard = ({ challenge }) => {
  const [endDate, setEndDate] = useState();
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState([]);
  const [totalTags, setTotalTags] = useState([]);

  useEffect(() => {
    new Blob(
      [new Uint8Array(challenge.cover_image.data)],
      {type: ".png"}
    )
      .text()
      .then((result) => setCoverImage(result));
    
    const temp = new Date(challenge.end_date);
    setEndDate(
      temp.getDate()-1 +
      " " +
      monthNames[temp.getMonth()] +
      " " +
      temp.getFullYear()
    );

    let tagArr = challenge.tags.split(",");
    const totalTags = tagArr.length;
    if (totalTags > 3) tagArr = tagArr.splice(totalTags - 3);
    setTags(tagArr);
    setTotalTags(totalTags);
  }, []);

  return (
    <div
      className="border-2 h-70v lg:mb-0 mb-4 mr-3 w-24per md:w-1/2 sm:w-2/3 xs:w-5/6"
    >
      <div className="h-40per">
        <img
          className="object-fill h-full w-full"
          src={coverImage}
          alt="challenge cover"
        />
      </div>
      <div className="h-60per border-gray-500 border-2 flex flex-col justify-between p-3">
        <div className="h-25per flex items-center">
          <h2>{challenge.title}</h2>
        </div>
        <div className="h-10per flex items-center">
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(
                getTruncatedContentState(
                  JSON.parse(challenge.description)
                )
              ),
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className=" flex items-center mb-1">
            <button className="bg-pink-700 px-1 rounded mr-2">
              Open
            </button>
            <p>Until {endDate}</p>
          </div>
        </div>
        <div className="flex flex-row">
          {tags.map((tag) => {
            return (
              <div
                key={tag}
                className="bg-gray-400 rounded p-0.5 mr-1"
              >
                {tag}
              </div>
            );
          })}
          {totalTags > 3 ? (
            <div className="bg-gray-400 rounded p-0.5 mr-1">
              +{totalTags - 3}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <Link to={`/challenge/${challenge.challenge_id}`}>
            <h2 className="text-center text-pink-700">
              View challenge
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
