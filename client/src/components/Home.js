import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col ">
        <div className="flex bg-[url('../public/tempCover.jpg')] h-80  ">
          <div className=" flex-1 bg-blue-bg-lite/80  pt-8  ">
            <h1 className=" text-4xl text-center text-white font-semibold ">
              Lorem ipsum dolor, sit amet consectetur{" "}
            </h1>
            <h3 className="text-left pl-10 text-white">
              adipisicing elit. Ut voluptatem voluptatum laudantium nobis quis
              earum, rem maxime et pariatur dolore beatae amet, consequuntur
              eius distinctio impedit voluptate libero quia ex.
            </h3>
          </div>
          <div className="flex-1">
            <h1></h1>
          </div>
        </div>
        <div className="pl-10 pt-8 pr-8">
          <h2 className="text-2xl">Lorem ipsum dolor, sit amet consectetur</h2>
          <h3 className=" text-zinc-700 ">
            adipisicing elit. Ut voluptatem voluptatum laudantium nobis quis
            earum, rem maxime et pariatur dolore beatae amet, consequuntur eius
            distinctio impedit voluptate libero quia ex. adipisicing elit. Ut
            voluptatem voluptatum laudantium nobis quis earum, rem maxime et
            pariatur dolore beatae amet, consequuntur eius distinctio impedit
            voluptate libero quia ex.adipisicing elit. Ut voluptatem voluptatum
            laudantium nobis quis earum, rem maxime et pariatur dolore beatae
            amet, consequuntur eius distinctio impedit voluptate libero quia ex.
            adipisicing elit. Ut voluptatem voluptatum laudantium nobis quis
            earum, rem maxime et pariatur dolore beatae amet, consequuntur eius
            distinctio impedit voluptate libero quia ex.
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
