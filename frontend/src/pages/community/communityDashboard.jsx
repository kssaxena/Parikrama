import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingUI from "../../components/LoadingUI";
import { FetchData } from "../../utils/FetchFromApi";
import { clearUser } from "../../redux/slices/authSlice";

const CommunityDashboard = ({
  startLoading,
  stopLoading,
  showQuickActions = true,
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [personalData, setPersonalData] = useState();
  const [communityData, setCommunityData] = useState();
  const [bankData, setBankData] = useState();
  const [userRequests, setUserRequests] = useState([]);
  const [communityRequests, setCommunityRequests] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [communityFollowers, setCommunityFollowers] = useState([]);
  const [active, setActive] = useState(
    () => localStorage.getItem("active") || "Followers",
  );

  const CSSClassName =
    "w-full flex flex-col justify-center items-center shadow p-5 bg-neutral-200 gap-4 rounded-xl ";
  const CSSClassNameP =
    "w-full flex justify-between items-center border-b border-neutral-300";

  const DashboardData = async () => {
    try {
      startLoading();
      const response = await FetchData(
        `communities/community/dashboard/${user?._id}`,
        "get",
      );
      console.log(response);
      setUserRequests(response.data.data.userFollowRequests);
      setCommunityRequests(response.data.data.communityFollowRequests);
      setUserFollowers(response.data.data.acceptedRequestsUser);
      setCommunityFollowers(response.data.data.acceptedRequestsCommunity);
      setData(response.data.data || []);
      setPersonalData(response.data.data.personalDetails || []);
      setCommunityData(response.data.data.communityDetails || []);
      setBankData(response.data.data.communityDetails.bankDetails || []);
    } catch (err) {
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    DashboardData();
  }, [user]);

  const logout = () => {
    localStorage.clear();
    dispatch(clearUser());
    alert("You are logged out successfully");
    navigate("/");
  };

  const Card = ({ name, number, id, img, userType, showButton = true }) => {
    const acceptRequest = async () => {
      try {
        startLoading();
        const response = await FetchData(
          `communities/community/accept-request/${user?._id}`,
          "post",
          {
            userId: id,
            userType: userType,
          },
        );
        console.log(response);
        alert(response.data.message);
        DashboardData();
      } catch (err) {
        console.log(err);
      }
    };

    const rejectRequest = async () => {
      try {
        startLoading();
        const response = await FetchData(
          `communities/community/accept-request/${user?._id}`,
          "post",
          {
            userId: id,
            userType: userType,
          },
        );
        console.log(response);
        alert(response.data.message);
        DashboardData();
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className="flex justify-between items-center bg-neutral-100 shadow-md hover:shadow-xl duration-300 ease-in-out hover:scale-105 p-4 rounded-xl w-full md:w-96 ">
        <div className="flex flex-col justify-center items-center gap-2 relative">
          <img
            className="w-20 bg-neutral-200 rounded-full"
            src={
              img ||
              "https://ik.imagekit.io/parikrama/gray-user-profile-icon-png-fP8Q1P.png"
            }
          />
          <p className="absolute top-0 right-0 ">
            {userType === "User" ? (
              <span className="bg-green-300 font-semibold text-[10px] text-green-600 p-1 rounded-xl">
                User
              </span>
            ) : (
              <span className="bg-yellow-300 font-semibold text-[10px] text-yellow-600 p-1 rounded-xl">
                Community
              </span>
            )}
          </p>
        </div>
        <h1 className="flex flex-col justify-center items-center gap-2">
          <span>{name}</span>
          {/* <span>{number}</span> */}
          {showButton === true ? (
            <div className="flex justify-center items-center gap-2">
              <Button label={"Accept"} onClick={() => acceptRequest()} />
              <Button label={"Reject"} onClick={() => rejectRequest()} />
            </div>
          ) : (
            ""
          )}
        </h1>
      </div>
    );
  };

  const sections = ["Followers", "Follow Requests"];

  return (
    <div className="flex justify-between items-start p-10">
      <div className="flex flex-col justify-center items-center gap-10">
        {/* personal details  */}
        <div className={`${CSSClassName}`}>
          <h1 className="font-semibold text-xl">Personal details</h1>
          <div className="flex w-full justify-between items-center flex-col md:flex-row gap-5">
            {" "}
            <div className="w-28 lg:w-60 h-28 lg:h-60 bg-neutral-400 rounded-full overflow-hidden shadow-2xl ">
              <img
                src={data?.images?.profileImage?.url}
                className="w-full h-full object-cover"
              />
              {/* <img src={imageData?.profileImage?.url} className="w-full h-full" /> */}
            </div>
            <div className="flex flex-col justify-start items-center gap-5">
              <p className={`${CSSClassNameP}`}>
                <strong>Name: </strong>
                {personalData?.name}
              </p>
              <p className={`${CSSClassNameP}`}>
                <strong>Email: </strong>
                {personalData?.email}
              </p>
              <p className={`${CSSClassNameP}`}>
                <strong>Contact number: </strong>
                {personalData?.contactNumber}
              </p>
              {personalData?.aadhar ? (
                <p className={`${CSSClassNameP}`}>
                  <strong>Aadhar details: </strong>
                  {personalData?.aadhar}
                </p>
              ) : (
                ""
              )}
              {personalData?.pan ? (
                <p className={`${CSSClassNameP}`}>
                  <strong>Pan details</strong>
                  {personalData?.pan || "No data"}
                </p>
              ) : (
                ""
              )}
              {showQuickActions === true ? (
                <div>
                  <div className="flex justify-center items-center gap-10">
                    {/* <Button label={"Add new member"} /> */}
                    <Button label={"Logout"} onClick={() => logout()} />
                    <Button label={"Update Profile"} onClick={() => logout()} />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* community details  */}
        <div className={`${CSSClassName}`}>
          <h1 className="font-semibold text-xl">Community details</h1>
          <div className="w-28 lg:w-60 h-28 lg:h-60 bg-neutral-400 rounded-full overflow-hidden shadow-2xl">
            <img
              src={data?.images?.companyLogo?.url}
              className="w-full h-full"
            />
          </div>
          <p className={`${CSSClassNameP}`}>
            <strong>Name: </strong>
            {communityData?.communityName || "Kindly update your profile"}
          </p>
          {data?.communityEstablishment ? (
            <p className={`${CSSClassNameP}`}>
              <strong>Community establishment year: </strong>
              {data?.communityEstablishment}
            </p>
          ) : (
            ""
          )}
          {communityData?.communityEmail ? (
            <p className={`${CSSClassNameP}`}>
              <strong>Email: </strong>
              {communityData?.communityEmail}
            </p>
          ) : (
            ""
          )}
          <p className={`${CSSClassNameP}`}>
            <strong>Contact number: </strong>
            {communityData?.communityContactNumber}
          </p>
          {communityData?.gst ? (
            <p className={`${CSSClassNameP}`}>
              <strong>G.S.T.: </strong>
              {communityData?.gst}
            </p>
          ) : (
            ""
          )}
          <p className={`${CSSClassNameP}`}>
            <strong>Profession</strong>
            {communityData?.profession}
          </p>
        </div>
        {/* banking details  */}
        <div>
          {bankData?.bankName &&
          bankData?.ifsc &&
          bankData?.accountNumber &&
          bankData?.accountHolderName ? (
            <div className={`${CSSClassName}`}>
              <h1 className="font-semibold text-xl">Bank details</h1>
              <p className={`${CSSClassNameP}`}>
                <strong>Account holder name: </strong>
                {bankData?.accountHolderName}
              </p>
              <p className={`${CSSClassNameP}`}>
                <strong>Account number: </strong>
                {bankData?.accountNumber}
              </p>
              <p className={`${CSSClassNameP}`}>
                <strong>Bank name: </strong>
                {bankData?.bankName}
              </p>
              <p className={`${CSSClassNameP}`}>
                <strong>IFSC: </strong>
                {bankData?.ifsc}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* community description */}
        <div>
          {data?.about ? (
            <div className={`${CSSClassName}`}>
              <h1 className="font-semibold text-xl">About your community</h1>
              <p>{data?.about}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* requests */}
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 bg-neutral-200 rounded-xl py-5">
        <div className="flex justify-center items-center w-full">
          <nav>
            <ul className="flex md:gap-20 gap-5 items-center justify-center">
              {sections.map((section, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer transition-all duration-300 rounded-xl w-full px-4 py-2 text-nowrap ${
                    active === section
                      ? "bg-[#FFC20E] shadow-xl"
                      : "bg-neutral-100 "
                  }`}
                  onClick={() => {
                    localStorage.setItem("active", section);
                    setActive(section);
                  }}
                >
                  <p className="flex justify-between items-center">{section}</p>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="px-5 overflow-scroll w-full flex justify-center items-center flex-col">
          {active === "Followers" && (
            <div className="flex flex-col w-full md:w-fit justify-center items-center">
              <div className="w-full m-2">
                {userFollowers.map((r) => (
                  <Card
                    id={r?._id}
                    img={r?.images?.url}
                    name={r?.name}
                    number={r?.contactNumber}
                    userType={"User"}
                    showButton={false}
                  />
                ))}
              </div>
              <div className="w-full m-2">
                {communityFollowers?.map((r) => (
                  <Card
                    id={r?._id}
                    img={r?.images?.profileImage?.url}
                    name={r?.personalDetails?.name}
                    number={r?.personalDetails?.contactNumber}
                    userType={"Community"}
                    showButton={false}
                  />
                ))}
              </div>
            </div>
          )}
          {active === "Follow Requests" && (
            <div className="flex flex-col w-full md:w-fit justify-center items-center">
              <div className="w-full m-2">
                {userRequests.map((r) => (
                  <Card
                    id={r?._id}
                    img={r?.images?.url}
                    name={r?.name}
                    number={r?.contactNumber}
                    userType={"User"}
                  />
                ))}
              </div>
              <div className="w-full m-2">
                {communityRequests?.map((r) => (
                  <Card
                    id={r?._id}
                    img={r?.images?.profileImage?.url}
                    name={r?.personalDetails?.name}
                    number={r?.personalDetails?.contactNumber}
                    userType={"Community"}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingUI(CommunityDashboard);
