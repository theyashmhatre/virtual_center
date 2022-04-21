import AdminAuthRequired from "../components/Authentication/AdminAuthRequired";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <AdminAuthRequired>
      <Navbar />
      {children}
      <Footer />
    </AdminAuthRequired>
  );
};

export default AdminLayout;