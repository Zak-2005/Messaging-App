import "../../css/mainContent.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function CurrentChat({ currentChat }) {
  const [message, setMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  const [fetchMessages, setFetchMessages] = useState(false);

  useEffect(() => {
    const handleGetAllChatMessages = async () => {
      const allMessages = await axios.post(
        "http://localhost:3500/message/all",
        { currentChat: currentChat },
        { withCredentials: true }
      );
      setCurrentMessages(allMessages.data);
    };
    handleGetAllChatMessages();
  }, [currentChat,fetchMessages]);

  const handleNewMessage = async () => {
    const newMessage = axios.post(
      "http://localhost:3500/message",
      {
        currentChat: currentChat,
        message: message,
      },
      {
        withCredentials: true,
      }
    );
    setMessage("");
    setFetchMessages(!fetchMessages)
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNewMessage();
    }
  };
  return (
    <>
      <div className="currentContent">
        {currentMessages.map((message) => {
          return <p key={uuidv4()}>{message.message}</p>;
        })}
      </div>
      <div className="messageBarContainer">
        <input
          type="text"
          className="messageBar"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
}
