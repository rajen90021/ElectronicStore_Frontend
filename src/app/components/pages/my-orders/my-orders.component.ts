import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../models/user.model';
import { OrderService } from '../../../service/order.service';
import { OrderResponse } from '../../../models/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  users?:User;

  orderresponse:OrderResponse={
    content:[],
    lastpage:true,
    pagenumber:0,
    pageseize:99999,
    totalelement:99999,
    totalpages:1,
  }
  constructor(private orderservice:OrderService,private authservice:AuthService){

    authservice.getloggindata().subscribe({
      next:data=>{
      this.users=data.dto
      }
    })
  }
  ngOnInit(): void {
     if(this.users){
      this.orderservice.getorderofuser(this.users.userid).subscribe({
        next:orderes=>{
    this.orderresponse.content=orderes
        }
      })
     }
  }

   
}
