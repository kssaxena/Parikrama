import { useSelector } from "react-redux";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} className="w-10" />
          Parikrama
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              to={`/admin/dashboard`}
              className="bg-[#DF3F33] px-4 py-2 rounded-2xl drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out text-white "
            >
              {window.location.pathname === "/" &&
              window.location.pathname === "*"
                ? "Go to Dashboard"
                : `Welcome ${user.name}`}
            </Link>
          ) : (
            <Button label="Admin Login" onClick={() => navigate("/login")} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
