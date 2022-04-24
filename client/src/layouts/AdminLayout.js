import AdminAuthRequired from "../components/Authentication/AdminAuthRequired";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <AdminAuthRequired>
      <div style={{height:'100vh' , float:"left"}}>
        <Sidebar />
      </div>
      
      <div className="ml-24">
        <Navbar />
        {children}
        <Footer />
      </div>
    </AdminAuthRequired>
  );
};

export default AdminLayout;