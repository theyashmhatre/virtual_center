import { faEnvelope, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSolutions } from "../../utilities/api/solution";
import { getTruncatedContentState } from "../../utilities/utils";
import { monthNames } from "../../../constants";

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [moreSolutionsAvlbl, setMoreSolutionsAvlbl] = useState(true);
  const limit = 12;
  const { challengeId } = useParams();

  const handleScroll = (e) => {
    const window = e.currentTarget;
    if (
      window.scrollY > (
        window.document.documentElement.scrollHeight -
        window.document.documentElement.clientHeight -
        100
      )
    )
      setPageNo(prevPageNo => prevPageNo+1);
  };

  useEffect(() => {
    if (!moreSolutionsAvlbl) return;

    window.addEventListener("scroll", (e) => handleScroll(e));

    return () => {
      window.removeEventListener("scroll", (e) => handleScroll(e));
    };
  }, [window.scrollY]);

  useEffect(() => {
    if (!moreSolutionsAvlbl) return;

    setLoading(true);
    if (challengeId)
      getSolutions(challengeId, pageNo)
        .then(({ data }) => {
          if (data.solution_list)
            setSolutions([...solutions, ...data.solution_list]);
          
          setLoading(false);
          if (!data.solutions_count || data.solutions_count < limit)
            setMoreSolutionsAvlbl(false);
        })
        .catch(() => {
          setLoading(false);
        });
  }, [pageNo]);

  return (
    <div className="w-full border-2">
      <div className="flex flex-wrap items-between justify-center">
        {solutions.map((solution) => {
          const temp = new Date(solution.posted_on);
          const postedOn_date =
            temp.getDate() +
            " " +
            monthNames[temp.getMonth()] +
            " " +
            temp.getFullYear();
          return (
            <div
              key={solution.solution_id}
              className="flex flex-col justify-between border-2 shadow-sm hover:shadow-xl rounded-lg m-2 p-4 w-24per md:w-1/2 sm:w-2/3 xs:w-5/6"
            >
              <div>
                <div className="rounded-lg bg-gradient-to-r from-pink-900 to-blue-grd border-gray-500 border-2 flex flex-col justify-between p-3">
                  <div className="h-25per flex justify-center">
                    <h2 className="text-2xl font-mono font-semibold text-white">
                      {solution.title}
                    </h2>
                  </div>
                </div>
                <div className="p-2 font-serif flex items-center justify-center">
                  <p>
                    {!solution.description ? null : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            getTruncatedContentState(
                              JSON.parse(solution.description)
                            )
                          ),
                        }}
                      />
                    )}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs pl-2 text-gray-400">
                  Posted on : {postedOn_date}
                </p>
                <div className="flex flex-col">
                  <div className="flex flex-col m-4 rounded shadow-lg border-2">
                    <p className="font-semibold flex justify-center align-bottom">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="sm"
                        className="p-1"
                      />
                      Patil
                    </p>
                    <div>
                      <div className="flex justify-center">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          size="lg"
                          className=" p-1"
                        />
                        <p className="font-serif">patil@hmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Link to={`/solution/${solution.solution_id}`}>
                    <h2 className="text-center p-4 text-pink-700">
                      View Detail
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {moreSolutionsAvlbl && loading ? (
        <div className="flex justify-center w-full my-20">
          <FontAwesomeIcon
            icon={faSpinner}
            size="4x"
            color="pink"
            spin={true}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Solutions;
