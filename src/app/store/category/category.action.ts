import { createAction, props } from "@ngrx/store";
import { Category } from "../../models/Category.model";


export const addcategorydata=createAction("ADD_CATEGORY_DATA",props<{categoriess: Category[]}>());