import "../../css/settings.css";
import Profile from "./Profile";
import {Link} from "react-router-dom"
export default function Settings() {
  return (
    <div className="settingsContainer">
      <div className="settingsTitle">
        <h1>Profile</h1>
      </div>

      <div className="settingsSidebar">
        <ul className="settings">
          <li>Profile</li>
          <Link to="/"><li>Logout</li></Link>
        </ul>
      </div>
      <Profile />
      
    </div>
  );
}
