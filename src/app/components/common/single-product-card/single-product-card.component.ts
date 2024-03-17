import { Component, Input } from '@angular/core';
import { Product } from '../../../models/Product.model';
import { ProductService } from '../../../service/product.service';
import { User } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../service/cart.service';
import { AuthService } from '../../../service/auth.service';
import { Store } from '@ngrx/store';
import { Cart } from '../../../models/Cart.model';
import { updatecart } from '../../../store/cart/cart.action';

@Component({
  selector: 'app-single-product-card',
  templateUrl: './single-product-card.component.html',
  styleUrl: './single-product-card.component.css'
})
export class SingleProductCardComponent {

 @Input() product?:Product

 user?:User

  constructor(private cartstore:Store<{cart:Cart}>,private authservice:AuthService,public productservice:ProductService,private tost:ToastrService,private cartservice:CartService){

    authservice.getloggindata().subscribe({
      next:data=>{
        this.user=data.dto
      }
    })
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
