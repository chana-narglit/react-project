import { useState } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import AddRecipe from "./AddRecipe";
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ButtonAdd = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget); 
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{
            position: 'absolute',
            top: '17%',
            left: '97%',
            width: '50px',
            height: '50px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
        }}>
            <IconButton  style={{ backgroundColor: "#FEEC96" }}  aria-label="add Recipes" onClick={handleClick}>
                <PostAddIcon />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>הוספת מתכון</DialogTitle>
                <DialogContent>
                    <AddRecipe onClose={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => { setOpen(true); handleClose(); }}>
                    <ListItemIcon>
                       <AddCircleOutlineIcon/>
                    </ListItemIcon>
                    הוסף מתכון
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default ButtonAdd;
