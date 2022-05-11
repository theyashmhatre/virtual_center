import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { roleIds } from "../../../constants";
import ChallengeCard from "../../components/Challenges/ChallengeCard";
import { AuthContext } from "../../contexts";
import MainLayout from "../../layouts/MainLayout";
import { getChallenges, searchChallenges } from "../../utilities/api/challenge";

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
    <MainLayout role={roleIds["user"]}>
      <div className="min-h-screen">
        <div className="flex items-center justify-center h-20v border">
          <div className="flex border-2 border-gray-200 rounded w-1/2 sm:w-3/5 absolute">
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
        <div className="px-10 sm:px-5">
          <div className="flex items-center justify-between gap-5 my-5 md:flex-col md:gap-4 sm:flex-col sm:gap-3">
            <div className="font-bold">
              <h1>View All Chalenges, Collaborate and Innovate</h1>
            </div>
            <div className="flex sm:flex-wrap sm:justify-center sm:gap-3">
              <p className="mr-10">{challenges.length} Results</p>
              <div className="flex flex-start">
                <h2 className="mr-2">Sort By:</h2>
                <select
                  className="border-2 px-2 xs:w-40"
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

          {context.auth && (context.auth.role == roleIds["admin"] || context.auth.role == roleIds["super_admin"]) ? (
            <div className="flex justify-end mb-10">
              <Link to={`/challenge/create-challenge`}>
                <h2 className="border-2 border-black rounded-3xl hover:scale-110 text-center text-pink-700 p-2">
                  Create Challenge
                </h2>
              </Link>
            </div>
          ) : null}

          <div className="flex items-between flex-wrap mb-10 sm:justify-center">
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
    </MainLayout>
  );
};

export default Challenges;
