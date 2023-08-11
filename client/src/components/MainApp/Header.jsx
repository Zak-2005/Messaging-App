import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import App from "../../App"
import Register from "../Auth/Register"
import '../../css/header.css'
export default function Header({showUserList, currentChat, handleInviteToChat, currentUser}){
    return(
        <div className="header">
            <h3>{currentChat.name}</h3>
            <div className='icon-holder'>
                <img src="/invite.png" alt="invite to server" className='icon' onClick={()=>handleInviteToChat()}/>
                <img src="/users.png" alt="user list" className='icon' onClick={()=>showUserList()}/>
                <Link to={`/${currentUser.username}`}><img src="../../public/settings.png" alt="settings" className='icon'/></Link>
            </div>
        </div>
    )
}