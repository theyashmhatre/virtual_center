import AuthNotRequired from "../components/Authentication/AuthNotRequired";
import { AuthSidebar } from "../components/Authentication/AuthSidebar";

const AuthLayout = ({ children }) => {
  return (
    <AuthNotRequired>
      {/*grid start*/}
      <div className="grid grid-cols-2 divide-x">
        {/* grid child_1 start*/}
        <AuthSidebar />
        {/* grid child_1 end*/}
        
        {children}
      </div>
    </AuthNotRequired>
  );
};

export default AuthLayout;