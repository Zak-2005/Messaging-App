import "../../css/settings.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Profile({ foundUserInfo, rerender, setRerender }) {
  const [editProfile, setEditProfile] = useState(false);
  const [changeUsername, setChangeUsername] = useState("");
  const [changeBio, setChangeBio] = useState("");
  const [changePass, setChangePass] = useState("");
  const [enterCurrentPass, setEnterCurrentPass] = useState("");
  const currentUsername = useRef();
  const currentBio = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    currentUsername.current = foundUserInfo.username;
    currentBio.current = foundUserInfo.bio;
    setChangeUsername(foundUserInfo.username);
    setChangeBio(foundUserInfo.bio);
  }, [foundUserInfo]);

  const handleEditProfile = async () => {
    try {
      if (currentUsername.current !== changeUsername) {
        console.log(currentUsername);
        console.log(changeUsername);
        const editUsername = await axios.put(
          "http://localhost:3500/user/newUsername",
          {
            currentUsername: currentUsername.current,
            newUsername: changeUsername,
          }
        );
        setRerender(!rerender);
      }
      if (currentBio.current !== changeBio) {
        const editBio = await axios.put("http://localhost:3500/user/bio", {
          user: changeUsername,
          bio: changeBio,
        });
      }
      if (enterCurrentPass!== "" && changePass!== "") {
        const response = await axios.put("http://localhost:3500/user/newPass", {
          user: changeUsername,
          oldPass: enterCurrentPass,
          newPass: changePass
        });
      }
      currentUsername.current = changeUsername;
      currentBio.current = changeBio;
      setEditProfile(false);
      navigate(`/${changeUsername}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profileContainer">
      <div className="profile">
        <h2>
          Edit:{" "}
          <img
            src="../public/edit.png"
            alt="edit profile"
            className="icon"
            onClick={() => setEditProfile(true)}
          />
        </h2>

        <div className="profile-element">
          <h3 className="element-title">Username:</h3>
          {editProfile ? (
            <input
              type="text"
              placeholder="Edit username"
              value={changeUsername}
              onChange={(e) => setChangeUsername(e.target.value)}
            />
          ) : (
            <p>{currentUsername.current}</p>
          )}
        </div>
        <div className="profile-element">
          <h3 className="element-title">Bio:</h3>
          {editProfile ? (
            <input
              type="text"
              placeholder="Edit Bio"
              value={changeBio}
              onChange={(e) => setChangeBio(e.target.value)}
            />
          ) : (
            <p>{currentBio.current}</p>
          )}
        </div>

        {editProfile ? (
          <>
            <div className="profile-element">
              <h3 className="element-title">Change Password:</h3>
              <input
                type="text"
                placeholder="Current Password:"
                value={enterCurrentPass}
                onChange={(e) => setEnterCurrentPass(e.target.value)}
              />
              <input
                type="text"
                placeholder="Change Password:"
                value={changePass}
                onChange={(e) => setChangePass(e.target.value)}
              />
            </div>
            <button onClick={() => handleEditProfile()}>Submit</button>
          </>
        ) : null}
      </div>
    </div>
  );
}
