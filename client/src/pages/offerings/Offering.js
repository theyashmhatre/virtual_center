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
      <div className="flex justify-center">
        <div className="w-90v flex flex-col my-10">
          <div className="flex items-center justify-between w-full my-2">
            <h1 className="font-mono font-semibold text-4xl">
              {offering.title}
            </h1>
            <div className="flex items-center">
              <Like postId={offeringId} typeId={postTypeId["offering"]} />
              <Attachment attachmentData={offering.attachment} />
            </div>
          </div>

          <div className="flex items-center justify-between w-full my-2">
            <div className="flex">
              <UserCard name={offering.owner_name} email={offering.owner_email} />
            </div>
            <div className="flex items-center">
              {context.auth.role !== roleIds["super_admin"] ? null : (
                <div className="flex">
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
          </div>

          <div className="flex justify-start flex-wrap mt-5">
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
