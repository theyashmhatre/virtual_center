import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Offering = () => {
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
            <h1 className="font-bold">Offering name : </h1>
            <h1>username</h1>
          </div>

          <div className="mt-10">
            <h1 className="font-bold">Offering description : </h1>
            <div className="border-4 mt-2 p-3">
              <p>
                some decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here. some decription will be here. some
                decription will be here.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h1 className=" text-lg ">Comments : </h1>
            <div className="border-4 p-2 h-30v overflow-y-scroll">
              <div className="border-4 mt-2 p-3">
                <p>comment1</p>
              </div>
              <div className="border-4 mt-2 p-3">
                <p>comment2</p>
              </div>
              <div className="border-4 mt-2 p-3">
                <p>comment3</p>
              </div>
              <div className="border-4 mt-2 p-3">
                <p>comment4</p>
              </div>
              <div className="border-4 mt-2 p-3">
                <p>comment5</p>
              </div>
              <div className="border-4 mt-2 p-3">
                <p>comment6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offering;
