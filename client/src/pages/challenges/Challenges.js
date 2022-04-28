import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import { getChallenges, searchChallenges } from "../../utilities/api/challenge";
import ChallengeCard from "../../components/Challenges/ChallengeCard";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [moreChallengeAvlbl, setMoreChallengeAvlbl] = useState(true);
  const [sortedBy, setSortedBy] = useState("postedOn");
  const [order, setOrder] = useState(1);
  const limit = 8;
  const context = useContext(AuthContext);

  const handleScroll = (e) => {
    const window = e.currentTarget;
    if (
      window.scrollY >
      window.document.documentElement.scrollHeight -
        window.document.documentElement.clientHeight -
        100
    )
      setPageNo((prevPageNo) => prevPageNo + 1);
  };

  useEffect(() => {
    if (!moreChallengeAvlbl) return;

    window.addEventListener("scroll", (e) => handleScroll(e));

    return () => {
      window.removeEventListener("scroll", (e) => handleScroll(e));
    };
  }, [window.scrollY]);

  useEffect(() => {
    if (!moreChallengeAvlbl) return;

    setLoading(true);
    if (!searchQuery) {
      getChallenges(pageNo, limit, sortedBy, order)
        .then(({ data }) => {
          if (data.challenge_list)
            setChallenges([...challenges, ...data.challenge_list]);
          
          setLoading(false);
          if (data.challenges_count < limit) setMoreChallengeAvlbl(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      searchChallenges(searchQuery, pageNo)
        .then(({ data }) => {
          if (data.challenge_list)
            setChallenges([...challenges, ...data.challenge_list]);

          setLoading(false);
          if (data.challenges_count < limit) setMoreChallengeAvlbl(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [pageNo, sortedBy, order]);

  const onSearch = () => {
    if (searchQuery) {
      setPageNo(1);
      setMoreChallengeAvlbl(true);
      searchChallenges(searchQuery, 1)
        .then(({ data }) => {
          if (data.challenge_list) setChallenges(data.challenge_list || []);

          setLoading(false);
          if (data.challenges_count < limit) setMoreChallengeAvlbl(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <MainLayout role="employee">
      <div className="min-h-screen">
        <div className="flex items-center justify-center h-20v border">
          <div className="flex border-2 border-gray-200 rounded w-1/2 sm:w-5/6 xs:w-full absolute">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 w-90per"
              placeholder="what are you looking for?"
            />
            <div className="absolute top-2 right-3">
              <FontAwesomeIcon
                icon={faSearch}
                size="lg"
                className="text-gray-400 z-20 hover:text-gray-500 cursor-pointer"
                onClick={onSearch}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="lg:h-80v w-90v">
            <div className="h-10v flex items-center justify-between sm:flex-col">
              <div className="font-bold">
                <h1>View All Chalenges, Collaborate and Innovate</h1>
              </div>
              <div className="flex justify-end flex-wrap">
                <p className="mr-10">{challenges.length} Results</p>
                <div className="flex flex-wrap flex-start">
                  <h2 className="mr-2">Sort By :</h2>
                  <select
                    className="border-2 px-2"
                    name="sort"
                    onChange={(e) => {
                      setMoreChallengeAvlbl(true);
                      setPageNo(1);
                      setChallenges([]);
                      if (e.target.value == 1 || e.target.value == 2)
                        setSortedBy("postedOn");
                      else if (e.target.value == 3 || e.target.value == 4)
                        setSortedBy("endDate");
                      else setSortedBy("status");

                      if (Number(e.target.value) % 2) setOrder(1);
                      else setOrder(-1);
                    }}
                  >
                    <option value={1} label="Posted On Newest First" />
                    <option value={2} label="Posted On Oldest First" />
                    <option value={3} label="End Date Ascending Order" />
                    <option value={4} label="End Date Descending Order" />
                    <option value={5} label="Status Ascending Order" />
                    <option value={6} label="Status Descending Order" />
                  </select>
                </div>
              </div>
            </div>

            {context.auth && context.auth.role == "admin" ? (
              <div className="flex justify-end mb-10">
                <Link to={`/challenge/create-challenge`}>
                  <h2 className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 p-2">
                    Create Challenge
                  </h2>
                </Link>
              </div>
            ) : null}

            <div className="lg:h-70v flex md:flex-col md:items-center sm:items-center sm:flex-col flex-wrap mb-10">
              {challenges.map((challenge, index) => (
                <ChallengeCard challenge={challenge} key={index} />
              ))}
            </div>
            {moreChallengeAvlbl && loading ? (
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
        </div>
      </div>
    </MainLayout>
  );
};

export default Challenges;
