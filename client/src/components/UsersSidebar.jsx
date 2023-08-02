import '../css/usersSidebar.css'
export default function UsersSidebar({userList}) {
    return(
        <>
        {userList?
            <ul>
            <li>Main Chat</li>
            <li>Example Chat</li>
            <li>Example Chat</li>
            <li>Example Chat</li>
            <li>Example Chat</li>
            <li>Add Chat</li>
        </ul>:null}
        </>
    )
}