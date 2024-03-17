import { createAction, props } from "@ngrx/store";
import { Cart } from "../../models/Cart.model";

export const updatecart=createAction('UPDATE_CART',props<Cart>());

export const deletecart= createAction('DELETE_CART')