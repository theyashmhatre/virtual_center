import AuthRequired from "../components/Authentication/AuthRequired";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Side from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <AuthRequired>
    <div style={{width:'100%',minHeight:"100vh"}}>
    <div style={{width:'6%',display:'inline-block' , height:'100vh' , float:"left"}}><Side/></div>
    <div style={{width:'94%',display:'inline-block'}}>

      <Navbar />
      {children}
      <Footer />
      </div>
    </div>
    </AuthRequired>
  );
};

export default MainLayout;