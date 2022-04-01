import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Challenge = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col">
        <div className="flex flex-col lg:w-80v md:w-full sm:w-full mb-5  w-screen ">
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

        <div className=" w-80v md:w-95v sm:w-95v">
          <h1 className="mb-5">Abstract</h1>
          <p
            // style="font-size: 16px;"
            className="md:w-full sm:w-full  w-60v mb-10"
          >
            <span>
              Modern software development often utilizes a containerized
              environment in which the software code is bundled with supporting
              libraries, dependencies, and configuration files in an isolated
              package to create a lightweight and portable application that can
              run on a variety of operating systems and hardware.
              &nbsp;Currently available containerization technology, such as
              Docker, does not allow for real-time computing that is a
              requirement in many embedded systems applications in the aviation,
              automotive, and automation industries. &nbsp;The Seeker is looking
              for a real-time container engine technology for generation of hard
              real-time applications and microservices in a DevSecOps
              environment.
            </span>
          </p>
          <p className="md:w-full sm:w-full  w-60v mb-10">
            <span>
              This is a Reduction-to-Practice Challenge that requires written
              documentation, proof-of-concept demonstration, and delivery of
              source code and/or binaries upon request of the Seeker.
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Challenge;
