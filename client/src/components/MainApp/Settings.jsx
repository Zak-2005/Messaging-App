import "../../css/settings.css";
import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Settings() {
  const user = useParams();
  const navigate = useNavigate();
  const [foundUserInfo, setFoundUserInfo] = useState(null);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await axios.post(
          "http://localhost:3500/user/otherUser",
          {
            user: user.user,
          }
        );
        setFoundUserInfo(userInfo.data)
      } catch (err) {
        console.error(err);
        navigate("/404");
      }
    };
    getUserInfo();
  }, [rerender]);

  const handleLogout = async () => {
    const response = await axios.delete("http://localhost:3500/logout", {
      withCredentials: true,
    });
    navigate("/");
  };
  return (
    <div className="settingsContainer">
      <div className="settingsTitle">
        <h1>{foundUserInfo ? foundUserInfo.username : ""}'s Profile</h1>
      </div>

      <div className="settingsSidebar">
        <ul className="settings">
          <Link to="/dashboard">
            <li className="dashboard">Dashboard</li>
          </Link>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      <Profile
        foundUserInfo={foundUserInfo ? foundUserInfo : ""}
        rerender={rerender}
        setRerender={setRerender}
      />
    </div>
  );
}
