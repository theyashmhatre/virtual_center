import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col ">
        <div className="flex bg-[url('../public/home_cover.png')] h-80 ">
          <div
            className=" flex-1 bg-blue-bg-lite/80  pt-8 bg-blue-700 
                 bg-opacity-25  "
          >
            <h1 className="  text-4xl pl-14 text-white font-semibold ">
              Where Innovation Meets Reality{" "}
            </h1>
            <h3 className="text-left pl-14 pt-5 text-lg   mr-16 pr-2 text-white">
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
          <h2 className="text-2xl"></h2>
          <h3 className=" text-zinc-700 ">
            Collaborate , Innovate Platform to engage innovation evangelist to
            utlilize technical and business expertise to create solutions for
            the future. Platform , SMEs enable users to latest trends , themes ,
            customer pain points for innovating right business solution. Access
            to various tools and also support from horizontal teams enable
            complete platform for smooth execution
          </h3>
          <div className="h-40"></div>
          <div className="flex flex-row"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
