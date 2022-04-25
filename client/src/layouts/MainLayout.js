import AuthRequired from "../components/Authentication/AuthRequired";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <AuthRequired>
      <div style={{height:'100vh' , float:"left"}}>
        <Sidebar />
      </div>
      
      <div className="ml-24">
        <Navbar />
        {children}
        <Footer />
      </div>
    </AuthRequired>
  );
};

export default MainLayout;