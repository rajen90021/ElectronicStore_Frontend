import { createAction, props } from "@ngrx/store";
import { loginresponse } from "../../models/loginresponse.model";

export  const setlogindata=createAction("SET_LOGIN_DATA",props<loginresponse>());


export const removelogindata=createAction("REMOVE_LOGIN_DATA");