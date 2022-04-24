import AdminAuthRequired from "../components/Authentication/AdminAuthRequired";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Side from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <AdminAuthRequired>
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <div
          style={{
            width: "6%",
            display: "inline-block",
            height: "100vh",
            float: "left",
          }}
        >
          <Side />
        </div>
        <div style={{ width: "94%", display: "inline-block" }}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </AdminAuthRequired>
  );
};

export default AdminLayout;
