import {BrowserRouter, Route, Routes} from "react-router-dom"
import App from "./App"
import Register from "./components/Auth/Register"
export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<App/>}/>
        </Routes>
        </BrowserRouter>
    )
}