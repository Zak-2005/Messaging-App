import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import UsersSidebar from "./components/UsersSidebar";
import CurrentChat from "./components/CurrentChat";
import MessageBar from "./components/MessageBar";
import ChatsSidebar from "./components/ChatsSidebar";

function App() {
  const [userList, setUserList] = useState(false);
  const [currentChat, setCurrentChat] = useState("Main Chat")

  const showUserList =() =>{
    setUserList(!userList);
  }
  const changeCurrentChat = (chatName)=>{
    setCurrentChat(chatName)
  }
  return (
    <div className="container">
      <ChatsSidebar changeCurrentChat={changeCurrentChat}/>
      <Header showUserList={showUserList} currentChat={currentChat}/>
        <div className="mainContent">
          <CurrentChat currentChat={currentChat}/>
          <MessageBar />
        </div>
      <UsersSidebar userList={userList} />
    </div>
  );
}

export default App;
