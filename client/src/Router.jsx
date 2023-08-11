import {HashRouter, Route, Routes} from "react-router-dom"
import App from "./App"
import Register from "./components/Auth/Register"
import Settings from "./components/MainApp/Settings"
import Login from "./components/Auth/Login"
import NotFound from "./components/404/NotFound"
export default function Router(){

    return(
        <HashRouter>
        <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<App />}/>
        <Route path="/:user" element={<Settings/>}/>
        <Route path="/404" element={<NotFound />}/>
        </Routes>
        </HashRouter>
    )
}