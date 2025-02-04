import { Grid2 as Grid } from "@mui/material"
import { createContext,  Dispatch,  useEffect, useReducer, useState } from "react"
import Login from "./Login"
import userReducer, { Action } from "./userReducer";
import ShowUser from "./showUser";
import UpdateUser from "./updateUser";
import { useType } from "../models";
import ButtonAdd from "./ButtonAdd";
import Register from "./register";
export const UserContext = createContext<{ user: useType, dispatch: Dispatch<Action> } | null>(null)
const Home = () => {

    const [user, dispatch] = useReducer(userReducer, {} as useType)
    const [isConnected, setIsConnected] = useState(false)
    const [toUpdate, setToUpdate] = useState(false)
    
    const handletoupdate = () => {
        setToUpdate(true)
    }
    const handleConected = () => {
        setIsConnected(true)
    }

    useEffect(() => {
        console.log('useffect user', user);
    }, [user]);

    return (<>
        <Grid container>
            <Grid>
                <UserContext value={{ user, dispatch }}>
                    {!isConnected && <div style={{ position: "absolute", top: "15px", left: "10px", display: "flex", justifyContent: "space-around", width: "200px" }}><Login func={handleConected} />
                        <Register func={handleConected} /></div>}
                    {isConnected && <ShowUser func={handletoupdate} />}
                    {toUpdate && <UpdateUser/>}
                    {isConnected&&<ButtonAdd/>} 
                </UserContext>
            </Grid>
        </Grid>
    </>)
}
export default Home;