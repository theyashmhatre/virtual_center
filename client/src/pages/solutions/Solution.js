import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comments from '../../components/Comments';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getSingleSolution, getComments, postComment } from "../../utilities/api/solution";

const Solution = () => {
  const [solution, setSolution] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const { solutionId } = useParams();

  useEffect(() => {
    if (solutionId) {
      getSingleSolution(solutionId)
        .then(({ data }) => setSolution(data))
        .catch(() => {});
        
      getComments(solutionId, pageNo)
        .then(({ data }) => {
          setComments(data.comments)
        })
        .catch((e) => {
          console.log(e.response)
        })
    }
  }, []);

  const onPost = () => {
    postComment(solutionId, commentText)
      .then(() => {})
      .catch(() => {});
  }
  
  return (
    <div>
      <Navbar />
      <div className="mx-40 mb-20">
        <h1 className='text-xl text-center text-bold my-5'>Solution</h1>
        <div className="w-80v md:w-95v sm:w-95v">
          <h1 className="mb-5">{solution.title}</h1>
          <div className="md:w-full sm:w-full w-60v mb-10">
            {!solution.description ? null : (
              <div
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(JSON.parse(solution.description))
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Comments
        comments={comments}
        commentText={commentText}
        setCommentText={setCommentText}
        onClick={onPost}
      />
      <Footer />
    </div>
  );
};

export default Solution;
