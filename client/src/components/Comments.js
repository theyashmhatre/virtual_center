import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comments = () => {
  return (
    <div>
      {" "}
      <div className="mt-10">
        <h1 className=" text-lg ">Comments : </h1>
        <div className=" border-4 p-2  overflow-y-scroll">
          <textarea
            type="text"
            className="border-4 mt-2 p-3  w-full"
          ></textarea>
          <div className="w-full  flex flex-row justify-end">
            <button className=" bg-pink-700 text-white m-1 border-2 p-2 px-6  ">
              Submit
            </button>
          </div>
          <div className="border-4 mt-2 p-3 flex flex-row ">
            <div className=" flex flex-col w-10per   justify-center align-middle ">
              <div className="w-full  flex justify-center">
                <div className=" bg-red-700 rounded-full h-20 w-20     "></div>
              </div>
              <div className="w-full  flex justify-center">
                <div>userName</div>
              </div>
            </div>
            <div className=" w-90per  flex flex-col ">
              <div className="m-2 mb-1 border-2 h-14 ">Hello world !</div>
              <div className="ml-2 text-xs text-gray-600">
                Posted on 05/04/2022
              </div>
              <div>
                {/* <FontAwesomeIcon icon={faThumbsUp} size="2x" className=" p-1" /> */}
                <button className="bg-pink-700 text-white m-2 p-1 w-22 flex flex-row border-2">
                  <div> Upvote</div>
                  <div className="bg-white text-pink-700 rounded-2xl  mx-1">
                    12
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="border-4 mt-2 p-3 flex flex-row ">
            <div className=" flex flex-col w-10per   justify-center align-middle ">
              <div className="w-full  flex justify-center">
                <div className=" bg-red-700 rounded-full h-20 w-20     "></div>
              </div>
              <div className="w-full  flex justify-center">
                <div>userName</div>
              </div>
            </div>
            <div className=" w-90per  flex flex-col ">
              <div className="m-2 mb-1 border-2 h-14 ">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
              </div>
              <div className="ml-2 text-xs text-gray-600">
                Posted on 05/04/2022
              </div>
              <div>
                {/* <FontAwesomeIcon icon={faThumbsUp} size="2x" className=" p-1" /> */}
                <button className="bg-pink-700 text-white m-2 p-1 w-22 flex flex-row border-2">
                  <div> Upvote</div>
                  <div className="bg-white text-pink-700 rounded-2xl  mx-1">
                    12
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="border-4 mt-2 p-3 flex flex-row ">
            <div className=" flex flex-col w-10per   justify-center align-middle ">
              <div className="w-full  flex justify-center">
                <div className=" bg-red-700 rounded-full h-20 w-20     "></div>
              </div>
              <div className="w-full  flex justify-center">
                <div>userName</div>
              </div>
            </div>
            <div className=" w-90per  flex flex-col ">
              <div className="m-2 mb-1 border-2 h-14 ">Hello world !</div>
              <div className="ml-2 text-xs text-gray-600">
                Posted on 05/04/2022
              </div>
              <div>
                {/* <FontAwesomeIcon icon={faThumbsUp} size="2x" className=" p-1" /> */}
                <button className="bg-pink-700 text-white m-2 p-1 w-22 flex flex-row border-2">
                  <div> Upvote</div>
                  <div className="bg-white text-pink-700 rounded-2xl  mx-1">
                    12
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
