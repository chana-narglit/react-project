import axios from "axios"
import { useContext, useRef, useState } from "react"
import { UserContext } from "./Home"
import { Alert, AlertTitle, Box, Button, Modal, Snackbar, TextField } from "@mui/material"

const register = ({ func }: { func: Function }) => {
    const [isShowSignin, setShowSignin] = useState(false)
    const handleShowSignin = () => {
        setShowSignin(true)
    }
    const [error, setError] = useState(false)
    const url = 'http://localhost:3000/api/user/'
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const user = useContext(UserContext)

    const handleSingIn = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post(url + 'register', {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
            if (res.status != 400&&res.status != 422) {
                func()
                user?.dispatch({
                    type: 'Create',
                    data: {
                        id: res.data.userId
                    }
                })
            }
        }
        catch (e: any) {
            if (e.status == 400||e.status != 422)
                setError(true)
        }
    }
    return (<>
        <div className="sign-in">
            {!isShowSignin && <Button onClick={handleShowSignin} variant="contained"  style={{ backgroundColor: "#8B5E3C" }} >register</Button>}
        </div>

        {isShowSignin && <Modal open={isShowSignin}>
            <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '5%' }}>
                <form onSubmit={handleSingIn}>
                    <TextField label="Email" type="email" fullWidth inputRef={emailRef} />
                    <TextField label="Password" type="password" fullWidth inputRef={passwordRef} />
                    <Button type="submit" variant="contained"  style={{ backgroundColor: "#FEEC96" }}>save</Button>
                </form>
            </Box>
        </Modal>
        }
        <Snackbar open={error}
            onClose={() => setError(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }} >
            <Alert
                onClose={() => setError(false)}
                severity="error"
                sx={{ width: "100%" }}>
                <AlertTitle >error</AlertTitle>
                can not sign in : user is already exist
            </Alert>
        </Snackbar>
    </>)
}
export default register