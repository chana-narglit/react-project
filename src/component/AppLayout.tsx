import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Home from "./Home"


const AppLayout=()=>{
    return(<>
        <NavBar/>
        <Home/>
        <Outlet/>
    </>)
}
export default AppLayout



