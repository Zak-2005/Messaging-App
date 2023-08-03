import "../../css/chatsSidebar.css";
export default function ChatsSidebar({ changeCurrentChat }) {
  return (
    <div className="chatsSidebar">
      <ul >
        <li onClick={(e) => changeCurrentChat(e.target.textContent)}>
          Main Chat
        </li>
        <li onClick={(e) => changeCurrentChat(e.target.textContent)}>
          Example Chat
        </li>
        <li onClick={(e) => changeCurrentChat(e.target.textContent)}>
          Example Chat
        </li>
        <li onClick={(e) => changeCurrentChat(e.target.textContent)}>
          Example Chat
        </li>
        <li onClick={(e) => changeCurrentChat(e.target.textContent)}>
          Example Chat
        </li>
        <li onClick={(e) => changeCurrentChat(e.target.textContent)}>
          Add Chat
        </li>
      </ul>
    </div>
  );
}
