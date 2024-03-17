import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cart, cartitem } from '../models/Cart.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private http:HttpClient) { }


  getcardofuser(userid:String){
    return this.http.get<Cart>(`${environment.baseurl}/carts/${userid}`)
  }


  additemtocart(userid:String,data:{productid:String,quantity:number}){
    return this.http.post<Cart>(`${environment.baseurl}/carts/${userid}`,data)
  }

  clearcart(userid:String){
    return this.http.delete(`${environment.baseurl}/carts/${userid}`)
  }

  removeitemfromcart(userid:String,itemid:number){
    return this.http.delete(`${environment.baseurl}/carts/${userid}/items/${itemid}`);
  }

  getTotalPriceOfCart(items:cartitem[]) {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
        totalPrice += items[i].totolprice;
    }
    return totalPrice;
}
}
