import "../../css/mainContent.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function CurrentChat({ currentChat, currentUser }) {
  const [message, setMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
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
    handleGetAllChatMessages();
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
  return (
    <div className="currentChat">
      <ul className="chatMessages">
        {currentMessages.map((message) => {
          return (
            <div className="message">
              <h3
                className={
                  currentUser === message.user ? "currentUser" : "otherUser"
                }
              >
                {message.user}:
              </h3>
              <li
                key={uuidv4()}
                className={currentUser === message.user ? "currentUser" : ""}
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
    </div>
  );
}
