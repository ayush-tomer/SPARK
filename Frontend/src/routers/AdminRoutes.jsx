/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    return navigate("/admin");
  }
  return children ? children : <Outlet />;
};

export default AdminRoute;
