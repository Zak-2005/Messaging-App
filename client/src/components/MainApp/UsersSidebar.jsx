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
    console.log(users);
  }, []);
  return (
    <div className="userList">
      {userList ? (
        <ul>
          <li>
            <strong>You:</strong> {currentUser}
          </li>
          <li><strong>Users:</strong></li>
          {users.map((user) => {
            if(user.username!==currentUser) return <li id={uuidv4()}>{user.username}</li>;
          })}
        </ul>
      ) : null}
    </div>
  );
}
