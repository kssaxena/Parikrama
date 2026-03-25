import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import Explore from "../explore/explore";
import { FetchData } from "../../utils/FetchFromApi";
import RandomImageSlider from "../../components/ui/RandomImageSlider";
import LoadingUI from "../../components/LoadingUI";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/slices/authSlice";

const UserDashboard = ({ startLoading, stopLoading }) => {
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = localStorage.role;
  const [rightBanner, setRightBanner] = useState([]);
  const right = rightBanner?.map((banner) => [banner?.images?.url]);
  const banner = async () => {
    try {
      startLoading();
      const response = await FetchData("promotions/get/all/promotions", "get");
      setRightBanner(response.data.data.promotionsMid);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    banner();
  }, []);

  const logout = () => {
    localStorage.clear();
    dispatch(clearUser());
    alert("You are logged out successfully");
    navigate("/");
  };

  const userData = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Contact number", value: user?.contactNumber },
    { label: "Address", value: user?.address },
    { label: "City", value: user?.city },
    { label: "State", value: user?.state },
  ];
  return userRole === "User" ? (
    <div>
      <h1>Welcome to your profile</h1>

      <div className="flex justify-center items-center gap-20">
        <div className="md:w-1/2 flex flex-col w-[90%]">
          {userData?.map((u) => (
            <div>
              <h1 className="flex justify-between items-center gap-10 border-b border-neutral-300 p-3 w-full">
                <strong>{u.label}: </strong>{" "}
                <span>{u.value || <p>Update your {u.label}</p>}</span>
              </h1>
            </div>
          ))}
          <div className="flex justify-start items-center md:gap-10 gap-5 p-5">
            <Button label={"Update Profile"} />
            <Button label={"Logout"} onClick={() => logout()} />
          </div>
        </div>
        <div className="w-96 h-96 hidden md:flex">
          <RandomImageSlider images={right} />
        </div>
      </div>
      <Explore userProfile={true} />
    </div>
  ) : (
    <div className="flex justify-center items-center w-full">
      <h2 className="text-2xl font-bold text-center">
        <p className="text-5xl ">⚠️</p>
        Restricted Access !! Please log in to view the dashboard.
      </h2>
    </div>
  );
};

export default LoadingUI(UserDashboard);
