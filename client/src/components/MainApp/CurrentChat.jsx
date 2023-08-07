import "../../css/mainContent.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function CurrentChat({
  currentChat,
  currentUser,
  inviteToChatModal,
  handleInviteToChat,
}) {
  const [message, setMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentChatInfo, setCurrentChatInfo] = useState();
  const [fetchMessages, setFetchMessages] = useState(false);

  useEffect(() => {
    const handleGetAllChatMessages = async () => {
      const allMessages = await axios.post(
        "http://localhost:3500/message/all",
        {
          currentChat: currentChat,
          
        },
        { withCredentials: true }
      );
      setCurrentMessages(allMessages.data);
    };
    const getCurrentChatInfo = async() =>{
      const chatInfo = await axios.post('http://localhost:3500/chat/current', {chat:currentChat})
      setCurrentChatInfo(chatInfo.data)
      console.log(chatInfo.data)
    }
    handleGetAllChatMessages();
    getCurrentChatInfo()
  }, [currentChat, fetchMessages]);

  const handleNewMessage = async () => {
    const newMessage = axios.post(
      "http://localhost:3500/message",
      {
        currentChat: currentChat,
        message: message,
        currentUser: currentUser,
      },
      {
        withCredentials: true,
      }
    );
    setMessage("");
    setFetchMessages(!fetchMessages);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNewMessage();
    }
  };
  const handleModalClick = (e) => {
    // Prevent closing the modal when clicking inside the modal content
    e.stopPropagation();
  };
  const addFriendToChat = async(friend)=>{
    const addFriend = await axios.post("http://localhost:3500/chat/addToChat", {chat:currentChat,user:friend})
  }
  return (
    <div className="currentChat">
      <ul className="chatMessages">
        {currentMessages.map((message) => {
          return (
            <div className="message">
              <h3
                className={
                  currentUser.username === message.user
                    ? "currentUser"
                    : "otherUser"
                }
              >
                {message.user}:
              </h3>
              <li
                key={uuidv4()}
                className={
                  currentUser.username === message.user ? "currentUser" : ""
                }
              >
                {message.message}
              </li>
            </div>
          );
        })}
      </ul>
      <div className="messageBarContainer">
        <input
          type="text"
          className="messageBar"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {inviteToChatModal ? (
        <div className="modal">
          <div className="overlay" onClick={handleInviteToChat}>
            <div className="modal-content" onClick={handleModalClick}>
              <h1>Invite Friends to {currentChat}</h1>
              <ul>
                {currentUser.friends.map((friend) => {
                  return (
                    <div className="modal-friends">
                      <li>{friend}</li>
                      {currentChatInfo.users.includes(friend) ? (
                        <button>Already Added</button>
                      ) : (
                        <button onClick={()=>addFriendToChat(friend)}>Add to Chat</button>
                      )}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
