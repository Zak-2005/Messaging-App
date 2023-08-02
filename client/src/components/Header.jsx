import '../css/header.css'
export default function Header({showUserList, currentChat}){
    return(
        <div className="header">
            <h3>{currentChat}</h3>
            <div className='icon-holder'>
                <img src="../../public/notif.png" alt="notification bell" className='icon'/>
                <img src="../../public/users.png" alt="user list" className='icon' onClick={()=>showUserList()}/>
            </div>
        </div>
    )
}