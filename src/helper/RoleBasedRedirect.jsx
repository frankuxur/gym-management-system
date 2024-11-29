import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleBasedRedirect() {
    const user = useSelector(state => state.user.user)
  
    if (user?.role === "admin") {
      return <Navigate to="admin/members" replace />;
    } else if (user?.role === "member") {
      return <Navigate to="user/home" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
}