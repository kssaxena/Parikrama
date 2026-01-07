import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuthStore } from "../../store";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb] px-4">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Login
        </h1>

        <p className="text-center text-gray-500 mt-1">
          Welcome back! Please sign in.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#2563eb] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
