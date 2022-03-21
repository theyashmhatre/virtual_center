import tata from "../../public/tata_logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-pink-800 p-3 pl-5  text-white">
      <h1>Tata Consultancy Services</h1>

      <div className="flex space-x-3 flex-row ">
        <h1>2022 Tata Consultancy Services Limited. All Rights Reserved</h1>
        <h2>About Us</h2>
        <h2>Cookie Policy</h2>
        <h2>Privacy Policy</h2>
        <h2>Terms & Conditions</h2>
        {/* <img
          className=" border-2  h-5 justify-end "
          alt="tata_logo"
          src={tata}
        /> */}
      </div>
    </div>
  );
};

export default Footer;
