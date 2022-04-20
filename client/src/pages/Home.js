import Home1 from "../../public/Home1.png";
import Home2 from "../../public/Home2.png";
import Home3 from "../../public/Home3.png";
import Home4 from "../../public/Home4.png";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex bg-[url('../public/home_cover.png')] h-80">
          <div className="flex-1 bg-blue-bg-lite/80 pt-8 bg-blue-500 bg-opacity-60  ">
            <h1 className="  text-4xl pl-14 text-white font-semibold ">
              Where Innovation Meets Reality{" "}
            </h1>
            <h3 className="text-left pl-14 pt-5 text-lg mr-16 pr-2 text-white">
              A collaborative space to innovate in the virtual world .
              Innovative teams connect to provide solutions on various customer
              ongoing challenges
            </h3>
          </div>
          <div className="flex-1">
            <h1></h1>
          </div>
        </div>
        {/* home */}
        <div className="pl-14 pt-8 pr-8">
          <h2 className="text-2xl">Collaborate , Innovate</h2>
          <h3 className=" text-zinc-700 my-5">
            Platform to engage innovation evangelist to utlilize technical and
            business expertise to create solutions for the future. Platform,
            SMEs enable users to latest trends, themes, customer pain points for
            innovating right business solution. Access to various tools and also
            support from horizontal teams enable complete platform for smooth
            execution.
          </h3>
          <div className="flex items-between overflow-hidden mt-10 mb-28  ">
            <div className="pr-4 ">
              <div className="flex flex-row  items-center ">
                <div className="h-32 w-32 rounded-full bg-pink-700 flex justify-center items-center ">
                  <img alt="background_image" src={Home1} />
                </div>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size="lg"
                  className="text-gray-400 z-20 ml-9 "
                />
                <div className=" w-44 h-1  border-t-2 border-slate-500 mt-0.5 border-dashed"></div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-400 z-20  "
                />
              </div>
              <div className="my-5 border-r-2 border-gray-300 h-full">
                <p className="text-xl text-pink-700">
                  Opportunity Identification
                </p>
                <ul className="m-5 list-disc text-gray-500">
                  <li>Continuous Challenge Data Collection</li>
                  <li>Continuous Data Collection for PoCs and Pilots</li>
                  <li>Innovation Champions for Each Account</li>
                  <li>Customer Requested Pilots</li>
                  <li>Self Financing Model</li>
                </ul>
              </div>
            </div>
            <div className="px-4">
              <div className="flex flex-row  items-center ">
                <div className="h-32 w-32 rounded-full bg-pink-700 flex justify-center items-center ">
                  <img alt="background_image" src={Home2} />
                </div>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size="lg"
                  className="text-gray-400 z-20 ml-9 "
                />
                <div className=" w-44 h-1  border-t-2 border-slate-500 mt-0.5 border-dashed"></div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-400 z-20  "
                />
              </div>
              <div className="my-5 border-r-2 border-gray-300 h-full">
                <p className="text-xl text-pink-700">Platforms of Enablement</p>
                <ul className="m-5 list-disc text-gray-500">
                  <li>Crowd Source Ideas(Ideation Platform)</li>
                  <li>Crowd Source Resources Across ISU</li>
                  <li>COIN Partner Integration</li>
                  <li>Solution Development Platform</li>
                  <li>Platform to showcase Solutions</li>
                  <li>Cloud Services</li>
                </ul>
              </div>
            </div>
            <div className="px-4">
              <div className="flex flex-row  items-center ">
                <div className="h-32 w-32 rounded-full bg-pink-700 flex justify-center items-center ">
                  <img alt="background_image" src={Home3} />
                </div>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size="lg"
                  className="text-gray-400 z-20 ml-9 "
                />
                <div className=" w-44 h-1  border-t-2 border-slate-500 mt-0.5 border-dashed"></div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="text-gray-400 z-20  "
                />
              </div>
              <div className="my-5 border-r-2 border-gray-300 h-full">
                <p className="text-xl text-pink-700">
                  Continous innovation tools
                </p>
                <ul className="m-5 list-disc text-gray-500">
                  <li>Monthly Ideathon</li>
                  <li>Quarterly Hackathons</li>
                  <li>Continuous Pilots and PoCs</li>
                  <li>IPR and IP Safe Process Enablement</li>
                  <li>Take through TCS Innovation Champions Network</li>
                </ul>
              </div>
            </div>
            <div className="pr-8">
              <div className="h-32 w-32 rounded-full bg-pink-700 flex justify-center items-center">
                <img alt="" src={Home4} />
              </div>
              <div className="my-5 h-full">
                <p className="text-xl text-pink-700">Fecilitation Network</p>
                <ul className="m-5 list-disc text-gray-500">
                  <li>L&amp;D</li>
                  <li>DEG</li>
                  <li>BTAG</li>
                  <li>CTO Labs</li>
                  <li>TEG</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
