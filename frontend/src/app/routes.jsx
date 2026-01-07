import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Explore from "../pages/public/Explore";
import Places from "../pages/public/Places";
import RoutePlanner from "../pages/public/RoutePlanner";
// import PlaceDetails from "../pages/public/PlaceDetails";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/admin/Dashboard";
import States from "../pages/admin/States";
import Cities from "../pages/admin/Cities";
import PlacesAdmin from "../pages/admin/Places";
import AddEditPlace from "../pages/admin/AddEditPlace";

import ProtectedLayout from "../components/layout/ProtectedLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/places/:cityId" element={<Places />} />
      <Route path="/route-plan" element={<RoutePlanner />} />
      {/* <Route path="/place/:id" element={<PlaceDetails />} /> */}

      {/* 🔐 Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🧑 User Protected */}
      <Route
        path="/route-plan"
        element={
          <ProtectedLayout role="user">
            <RoutePlanner />
          </ProtectedLayout>
        }
      />

      {/* 🛠️ Admin Protected */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedLayout role="admin">
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/admin/states"
        element={
          <ProtectedLayout role="admin">
            <States />
          </ProtectedLayout>
        }
      />

      <Route
        path="/admin/cities"
        element={
          <ProtectedLayout role="admin">
            <Cities />
          </ProtectedLayout>
        }
      />

      <Route
        path="/admin/places"
        element={
          <ProtectedLayout role="admin">
            <PlacesAdmin />
          </ProtectedLayout>
        }
      />

      <Route
        path="/admin/places/new"
        element={
          <ProtectedLayout role="admin">
            <AddEditPlace />
          </ProtectedLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
