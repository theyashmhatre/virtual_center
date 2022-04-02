import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import challenge_cover from "../../../public/challenge_cover.png";

const Challenges = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center  h-20v border">
        <div className="flex border-2 border-gray-200 rounded w-1/2 sm:w-5/6 xs:w-full absolute">
          <input
            type="text"
            className="px-4 py-2 w-90per"
            placeholder="what are you looking for?"
          ></input>
          <div className="absolute top-2 right-3">
            {" "}
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
          </div>
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="lg:h-80v  w-90v">
          <div className="h-10v  flex items-center sm:flex-col">
            <div className=" w-70per lg:w-60per  md:w-50per sm:w-full">
              <h1>Lorem lpsum Dolor Sit Amet</h1>
            </div>
            <div className=" w-30per lg:w-40per md:w-50per sm:w-full flex justify-end flex-wrap">
              <p className=" mr-4"> 4 Results</p>
              <p className="">Sort By : Posted Date Newest</p>
            </div>
          </div>
          <div className="lg:h-70v flex md:flex-col md:items-center sm:items-center sm:flex-col justify-between">
            <div className="border-2  h-70v lg:mb-0 mb-4 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6">
              <div className="h-40per ">
                <img
                  className=" object-fill h-full w-full   "
                  src={challenge_cover}
                  alt="challenge cover"
                />
              </div>
              <div className="h-60per border-gray-500 border-2 flex flex-col justify-between p-3">
                <div className="h-25per  flex items-center">
                  <h2>
                    Lorem lapsum Dolor Sit Amet, Consecutetur Adipiscing Elit.
                    Dolor Lpsum Amet
                  </h2>
                </div>
                <div className="h-10per flex items-center">
                  <p>Lorem Lpsum Dolor Sit Amet</p>
                </div>
                <div className="flex flex-col">
                  <div className=" flex items-center mb-1">
                    <button className="bg-pink-700  px-1 rounded mr-2">
                      Open
                    </button>
                    <p>Until 25 oct 2020</p>
                  </div>
                  <div className="flex items-center mb-1">
                    <button className="bg-gray-300  px-1 rounded mr-2">
                      Awards
                    </button>
                    <button className="bg-gray-300 px-1  rounded mr-2">
                      See Details
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-gray-300  px-1 rounded mr-2">
                      Active Solvers
                    </button>
                    <button className="bg-gray-300 px-1  rounded mr-2">
                      6
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="text-center text-pink-700">View challenges</h2>
                </div>
              </div>
            </div>
            <div className="border-2  h-70v lg:mb-0 mb-4 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6">
              <div className="h-40per bg-gray-300">
                <img
                  className=" object-fill h-full w-full   "
                  src={challenge_cover}
                  alt="challenge cover"
                />
              </div>
              <div className="h-60per border-gray-500 border-2 flex flex-col justify-between p-3">
                <div className="h-25per  flex items-center">
                  <h2>
                    Lorem lapsum Dolor Sit Amet, Consecutetur Adipiscing Elit.
                    Dolor Lpsum Amet
                  </h2>
                </div>
                <div className="h-10per flex items-center">
                  <p>Lorem Lpsum Dolor Sit Amet</p>
                </div>
                <div className="flex flex-col">
                  <div className=" flex items-center mb-1">
                    <button className="bg-pink-700  px-1 rounded mr-2">
                      Open
                    </button>
                    <p>Until 25 oct 2020</p>
                  </div>
                  <div className="flex items-center mb-1">
                    <button className="bg-gray-300  px-1 rounded mr-2">
                      Awards
                    </button>
                    <button className="bg-gray-300 px-1  rounded mr-2">
                      See Details
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-gray-300  px-1 rounded mr-2">
                      Active Solvers
                    </button>
                    <button className="bg-gray-300 px-1  rounded mr-2">
                      6
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="text-center text-pink-700">View challenges</h2>
                </div>
              </div>
            </div>
            <div className="border-2  h-70v lg:mb-0 mb-4 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6">
              <div className="h-40per bg-gray-300">
                <img
                  className=" object-fill h-full w-full   "
                  src={challenge_cover}
                  alt="challenge cover"
                />
              </div>
              <div className="h-60per border-gray-500 border-2 flex flex-col justify-between p-3">
                <div className="h-25per  flex items-center">
                  <h2>
                    Lorem lapsum Dolor Sit Amet, Consecutetur Adipiscing Elit.
                    Dolor Lpsum Amet
                  </h2>
                </div>
                <div className="h-10per flex items-center">
                  <p>Lorem Lpsum Dolor Sit Amet</p>
                </div>
                <div className="flex flex-col">
                  <div className=" flex items-center mb-1">
                    <button className="bg-pink-700  px-1 rounded mr-2">
                      Open
                    </button>
                    <p>Until 25 oct 2020</p>
                  </div>
                  <div className="flex items-center mb-1">
                    <button className="bg-gray-300  px-1 rounded mr-2">
                      Awards
                    </button>
                    <button className="bg-gray-300 px-1  rounded mr-2">
                      See Details
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-gray-300  px-1 rounded mr-2">
                      Active Solvers
                    </button>
                    <button className="bg-gray-300 px-1  rounded mr-2">
                      6
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="text-center text-pink-700">View challenges</h2>
                </div>
              </div>
            </div>
            <div className="border-2  h-70v lg:mb-0 mb-4 w-24per  md:w-1/2 sm:w-2/3 xs:w-5/6">
              <div className="h-40per bg-gray-300">
                <img
                  className=" object-fill h-full w-full   "
                  src={challenge_cover}
                  alt="challenge cover"
                />
              </div>
              <div className="h-60per border-gray-500 border-2 flex flex-col justify-between p-3">
                <div className="h-25per  flex items-center">
                  <h2>
                    Lorem lapsum Dolor Sit Amet, Consecutetur Adipiscing Elit.
                    Dolor Lpsum Amet
                  </h2>
                </div>
                <div className="h-10per flex items-center">
                  <p>Lorem Lpsum Dolor Sit Amet</p>
                </div>
                <div className="flex flex-col">
                  <div className=" flex items-center mb-1">
                    <button className="bg-pink-700  px-1 rounded mr-2">
                      Open
                    </button>
                    <p>Until 25 oct 2020</p>
                  </div>
                  <div className="flex items-center mb-1">
                    <button className="bg-gray-300  px-1 rounded mr-2">
                      Awards
                    </button>
                    <button className="bg-gray-300 px-1  rounded mr-2">
                      See Details
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-gray-300  px-1 rounded mr-2">
                      Active Solvers
                    </button>
                    <button className="bg-gray-300 px-1  rounded mr-2">
                      6
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="text-center text-pink-700">View challenges</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Challenges;
