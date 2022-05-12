import draftToHtml from "draftjs-to-html";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { postTypeId, roleIds } from "../../../constants";
import { Attachment } from "../../components/Attachement";
import Comments from "../../components/Comments";
import { Like } from "../../components/Like";
import { UserCard } from "../../components/UserCard";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import {
  deleteOffering,
  getSingleOffering,
} from "../../utilities/api/offering";

const Offering = () => {
  const [offering, setOffering] = useState({});
  const [tab, setTab] = useState("overview");
  const { offeringId } = useParams();
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (offeringId)
      getSingleOffering(offeringId)
        .then(({ data }) => {
          setOffering(data);
        })
        .catch(() => {});
  }, []);

  const onDelete = () => {
    deleteOffering(offeringId)
      .then(() => navigate("/main/offerings"))
      .catch((error) => console.log(error));
  };

  return (
    <MainLayout role={roleIds["user"]}>
      <div className="min-h-screen mx-28 lg:mx-20 md:mx-16 sm:mx-10 xs:mx-5 my-10">
        <div className="my-10">
          <div className="my-5 text-center">
            <h1 className="font-semibold text-4xl sm:text-3xl">
              {offering.title}
            </h1>
          </div>

          <div className="flex sm:flex-col justify-between xs:text-sm w-full">
            <div className="flex sm:flex-wrap">
              <button
                className={`${
                  tab == "overview" ? "border-2" : "border-b-2 hover:border-2"
                } border-black hover:scale-110 p-2 mr-2`}
                onClick={() => setTab("overview")}
              >
                Overview
              </button>
              <button
                className={`${
                  tab == "analytics" ? "border-2" : "border-b-2 hover:border-2"
                } border-black hover:scale-110 p-2 mr-2`}
                // onClick={() => setTab("analytics")}
              >
                Analytics
              </button>
            </div>
            
            <div className="flex items-center ml-5 sm:mt-5 sm:ml-0">
              <Like postId={offeringId} typeId={postTypeId["offering"]} />
              <Attachment attachmentData={offering.attachment} />
            </div>
          </div>
          
          <div className="flex justify-end items-center">
            {tab == "overview" && context.auth.role !== roleIds["super_admin"] ? null : (
              <div className="flex my-5">
                <Link to={`/main/edit-offering/${offeringId}`}>
                  <h2 className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 p-2">
                    Edit Offering
                  </h2>
                </Link>
                <button
                  className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 p-2 ml-2"
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure, you want to delete this challenge?"
                      )
                    )
                      onDelete();
                  }}
                >
                  Delete Offering
                </button>
              </div>
            )}
          </div>

          <div className="border-4 p-3">
            <div>
              <h1 className="text-lg pt-2 font-bold mt-2">Owner</h1>
              <div className="pl-10 md:pl-5 sm:pl-5 xs:pl-2 w-fit">
                <UserCard
                  name={offering.owner_name}
                  email={offering.owner_email}
                />
              </div>
            </div>

            <div>
              <h1 className="text-lg pt-2 font-bold my-2">Description</h1>
              <div className="pl-10 md:pl-5 sm:pl-5 xs:pl-2">
                {offering.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(JSON.parse(offering.description)),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <Comments typeId={postTypeId["offering"]} postId={offeringId} />
      </div>
    </MainLayout>
  );
};

export default Offering;
