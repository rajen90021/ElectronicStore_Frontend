import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderRequest } from '../models/order.request.model';

import { environment } from '../../environments/environment';
import { Order, OrderResponse } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }


  createorder(orderrequest:orderRequest){
return this.http.post(`${environment.baseurl}/orders`,orderrequest)
  }

  getallorder(

    pageNumber=0,
    pageSize=10,
    sortBy='orderDate',
    sortDir='desc'

  ){
return this.http.get<OrderResponse>(`${environment.baseurl}/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  }
  getorderofuser(userid:String){
   return  this.http.get<Order[]>(`${environment.baseurl}/orders/users/${userid}`)
  } 



  updateOrder(order: Order) {
    return this.http.put<Order>(
      `${environment.baseurl}/orders/${order.orderid}`,
      order
    );
  }
}
