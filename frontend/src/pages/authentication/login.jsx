import { useState } from "react";
import AdminLogin from "../admin/AdminLogin";
// import HeadLogin from "../head/HeadLogin";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return <AdminLogin />;
};

export default Login;
