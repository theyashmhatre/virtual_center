import AuthRequired from "../components/Authentication/AuthRequired";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children, role }) => {
  return (
    <AuthRequired role={role}>
      <div className="h-screen fixed float-left w-24 md:w-20 sm:w-16">
        <Sidebar />
      </div>
      
      <div className="ml-24 md:ml-20 sm:ml-16">
        <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </div>
    </AuthRequired>
  );
};

export default MainLayout;