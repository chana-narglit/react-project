
import { Avatar, Box, Button } from "@mui/material"
import  { useContext } from "react"
import { deepPurple } from "@mui/material/colors"
import { UserContext } from "./Home"

const ShowUser = ({ func }: { func: Function }) => {

    const user = useContext(UserContext);
    const userName = user && user.user.firstName;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'absolute', top: '16px', left: '16px' }}>
            <Button onClick={() => { func() }} sx={{ marginRight: '8px' }}>
                <Avatar sx={{ bgcolor: "#8B5E3C" }}>
                    {userName?.charAt(0)}
                </Avatar>
            </Button>
        </Box>
        
    );
};

export default ShowUser;


