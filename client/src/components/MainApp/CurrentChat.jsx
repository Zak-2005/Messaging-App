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
  const [friendIds, setFriendIds] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
  const [fetchMessages, setFetchMessages] = useState(false);

  useEffect(() => {
      const handleGetAllChatMessages = async () => {
        const allMessages = await axios.post(
          "https://MessageApp-api.onrender.com/message/all",
          {
            currentChat: currentChat,
          },
          { withCredentials: true }
        );
        setCurrentMessages(allMessages.data);
      };

    const getCurrentChatInfo = async () => {
      const chatInfo = await axios.post("https://MessageApp-api.onrender.com/chat/current", {
        chat: currentChat,
      });
      setCurrentChatInfo(chatInfo.data);
      console.log(chatInfo.data);
    };
    const getFriendIds = async () => {
      try {
        const response = await axios.get("https://MessageApp-api.onrender.com/user");
        const allUsers = response.data;
        setAllUsersData(allUsers);
        const friendIds = allUsers
          .filter((friend) => currentUser.friends.includes(friend._id))
          .map((friend) => ({ username: friend.username, id: friend._id }));

        console.log(friendIds);
        setFriendIds(friendIds);
      } catch (error) {
        console.error("Error fetching friend IDs:", error);
      }
    };
    handleGetAllChatMessages();
    getCurrentChatInfo();
    getFriendIds();
  }, [currentChat, currentUser, fetchMessages]);

  const handleNewMessage = async () => {
    const newMessage = axios.post(
      "https://MessageApp-api.onrender.com/message",
      {
        chat: currentChat,
        message: message,
        user: currentUser._id,
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
  const addFriendToChat = async (friend) => {
    const addFriend = await axios.post("https://MessageApp-api.onrender.com/chat/addToChat", {
      chat: currentChat.id,
      user: friend,
    });
  };

  return (
    <div className="currentChat">
      <ul className="chatMessages">
        {currentMessages.map((message) => {
          return (
            <div className="message">
              <h3
                className={
                  currentUser._id === message.user ? "currentUser" : "otherUser"
                }
              >
                {
                  allUsersData.find((user) => user._id === message.user)
                    .username
                }
                :
              </h3>
              <li
                key={uuidv4()}
                className={
                  currentUser._id === message.user ? "currentUser" : ""
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
              <h1>Invite Friends to {currentChat.name}</h1>
              {friendIds.length === 0 ? (
                <p>No Friends to invite</p>
              ) : (
                <ul>
                  {friendIds.map((friend) => (
                    <div className="modal-friends" key={friend.id}>
                      <li>{friend.username}</li>
                      {currentChatInfo.users.includes(friend.id) ? (
                        <button>Already Added</button>
                      ) : (
                        <button
                          onClick={() => addFriendToChat(friend.username)}
                        >
                          Add to Chat
                        </button>
                      )}
                    </div>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
