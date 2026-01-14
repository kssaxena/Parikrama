import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Hero from "./pages/hero/hero";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/authentication/login";
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearUser, stopAuthLoading } from "./redux/slices/authSlice";
import { FetchData } from "./utils/FetchFromApi";
import { useEffect } from "react";
import AdminRegistrationForm from "./pages/admin/AdminRegistrationForm";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem("RefreshToken");

    // No refresh token → user is logged out
    if (!refreshToken) {
      dispatch(stopAuthLoading());
      return;
    }

    const reLogin = async () => {
      try {
        const res = await FetchData(
          "/auth/refresh-token", // ✅ SINGLE endpoint
          "post",
          { refreshToken }
        );

        const { user, tokens } = res.data.data;

        // Store new tokens
        localStorage.setItem("AccessToken", tokens.AccessToken);
        localStorage.setItem("RefreshToken", tokens.RefreshToken);

        // Update redux
        dispatch(setUser(user));
      } catch (error) {
        localStorage.clear();
        dispatch(clearUser());
      } finally {
        dispatch(stopAuthLoading());
      }
    };

    reLogin();
  }, []);

  return (
    <div className="font-montserrat">
      <Header />

      {/* Top padding because header is fixed */}
      <div className="pt-20">
        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/register-admin"
            element={<AdminRegistrationForm />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ================= FALLBACK ================= */}
          <Route path="/testing" element={<SearchResult />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
