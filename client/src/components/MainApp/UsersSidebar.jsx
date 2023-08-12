import "../../css/usersSidebar.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function UsersSidebar({ userList, currentUser, setUserList }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await axios.get("https://messagingapp-api.onrender.com/user");
      setUsers(allUsers.data);
    };
    getAllUsers();
  }, []);

  const handleAddFriend = async (friend) => {
    try {
      await axios.post("https://messagingapp-api.onrender.com/friend", {
        user: currentUser.username,
        friend: friend,
      });
      alert("Refresh the page to see changes");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFriend = async (friend) => {
    try {
      const response = await axios.delete("https://messagingapp-api.onrender.com/friend", {
        data: { user: currentUser.username, friend: friend },
      });
      alert("Refresh the page to see changes");
    } catch (err) {
      console.error(err);
    }
  };

  const renderFriend = (friendId) => {
    const friend = users.find((user) => user._id === friendId);
    if (friend) {
      return (
        <li key={uuidv4()}>
          <Link to={`/${friend.username}`}>
            <strong>{friend.username}</strong>
          </Link>
          <button
            className="removeFriend"
            onClick={() => handleRemoveFriend(friend.username)}
          >
            -
          </button>
        </li>
      );
    } else return null; // Handle the case when the friend is not found
  };

  return (
    <div className={userList ? "userList visible" : "userList"}>
      {userList ? (
        <ul>
          <div className="close-list">
            <img
              src="/close.png"
              alt="invite to server"
              onClick={() => setUserList(false)}
            />
          </div>

          <div>
            {" "}
            <li>
              <strong>You: </strong>
            </li>
            <li>{currentUser.username}</li>
          </div>
          <li>
            <strong>Friends:</strong>
          </li>
          {currentUser.friends.map((friend) => {
            return renderFriend(friend);
          })}
          <li>
            <strong>Users:</strong>
          </li>
          {users.map((user) => {
            if (
              user.username !== currentUser.username &&
              !currentUser.friends.includes(user._id)
            ) {
              return (
                <div>
                  <li key={uuidv4()}>
                    <Link to={`/${user.username}`}> {user.username}</Link>
                    <button
                      className="addFriend"
                      onClick={() => handleAddFriend(user.username)}
                    >
                      +
                    </button>
                  </li>
                </div>
              );
            }
            return null; // Don't render the current user in the list
          })}
        </ul>
      ) : null}
    </div>
  );
}
