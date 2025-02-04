import { useType } from "../models";


export type Action = { 
 data:useType,
 type:'Update'|'Create'
}

export default (state:useType,action:Action): useType=>{
     switch(action.type)
     {
        case "Update":
           
            const{id,firstName}=action.data as useType
            console.log('action',action)
            console.log('firstName',firstName)
            console.log('action',id)
            return {
                ...state,
                id:id,
                firstName:firstName
            }
        case "Create":
            return {
                 id:action.data.id 
                };
      
        default: return state    
     }
}


