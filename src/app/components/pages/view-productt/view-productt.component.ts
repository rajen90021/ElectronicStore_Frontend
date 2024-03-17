import { Component } from '@angular/core';
import { Product } from '../../../models/Product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../service/cart.service';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { Cart } from '../../../models/Cart.model';
import { updatecart } from '../../../store/cart/cart.action';

@Component({
  selector: 'app-view-productt',
  templateUrl: './view-productt.component.html',
  styleUrl: './view-productt.component.css'
})
export class ViewProducttComponent {
  productid?:string;

  product?:Product

  user?:User
   constructor(private activateroute:ActivatedRoute,
    public productserive:ProductService,
    private title:Title,
      private tost:ToastrService,
      private cartservice:CartService,
      private authservice:AuthService,
      private cartstore:Store<{cart:Cart}>

    ){
    activateroute.params.subscribe((param)=>{
      this.productid=param['productid']
   this.loadproduct();
    })


      authservice.getloggindata().subscribe({
        next:data=>{
          this.user=data.dto
        
        }
      })
   }
   loadproduct() {
  if(this.productid){
    this.productserive.getproduct(this.productid).subscribe({
      next:data=>{
           this.product=data
          //  console.log(this.product)
           this.title.setTitle(data.title)
      }
     })
  }
 
   }


   addtocartrequest(product:Product){
    
    if(!product.stock){
      this.tost.error("product is out of stock") 
  return;
    }
    
 
     if(this.user){
      this.cartservice.additemtocart(this.user!.userid,{productid:product.id,quantity:1}).subscribe({

        next:cart=>{
           console.log(cart)
           this.tost.success("product add success to cart")

           this.cartstore.dispatch(updatecart(cart))
        },
        error: err=>{
          console.log(err)
          this.tost.error("product not added to cart ")
        }
       })
     }else{
      this.tost.error("need to login")
     }
    }


      
}
