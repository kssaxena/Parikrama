import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <Link to="/" className="text-xl font-bold text-[#2563eb]">
          Parikrama
        </Link>

        <div className="space-x-4">
          <Link to="/explore" className="text-gray-600 hover:text-blue-600">
            Explore
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
