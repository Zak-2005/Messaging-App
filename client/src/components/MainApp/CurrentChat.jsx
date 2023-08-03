import "../../css/mainContent.css";

export default function CurrentChat() {
  return (
    <>
      <div className="currentContent">
        <h3>Name</h3>
        <p>Text</p>
      </div>
      <div className="messageBarContainer">
        <input type="text" className="messageBar"/>
      </div>
    </>
  );
}
