import "../../css/chatsSidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function ChatsSidebar({ changeCurrentChat, currentUser}) {
  const [chatForm, setChatForm] = useState(false);
  const [newChat, setNewChat] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [fetchChats, setFetchChats] = useState(false);
  useEffect(() => {
    const getAllChats = async () => {
      const chats = await axios.get("https://messagingapp-api.onrender.com/chat", {
        withCredentials: true,
      });
      setAllChats(chats.data);
    };
    getAllChats();
    console.log(allChats)
  }, [fetchChats]);
  const handleNewChat = async ({name, id}) => {
    const newChat = await axios.post(
      "https://MessageApp-api.onrender.com/chat",
      { chat: name, user:currentUser.username, chatID: id},
      { withCredentials: true }
    );
    setChatForm(false);
    setFetchChats(!fetchChats);
  };
  return (
    <div className="chatsSidebar">
      <ul >
        {allChats.map((chat) => {
          if(chat.users.includes(currentUser._id)){
          return (
            <li
              key={uuidv4()}
              onClick={(e) => changeCurrentChat({name:chat.name, id:chat.chatID})}
            className="chat"
            >
              {chat.name}
            </li>
          );}
        })}

        <li onClick={() => setChatForm(true)} className="chat">Add Chat</li>
        {chatForm ? (
          <div className="newChatForm">
            <input
              type="text"
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              onSubmit={() => handleNewChat({name: newChat, id:uuidv4()})}
            />
            <div className="formControl">
              <button onClick={() => handleNewChat({name: newChat, id:uuidv4()})}>Add</button>
              <button onClick={() => setChatForm(false)}>Cancel</button>
            </div>
          </div>
        ) : null}
      </ul>
    </div>
  );
}

/**/
