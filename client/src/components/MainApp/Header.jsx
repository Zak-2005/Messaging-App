import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import App from "../../App"
import Register from "../Auth/Register"
import '../../css/header.css'
export default function Header({showUserList, currentChat, handleInviteToChat}){
    return(
        <div className="header">
            <h3>{currentChat}</h3>
            <div className='icon-holder'>
                <img src="../../public/invite.png" alt="invite to server" className='icon' onClick={()=>handleInviteToChat()}/>
                <img src="../../public/users.png" alt="user list" className='icon' onClick={()=>showUserList()}/>
                <Link to="/settings"><img src="../../public/settings.png" alt="settings" className='icon'/></Link>
            </div>
        </div>
    )
}