import RecipesStore from "../store/RecipesStore";
import { observer } from "mobx-react";
import { Box, Card, CardActionArea, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { RecipesType } from "../models";

const Recipies = observer(() => {
    const navigate = useNavigate()
    const selectedRecipes = (recipe: RecipesType) => {
        navigate(`${recipe.id}`)
    }
    return (
        <Grid container spacing={2} sx={{ height: "100vh", padding: 2 }}>
            <Grid item xs={3}>
                <Paper sx={{
                    position: "fixed",
                    top: "60%",
                    left: 10,
                    transform: "translateY(-50%)",
                    boxShadow: 3,
                    padding: 2,
                    minWidth: 300,
                    borderRadius: 2,
                    bgcolor: "#f8f9fa",
                    maxHeight: "80vh", 
                    overflowY: "auto" 
                }}>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                        רשימת מתכונים
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {RecipesStore.recipes.map((recipe) => (
                            <Card key={recipe.id} sx={{
                                bgcolor: "#ffffff",
                                backgroundColor:"#8B5E3C",
                                boxShadow: 2,
                                transition: "0.3s",
                                "&:hover": { boxShadow: 6, transform: "scale(1.05)" }
                            }}>
                                <CardActionArea onClick={() => selectedRecipes(recipe)}>
                                    <CardContent>
                                        <Typography variant="h6" textAlign="center" >
                                            {recipe.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={9} sx={{ paddingLeft: "350px" }}>
                <Outlet />
            </Grid>
        </Grid>
    );
});

export default Recipies; 