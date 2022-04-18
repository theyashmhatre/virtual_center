import AuthRequired from "../components/Authentication/AuthRequired";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <AuthRequired>
      <Navbar />
      {children}
      <Footer />
    </AuthRequired>
  );
};

export default MainLayout;