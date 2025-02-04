import { yupResolver } from "@hookform/resolvers/yup";
import {  Box, Button, IconButton,TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useContext } from "react";
import {  SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as yup from "yup";
import { RecipesType } from "../models";
import recipeStore from "../store/RecipesStore";
import { UserContext } from "./Home";
const AddRecipe=observer(({ onClose }: { onClose?: () => void })=>{
    const userContext=useContext(UserContext)
    const schema= yup.object().shape({
        title:yup.string().required('recipe name is required'),
        description:yup.string().required('description name is required').min(10,"description mast be at list 10 characters"),
        ingredients:yup.array().of(yup.string().required('recipe name is required')).min(1,"at list must be one ingredient")||[],
        instructions:yup.string().required('recipe name is required'),
    })
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
      defaultValues: { 
        title: "",
        description: "",
        ingredients: [""],  
        instructions: "", 
    }
    });
    const { fields, append, remove } = useFieldArray({
      control, name: "ingredients"  });
    const onSubmit : SubmitHandler<Partial<RecipesType>>= (data) => {
        recipeStore.addRecipe(data,userContext?.user.id||0)
      reset({
        ingredients:[]
      }); 
      if (onClose) onClose();
    };
return(
    <>
        <Box sx={{ width: 400, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h5" textAlign="center">הוספת מתכון</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="שם המתכון"
              fullWidth
              margin="normal"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}/>
            <TextField
              label="תיאור"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}/>
            <Typography variant="subtitle1" mt={2}>מרכיבים</Typography>
            {fields.map((item, index) => (
              <Box key={item.id} display="flex" alignItems="center">
                <TextField
                  label={`מרכיב ${index + 1}`}
                  fullWidth
                  margin="normal"
                  {...register(`ingredients.${index}` as const)}
                  error={!!errors.ingredients?.[index]}
                  helperText={errors.ingredients?.[index]?.message}/>
                <IconButton onClick={() => remove(index)} disabled={fields.length === 1}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={() => append("")} variant="outlined" startIcon={<AddIcon />} sx={{ mb: 2 ,backgroundColor: "#FEEC96"}}>
             הוסף מרכיב</Button>
            <Typography variant="subtitle2" mt={2}>הוראות</Typography>
            <TextField
              label="הוראות"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              {...register("instructions")}
              error={!!errors.instructions}
              helperText={errors.instructions?.message}/>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button type="submit" variant="contained"  style={{ backgroundColor: "#8B5E3C" }}>הוסף מתכון</Button>
              <Button variant="outlined"  style={{ backgroundColor: "#FEEC96" }} onClick={onClose}>ביטול </Button>
            </Box>
          </form>
        </Box>
</>)
})
export default AddRecipe
