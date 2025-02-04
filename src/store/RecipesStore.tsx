import axios from "axios";
import { makeAutoObservable } from "mobx";
import { RecipesType } from "../models";

class RecipesStore {

    recipes: RecipesType[] = [];
    recipies: any;

    constructor() {
        makeAutoObservable(this);
        this.getRecipes();
    }

    getRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/recipes/');
            this.recipes = response.data;
        } catch (error) {
            console.error("Failed to fetch recipes", error);
        }
    };


    addRecipe= async(recipe: Partial<RecipesType>,id:number)=> {
    try {
     await axios.post("http://localhost:3000/api/recipes/", {
       title:recipe.title,
      description:recipe.description,
      ingredients:recipe.ingredients,
      instructions:recipe.instructions
    },{headers:{'user-id':id}})
      console.log("Recipe added successfully");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  }
}

const recipeStore = new RecipesStore();
export default recipeStore;