import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comments from "../../components/Comments";
import MainLayout from "../../layouts/MainLayout";
import {
  getSingleOffering,
  getTotalLikes,
  likeOffering
} from "../../utilities/api/offering";

const Offering = () => {
  const [offering, setOffering] = useState({});
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { offeringId } = useParams();

  useEffect(() => {
    if (offeringId) {
      getSingleOffering(offeringId)
        .then(({ data }) => {
          setOffering(data);
        })
        .catch(() => {});

      getTotalLikes(offeringId)
        .then(({ data }) => {
          setTotalLikes(data.totalLikes);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-center">
        <div className="w-90v  flex flex-col">
          <div className="flex justify-start flex-wrap mt-5">
            <button className="bg-gray-300 p-2 mr-2 mb-2"> overview</button>
            <button className="bg-gray-300 p-2 mb-2">Analytics</button>
          </div>

          <div className="mt-10">
            <h1 className=" font-mono font-semibold text-4xl ">
              {offering.title}
            </h1>
          </div>

          <div>
            <div className="flex flex-row w-full">
              <h1 className=" w-40">{offering.owner_name}</h1>
              <div className="flex justify-end w-full">
                <div className="bg-green-500 text-white rounded-2xl mx-2 py-1 px-2">
                  {totalLikes}
                </div>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  size="2x"
                  className="cursor-pointer"
                  color={isLiked ? "green" : "black"}
                  onClick={() => {
                    likeOffering(offeringId)
                      .then(() => {
                        if (!isLiked) {
                          setIsLiked(true)
                          setTotalLikes(totalLikes+1)
                        } else {
                          setIsLiked(false)
                          setTotalLikes(totalLikes-1)
                        }
                      })
                      .catch(() => {})
                  }}
                />
                <button className="bg-pink-600 text-white ml-4 px-1 rounded">
                  View Attachment
                  <FontAwesomeIcon icon={faPaperclip} className="p-0 pl-1" />
                </button>
              </div>
            </div>
            <h1> {offering.owner_email} </h1>
          </div>

          <div className="mt-5">
            <div className="border-4 mt-2 p-3">
              {offering.description && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: draftToHtml(JSON.parse(offering.description)),
                  }}
                />
              )}
            </div>
          </div>

          <Comments typeId={3} id={offeringId} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Offering;
