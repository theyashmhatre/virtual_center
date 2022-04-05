import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSingleOffering } from "../../utilities/api/offering";
import { data } from "autoprefixer";

const Offering = () => {
  const [offering, setOffering] = useState({});
  const { offeringId } = useParams();

  useEffect(() => {
    if (offeringId)
      getSingleOffering(offeringId)
        .then(({ data }) => {
          console.log(data);
          setOffering(data);
        })
        .catch(() => {});
  }, []);

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
            <h1 className=" font-mono font-semibold text-4xl ">
              {offering.title}
            </h1>
          </div>

          <div>
            <h1>{offering.owner_name}</h1>
            <h1> {offering.owner_email} </h1>
          </div>

          <div className="mt-5">
            <div className="border-4 mt-2 p-3">
              <p>
                {offering.description}
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
      <Footer />
    </div>
  );
};

export default Offering;
