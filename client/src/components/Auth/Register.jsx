import '../../css/register.css'
export default function Register(){
    return(
        <div className="registerContainer">
            <div className="registerForm">
                <h1 className='formTitle'>Create an Account:</h1>
                <form action="" method="POST">
                    <div className='inputField'>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" placeholder="Enter your username:"/>
                    </div>
                    <div className='inputField'>
                        <label htmlFor="pass">Password:</label>
                        <input type="password" name="pass" placeholder="Enter your password:"/>
                    </div>
                    <button type="submit">Finish!</button>
                </form>
            </div>
        </div>
    )
}