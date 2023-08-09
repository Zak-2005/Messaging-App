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
  const [inviteToChatModal, setInviteToChatModal] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
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
        setAccessToken(response.data.accessToken);
        const loadData = await axios.post(
          "http://localhost:3500/user",
          {},
          {
            headers: {
              authorization: `Bearer ${response.data.accessToken}`,
            },
          }
        );
        console.log(loadData.data);
        setCurrentUser(loadData.data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    refreshAccessToken();
  }, []);

  const showUserList = () => {
    setUserList(!userList);
  };
  const changeCurrentChat = (chatName) => {
    setCurrentChat(chatName);
  };
  const handleInviteToChat = () => {
    setInviteToChatModal(!inviteToChatModal);
  };
  return (
    <div className="app">
      <ChatsSidebar
        changeCurrentChat={changeCurrentChat}
        currentUser={currentUser ? currentUser : ""}
        currentChat={currentChat}
      />
      <Header
        showUserList={showUserList}
        currentChat={currentChat}
        handleInviteToChat={handleInviteToChat}
        currentUser={currentUser ? currentUser : ""}
      />

      <CurrentChat
        currentChat={currentChat}
        currentUser={currentUser ? currentUser : ""}
        inviteToChatModal={inviteToChatModal}
        handleInviteToChat={handleInviteToChat}
      />

      <UsersSidebar
        userList={userList}
        currentUser={currentUser ? currentUser : ""}
      />
    </div>
  );
}

export default App;
