import AppLayout from "./component/AppLayout";
import { createBrowserRouter } from "react-router-dom";
import  RecipeDetail  from "./component/RecipeDetail";
import Recipies from "./component/recipies";
import HomePage from "./component/HomePage";

export const router = createBrowserRouter([
    
    {
        path: '/', element: <AppLayout />,
        errorElement:<h1>error</h1>,
        children: [
            { path: '/',  element:<HomePage/>},
            { path: 'about', element: <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , width: '100vw'}}>
            <h1>About🍕🍔🥙🍿🌭</h1>
            </div> },
            {path:'recipies',element:<Recipies/>, children:[{ path: ':id', element: <RecipeDetail />}]},
        ]
    }
])


