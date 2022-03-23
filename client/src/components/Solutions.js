import Navbar from "./Navbar";
import Footer from "./Footer";

const Solutions = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col">
        <div className="flex flex-col lg:w-80v md:w-full sm:w-full mb-5 w-screen">
          <div className="bg-red-500 h-30v flex items-center justify-center">
            <h1 className="text-center bg-yellow-400">Insert image here</h1>
          </div>
        </div>

        <div className="flex  w-80v flex-wrap  md:w-95v sm:w-95v">
          <button className="bg-gray-300 p-2 mr-4 mb-5">
            Challenge overview
          </button>
          <button className="bg-gray-300 p-2 mr-4 mb-5">Solution</button>
          <button className="bg-gray-300 p-2 mb-5">button3</button>
        </div>

        <div className=" w-80v md:w-95v sm:w-95v  flex flex-col items-center justify-center">
          <div className="border-4 rounded  w-70per md:w-full sm:w-full flex  p-4 md:flex-col sm:flex-col mb-4">
            <div className="flex flex-col mb-2 mr-1">
              <div className="border h-50 w-50 bg-red-600 text-center mb-1">
                image
              </div>

              <div>username</div>
              <div></div>
            </div>
            <div className="">
              <div className="mb-3">
                <h1>This is solution1</h1>
                <p>
                  here is some text. here is some text. here is some text. here
                  is some text. here is some text. here is some text. here is
                  some text. here is some text. here is some text. here is some
                  text. here is some text. here is some text.here is some text.
                  here is some text. here is some text. here is some text.here
                  is some text.here is some text.here is some text. here is some
                  text. here is some text.here is some text.here is some text.
                  here is some text. here is some text. here is some text. here
                  is some text. here is some text. here is some text. here is
                  some text.
                </p>
              </div>
              <div className="flex flex-wrap justify-center">
                <button className="mr-2 bg-gray-300 px-2">update</button>
                <button className="bg-gray-300 px-2">comment</button>
              </div>
            </div>
          </div>

          <div className="border-4 rounded  w-70per md:w-full sm:w-full flex  p-4 md:flex-col sm:flex-col mb-4 ">
            <div className="flex flex-col mb-2 mr-1">
              <div className="border h-50 w-50 bg-red-600 text-center mb-1">
                image
              </div>

              <div>username</div>
              <div></div>
            </div>
            <div className="">
              <div className="mb-3">
                <h1>This is solution2</h1>
                <p>
                  here is some text. here is some text. here is some text. here
                  is some text. here is some text. here is some text. here is
                  some text. here is some text. here is some text. here is some
                  text. here is some text. here is some text.here is some text.
                  here is some text. here is some text. here is some text.here
                  is some text.here is some text.here is some text. here is some
                  text. here is some text.here is some text.here is some text.
                  here is some text. here is some text. here is some text. here
                  is some text. here is some text. here is some text. here is
                  some text.
                </p>
              </div>
              <div className="flex flex-wrap justify-center">
                <button className="mr-2 bg-gray-300 px-2">update</button>
                <button className="bg-gray-300 px-2">comment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Solutions;
