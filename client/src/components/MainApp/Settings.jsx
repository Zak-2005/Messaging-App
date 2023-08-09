import "../../css/settings.css";
import Profile from "./Profile";
import {Link} from "react-router-dom"
import {useEffect, useState} from 'react'
import { useParams, } from "react-router-dom";
import axios from "axios";
export default function Settings() {
  const user = useParams();
  const [foundUserInfo, setFoundUserInfo] = useState(null)
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await axios.post("http://localhost:3500/user/otherUser", {
        user: user.user,
      });
       await setFoundUserInfo(userInfo.data);
    };
    getUserInfo()
  },[rerender]);
  
  return (
    <div className="settingsContainer">
      <div className="settingsTitle">
        <h1>{foundUserInfo?foundUserInfo.username:""}'s Profile</h1>
      </div>

      <div className="settingsSidebar">
        <ul className="settings">
          <li>Profile</li>
          <Link to="/dashboard" ><li>Dashboard</li></Link>
          <Link to="/" className="logout"><li>Logout</li></Link>
        </ul>
      </div>
      <Profile foundUserInfo={foundUserInfo?foundUserInfo:""} rerender={rerender} setRerender={setRerender}/>
      
    </div>
  );
}
