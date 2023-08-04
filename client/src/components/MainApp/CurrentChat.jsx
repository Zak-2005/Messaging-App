import "../../css/mainContent.css";
import {useState} from 'react'
export default function CurrentChat() {
     const [message,setMessage] = useState('')
  return (
    <>
      <div className="currentContent">
        <h3>Name</h3>
        <p>Text</p>
      </div>
      <div className="messageBarContainer">
        <input type="text" className="messageBar"value={message} onChange={(e)=>setMessage(e.target.value)}/>
      </div>
    </>
  );
}
