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
      temp.getDate() +
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
      className="flex flex-col border-2 m-3 w-96"
    >
      <div className="h-52">
        <img
          className="object-fill h-full w-full"
          src={coverImage}
          alt="challenge cover"
        />
      </div>
      <div className="h-full border-gray-500 border-2 flex flex-col justify-between p-3">
        <div className="font-bold">
          <h2>{challenge.title}</h2>
        </div>
        <div className="flex items-center my-4">
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
        <div className="flex items-center">
          <button className="bg-pink-700 px-1 rounded mr-2">
            Open
          </button>
          <p>Until {endDate}</p>
        </div>
        <div className="flex flex-wrap my-3">
          {tags.map((tag) => {
            return (
              <div
                key={tag}
                className="bg-gray-400 rounded p-0.5 m-1"
              >
                {tag}
              </div>
            );
          })}
          {totalTags > 3 ? (
            <div className="bg-gray-400 rounded p-0.5 m-1">
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
