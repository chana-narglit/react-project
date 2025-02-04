import { useContext, useRef, useState } from "react"
import { Box, Button, Modal, TextField } from "@mui/material"
import '../App.css';
import { UserContext } from "./Home";
import axios from "axios";
const UpdateUser = () => {
    const user = useContext(UserContext)
    const [isUpdate, setUpdate] = useState(false)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    console.log("firstNameRef.current", firstNameRef.current);
    console.log("firstNameRef.current?.value", firstNameRef.current?.value);
    const handleSubmit = async (e: React.FormEvent) => {
        setUpdate(true)
        e.preventDefault()
       try{ const res = await axios.put('http://localhost:3000/api/user/', {
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value ,
            address: addressRef.current?.value  ,
            password: passwordRef.current?.value ,
            email: emailRef.current?.value ,
            phone: phoneRef.current?.value
        }, { headers: { 'user-id': user?.user.id } })
        if (res.status != 404) {
            console.log("update",user)
            user?.dispatch({
                type: 'Update',
                data: {
                    id: user.user.id,
                    firstName: firstNameRef.current?.value
                }
            })
          console.log("data in dispatch", user?.user.id, firstNameRef.current?.value);
        }
    }
    catch(e)
    {alert('something wrong...')}
    }
    return (<>
        {!isUpdate && <Modal open>
            <Box sx={{  width: 300, padding: 2,
                        backgroundColor: 'white', margin: 'auto',
                        maxHeight: '80%', overflowY: 'auto', 
                        marginTop: '10%', display: 'flex',
                        flexDirection: 'column',alignItems: 'center'
                    }}>
                <form  >
                    <TextField
                        inputRef={firstNameRef}
                        label="שם "
                        name="Name"
                        color="secondary"
                        fullWidth
                        margin="normal" />
                    <TextField
                        inputRef={lastNameRef}
                        label="שם משפחה"
                        name="lastName"
                        color="secondary"
                        fullWidth
                        margin="normal"/>
                    <TextField
                        type="email"
                        inputRef={emailRef}
                        label="מייל"
                        name="email"
                        color="secondary"
                        fullWidth
                        margin="normal" />
                    <TextField
                        inputRef={addressRef}
                        label="כתובת"
                        name="address"
                        color="secondary"
                        fullWidth
                        margin="normal" />
                    <TextField
                        inputRef={phoneRef}
                        label="טלפון"
                        name="phone"
                        color="secondary"
                        fullWidth
                        margin="normal"  />
                    <TextField
                        inputRef={passwordRef}
                        label="סיסמא"
                        name="password"
                        type="password"
                        color="secondary"
                        fullWidth
                        margin="normal"/>
                    <Button onClick={handleSubmit} variant="contained"  style={{ backgroundColor: "#FEEC96" }}> שמירה</Button>
                </form>
            </Box>
        </Modal >}
    </>)
}
export default UpdateUser