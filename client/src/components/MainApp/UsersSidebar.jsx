import "../../css/usersSidebar.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
export default function UsersSidebar({ userList, currentUser }) {
  const [users, setUsers] = useState("");
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await axios.get("http://localhost:3500/user");
      setUsers(allUsers.data);
    };
    getAllUsers();
  }, []);

  const handleAddFriend = async (friend) => {
    try {
      await axios.post("http://localhost:3500/friend", {
        user: currentUser.username,
        friend: friend,
      });
      alert('Refresh the page to see changes')
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFriend = async (friend) => {
    try {
      const response = await axios.delete("http://localhost:3500/friend", {
        data: { user: currentUser.username, friend: friend },
      });
      alert('Refresh the page to see changes')
    } catch (errr) {
      console.error(err);
    }
  };

  return (
    <div className="userList">
      {userList ? (
        <ul>
          <li>
            <strong>You: </strong> {currentUser.username}
          </li>
          <li>
            <strong>Friends:</strong>
          </li>
          {currentUser.friends.map((friend) => (
            <li key={uuidv4()}>
              <strong>{friend}</strong>
              <button
                className="removeFriend"
                onClick={() => handleRemoveFriend(friend)}
              >
                -
              </button>
            </li>
          ))}
          <li>
            <strong>Users:</strong>
          </li>
          {users.map((user) => {
            if (
              user.username !== currentUser.username &&
              !currentUser.friends.includes(user.username)
            ) {
              return (
                <div>
                  <li key={uuidv4()}>
                    {user.username}
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
