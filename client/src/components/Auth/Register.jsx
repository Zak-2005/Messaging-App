import '../../css/register.css'
import axios from 'axios'
import {useState} from "react"
import {Link} from 'react-router-dom'
export default function Register(){
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [registerFailed, setRegisterFailed] = useState(false)
    const handleSetUser = (value)=>{
        console.log(user)
        setUser(value)
    }
    const handleSetPass = (value)=>{
        setPass(value)
    }

    const handleRegister = async(user, pass, e)=>{
        e.preventDefault();

        const registerInfo = {
            user: user,
            pass: pass
        }

        try{
            const response = await axios.post('https://MessageApp-api.onrender.com/register', registerInfo)
            console.log(response.data)
            if(response.data){
                window.location.href = '/login';
            }
        }catch(err){
            setRegisterFailed(true)
        }

    }
    return(
        <div className="registerContainer">
            <div className="registerForm">
                <h1 className='formTitle'>Create an Account:</h1>
                <form method="POST" onSubmit={(e)=>handleRegister(user, pass, e)}>
                    <div className='inputField'>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="user" placeholder="Enter your username:" value={user} onChange={(e)=>handleSetUser(e.target.value)}/>
                    </div>
                    <div className='inputField'>
                        <label htmlFor="pass">Password:</label>
                        <input type="password" name="pass" placeholder="Enter your password:" value={pass} onChange={(e)=>handleSetPass(e.target.value)}/>
                    </div>
                    <button type="submit">Finish!</button>
                    
                </form>
                {registerFailed?
                    <div className='warning'>Username already taken, <Link to="/login">login</Link></div>:null}
            </div>
        </div>
    )
}