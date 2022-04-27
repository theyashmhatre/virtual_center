import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { postTypeId } from "../../../constants";
import { Attachment } from "../../components/Attachement";
import Comments from "../../components/Comments";
import { Like } from "../../components/Like";
import MainLayout from "../../layouts/MainLayout";
import { getSingleOffering } from "../../utilities/api/offering";

const Offering = () => {
  const [offering, setOffering] = useState({});
  const { offeringId } = useParams();

  useEffect(() => {
    if (offeringId)
      getSingleOffering(offeringId)
        .then(({ data }) => {
          setOffering(data);
        })
        .catch(() => {});
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
                <Like postId={offeringId} typeId={postTypeId["offering"]} />
                <Attachment attachmentData={offering.attachment} />
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

          <Comments typeId={postTypeId["offering"]} postId={offeringId} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Offering;
