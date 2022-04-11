import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comments from "../../components/Comments";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  getComments,
  getSingleOffering,
  postComment,
} from "../../utilities/api/offering";

const Offering = () => {
  const [offering, setOffering] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [postSuccess, setPostSuccess] = useState(false)
  const { offeringId } = useParams();

  useEffect(() => {
    if (offeringId)
      getSingleOffering(offeringId)
        .then(({ data }) => {
          setOffering(data);
        })
        .catch(() => {});
  }, []);

  useEffect(() => {
    if (offeringId)
      getComments(offeringId, pageNo)
        .then(({ data }) => {
          if (data.comments_list)
            setComments(data.comments_list)
          setPostSuccess(false)
        })
        .catch(() => {})
  }, [postSuccess]);
  
  const onPost = () => {
    postComment(offeringId, commentText)
      .then(() => setPostSuccess(true))
      .catch(() => {});
  };

  return (
    <div>
      <Navbar />
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
            <h1>{offering.owner_name}</h1>
            <h1> {offering.owner_email} </h1>
          </div>

          <div className="mt-5">
            <div className="border-4 mt-2 p-3">
              {offering.description && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: draftToHtml(
                      JSON.parse(offering.description)
                    ),
                  }}
                />
              )}
            </div>
          </div>
          <Comments
            comments={comments}
            commentText={commentText}
            setCommentText={setCommentText}
            onClick={onPost}
            success={postSuccess}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Offering;
