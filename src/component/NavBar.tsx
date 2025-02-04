
import { NavLink } from "react-router"
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const NavBar = () => {
    return (<>
        <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <nav style={{ padding: '10px', backgroundColor: 'white' }}>
                <NavLink to="/" style={({ isActive }: { isActive: boolean }) => ({
                    fontWeight: "bold",
                    margin: '0 10px',
                    color: isActive ?'#8B5E3C' : "black"
                })}>
                    <HomeIcon></HomeIcon>
                    Home Page
                </NavLink>
                |
                <NavLink to="/About" style={({ isActive }: { isActive: boolean }) => ({
                    fontWeight: "bold",
                    margin: '0 10px',
                    color: isActive ? '#8B5E3C' : "black"
                })}>
                    <InfoIcon></InfoIcon>
                    About Recipes
                </NavLink>
                |
                <NavLink to="/Recipies" style={({ isActive }: { isActive: boolean }) => ({
                    fontWeight: "bold",
                    margin: '0 10px',
                    color: isActive ? "#8B5E3C" : "black"
                })}>
                    <MenuBookIcon></MenuBookIcon>
                    Our Recipes
                </NavLink>
            </nav>
        </div>

    </>)
}

export default NavBar