import {BrowserRouter, Route, Routes} from "react-router-dom"
import App from "./App"
import Register from "./components/Auth/Register"
import Settings from "./components/MainApp/Settings"
import Login from "./components/Auth/Login"
import Profile from "./components/MainApp/Profile"
export default function Router(){

    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<App />}/>
        <Route path="/:user" element={<Settings/>}/>
        </Routes>
        </BrowserRouter>
    )
}