import { createReducer, on } from "@ngrx/store";
import { Cart } from "../../models/Cart.model";
import { deletecart, updatecart } from "./cart.action";
import { User } from "../../models/user.model";

export const initialState: Cart={
    cartid:'',
    createdat:new Date(),
    items:[],
    users: new User('','','','','')
}

export const cartreducer = createReducer(
  initialState,
  on(updatecart, (state,  cart ) => {
    return {...cart}; // Return the new cart state
  }),
  on(deletecart,(state)=>{
    return {
        cartid:'',
        createdat:new Date(),
        items:[],
        users: new User('','','','','')
    }
  })
);
