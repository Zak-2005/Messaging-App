import "../../css/settings.css";

export default function Profile({foundUserInfo}) {


  return (
    <div className="profileContainer">
      <div className="profile">
        <img src="../public/invite.png" alt="Picture" />

        <div className="profile-element">
          <h3 className="element-title">Username:</h3>
          <p>{foundUserInfo?foundUserInfo.username:""}</p>
        </div>
        <div className="profile-element">
          <h3 className="element-title">Bio:</h3>
          <p>{foundUserInfo.bio?foundUserInfo.bio:"No Bio"}</p>
        </div>
      </div>
    </div>
  );
}
