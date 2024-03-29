import { faAngleRight, faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { monthNames } from "../../../constants";
import { getSolutions } from "../../utilities/api/solution";
import { getTruncatedContentState } from "../../utilities/utils";
import { UserCard } from "../UserCard";

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
      getSolutions(challengeId, pageNo, limit)
        .then(({ data }) => {
          if (data.solution_list)
            setSolutions([...solutions, ...data.solution_list]);
          
          setLoading(false);
          if (!data.solutions_count || data.solutions_count < limit)
            setMoreSolutionsAvlbl(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
  }, [pageNo]);

  return (
    <div className="w-full border-2 p-5 sm:p-2">
      <div className="flex flex-wrap items-between">
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
              className="flex flex-col justify-between border-2 shadow-sm hover:shadow-xl rounded-lg m-2 p-3 w-96 xs:w-full"
            >
              <div>
                <div className="p-2">
                  <h2 className="text-2xl font-semibold">
                    {solution.title}
                  </h2>
                </div>
                <div className="p-2">
                  <div>
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
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs pl-2 text-gray-400">
                  Posted on : {postedOn_date}
                </p>
                <div className="flex justify-center">
                  <UserCard
                    name={solution.employee_name}
                    email={solution.email}
                    displayPicture={solution.display_picture}
                  />
                </div>
                <Link
                  to={`/challenge/solution/${solution.solution_id}`}
                  className="flex items-center space-x-4 w-fit p-2"
                >
                  <h2 className="font-medium text-pink-700">
                    View Detail
                  </h2>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    size="lg"
                    className="text-pink-700"
                  />
                </Link>
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
