import { useState } from "react";
import "./App.css";
import Header from "./components/MainApp/Header";
import UsersSidebar from "./components/MainApp/UsersSidebar";
import CurrentChat from "./components/MainApp/CurrentChat";
import ChatsSidebar from "./components/MainApp/ChatsSidebar";

function App() {
  const [userList, setUserList] = useState(false);
  const [currentChat, setCurrentChat] = useState("Main Chat");

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
      <UsersSidebar userList={userList} />
    </div>
  );
}

export default App;
