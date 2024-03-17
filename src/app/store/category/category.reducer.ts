import { createReducer, on } from "@ngrx/store";
import { Category } from "../../models/Category.model";
import { addcategorydata } from "./category.action";


export const inistialstate:Category[]=[];

export const categortreducer= createReducer(inistialstate,on(addcategorydata,(state,{categoriess})=>{
 
  console.log("categry reducer work")
console.log(state);
console.log(categoriess)
    return [...categoriess];
}))


 