import "../../css/chatsSidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function ChatsSidebar({ changeCurrentChat }) {
  const [chatForm, setChatForm] = useState(false);
  const [newChat, setNewChat] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [fetchChats, setFetchChats] = useState(false);
  useEffect(() => {
    const getAllChats = async () => {
      const chats = await axios.get("http://localhost:3500/chat", {
        withCredentials: true,
      });
      setAllChats(chats.data);
    };
    getAllChats();
  }, [fetchChats]);
  const handleNewChat = async (value) => {
    const newChat = await axios.post(
      "http://localhost:3500/chat",
      { chat: value },
      { withCredentials: true }
    );
    setChatForm(false);
    setFetchChats(!fetchChats);
  };
  return (
    <div className="chatsSidebar">
      <ul>
        {allChats.map((chat) => {
          return (
            <li
              key={uuidv4()}
              onClick={(e) => changeCurrentChat(e.target.textContent)}
            >
              {chat.name}
            </li>
          );
        })}

        <li onClick={() => setChatForm(true)}>Add Chat</li>
        {chatForm ? (
          <div className="newChatForm">
            <input
              type="text"
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              onSubmit={() => handleNewChat(newChat)}
            />
            <div className="formControl">
              <button onClick={() => handleNewChat(newChat)}>Add</button>
              <button onClick={() => setChatForm(false)}>Cancel</button>
            </div>
          </div>
        ) : null}
      </ul>
    </div>
  );
}

/**/
