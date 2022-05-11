import TataLogo from "../../public/TataLogo.png";

const Footer = () => {
  return (
    <div className="bg-pink-800 pt-3 pb-5 px-10 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1>TATA CONSULTANCY SERVICES</h1>

          <div
            className={`
              flex items-center space-x-3
              md:flex-col md:items-start md:space-x-0 md:space-y-3
              sm:flex-col sm:items-start sm:space-x-0 sm:space-y-3
              text-sm font-extralight
            `}
          >
            <p>
              ©2020 Tata Consultancy Services Limited. All Rights Reserved.
            </p>
            <p className="text-2xl pb-2 md:hidden sm:hidden">|</p>
            <div
              className={`
                flex items-center space-x-3
                xs:flex-col xs:items-start xs:space-x-0 xs:space-y-1 xs:text-xs
              `}
            >
              <p>About Us</p>
              <p className="text-xs xs:hidden">|</p>
              <p>Cookie Policy</p>
              <p className="text-xs xs:hidden">|</p>
              <p>Privacy Policy</p>
              <p className="text-xs xs:hidden">|</p>
              <p>Terms &amp; Conditions</p>
            </div>
          </div>
        </div>
        
        <div className="xs:hidden">
          <img
            className="h-5 justify-end"
            alt="tata_logo"
            src={TataLogo}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
