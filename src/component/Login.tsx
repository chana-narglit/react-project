import { useContext, useRef, useState } from "react"
import { Alert, AlertTitle, Box, Button, Modal, Snackbar, TextField } from "@mui/material";
import '../App.css';
import axios from "axios";
import { UserContext } from "./Home";
const Login = ({ func }: { func: Function }) => {
    const[error,setError]=useState(false)
    const user = useContext(UserContext)
    const [isShowLogin, setShowLogin] = useState(false)
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const url = 'http://localhost:3000/api/user/'
   
    const handleShowLogin = () => {
        setShowLogin(true)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post(url + 'login', {
                email: emailRef.current?.value,
                password: passwordRef.current?.value    
            })
            console.log(res);
            if (res.status != 401) {
                func()
                console.log(res.data.user.id);
                user?.dispatch({
                    type: 'Update',
                    data:
                    {
                        id: res.data.user.id,
                        firstName: res.data.user.firstName
                    },
                })
                console.log("user",user);
                console.log(user?.user.id);
            }
        }
        catch (e:any) {
         if(e.status===401)
            setError(true)
        }
    }
 
    return (
        <>
            <div className="login-button-container">
                {!isShowLogin && <Button id="User-login" onClick={handleShowLogin} variant="contained"  style={{ backgroundColor: "#8B5E3C" }} >User login</Button>}
            </div>
            {<Modal open={isShowLogin}>
                <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '5%' }}>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Email" type="email" fullWidth inputRef={emailRef} />
                        <TextField label="Password" type="password" fullWidth inputRef={passwordRef} />
                        <Button type="submit" variant="contained" style={{ backgroundColor: "#FEEC96" }} >save</Button>
                    </form>
                </Box>
            </Modal>}
               <Snackbar open={error} 
           onClose={()=>setError(false)}
           anchorOrigin={{ vertical: "top", horizontal: "center" }} >
            <Alert
            onClose={()=>setError(false)}
          severity="error" 
          sx={{ width: "100%" }}>
            <AlertTitle >error</AlertTitle>
            user not found: email or password ar not correct
            </Alert>
           </Snackbar> 
        </>
    )
}

export default Login