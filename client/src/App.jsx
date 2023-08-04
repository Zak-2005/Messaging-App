import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/MainApp/Header";
import UsersSidebar from "./components/MainApp/UsersSidebar";
import CurrentChat from "./components/MainApp/CurrentChat";
import ChatsSidebar from "./components/MainApp/ChatsSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App({ user }) {
  const [userList, setUserList] = useState(false);
  const [currentChat, setCurrentChat] = useState("Main Chat");
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3500/refresh",
          {},
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        console.log(response.data);
        const loadData = await axios.post(
          "http://localhost:3500/user",
          {},
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        await setCurrentUser(loadData.data);
      } catch (error) {
        console.error(error);
        navigate('/login')
      }
    };
    refreshAccessToken();
  }, [document.cookie]);

  const showUserList = () => {
    setUserList(!userList);
  };
  const changeCurrentChat = (chatName) => {
    setCurrentChat(chatName);
  };

  return (
    <div className="app">
      <ChatsSidebar changeCurrentChat={changeCurrentChat} />
      <Header showUserList={showUserList} currentChat={currentChat} />
      <div className="mainContent">
        <CurrentChat currentChat={currentChat} />
      </div>
      <UsersSidebar
        userList={userList}
        currentUser={currentUser ? currentUser.foundUser.username : ""}
      />
    </div>
  );
}

export default App;
