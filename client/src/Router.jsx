import {BrowserRouter, Route, Routes} from "react-router-dom"
import App from "./App"
import Register from "./components/Auth/Register"
import Settings from "./components/MainApp/Settings"
import Header from "./components/MainApp/Header"
export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/dashboard" element={<App/>}/>
        <Route path="/settings" element={<Settings/>}/>
        </Routes>
        </BrowserRouter>
    )
}