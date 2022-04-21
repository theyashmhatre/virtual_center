import Log from "../../public/Log.png";
export const AuthSidebar = () => {
  return (
    <div className="min-h-screen bg-blue-500 bg-opacity-100 bg-gradient-to-tr from-blue-grd to-green-grd">
      <div className="text-center pl-4 pt-16">
        <h1 className="font-normal text-slate-50 text-l">
          TATA CONSULTANCY SERVICES
        </h1>
      </div>
      <div className=" pt-56 flex justify-center items-center">
                <img src={Log} />
      </div> 
      <div className="text-center pl-4 pt-12">
        <h1 className="font-bold text-slate-50 text-4xl">TCS Virtual</h1>
      </div>
      <div className="text-center pl-4 pt-1">
        <h1 className="font-bold text-slate-50 text-4xl">
          Innovation Center
        </h1>
      </div>
    </div>
  );
};
