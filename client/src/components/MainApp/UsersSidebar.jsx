import '../../css/usersSidebar.css'
export default function UsersSidebar({userList}) {
    return(
        <div className='userList'>
        {userList?
            <ul>
            <li>test</li>
            <li>Example Chat</li>
            <li>Example Chat</li>
            <li>Example Chat</li>
            <li>Example Chat</li>
            <li>Add Chat</li>
        </ul>:null}
        </div>
    )
}