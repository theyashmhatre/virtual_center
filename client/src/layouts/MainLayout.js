import AuthRequired from "../components/Authentication/AuthRequired";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children, role }) => {
  return (
    <AuthRequired role={role}>
      <div style={{height:'100vh' , float:"left"}}>
        <Sidebar />
      </div>
      
      <div className="ml-24">
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