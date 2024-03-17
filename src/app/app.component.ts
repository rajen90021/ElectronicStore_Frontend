import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginresponse } from './models/loginresponse.model';
import { AuthService } from './service/auth.service';
import { User } from './models/user.model';
import { Cart } from './models/Cart.model';
import { CartService } from './service/cart.service';
import { updatecart } from './store/cart/cart.action';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { setlogindata } from './store/auth/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'electronicStore';
user?:User

  constructor(
     private authserive:AuthService,
     private store :Store<{auth:loginresponse}>,
     private cartstore:Store<{cart:Cart}>,
     private  cartservice:CartService,
     private socialauth:SocialAuthService,
     private tost:ToastrService,
   
     private router:Router
     ){


       store.select("auth").subscribe({
        next:(data:loginresponse)=>{
          authserive.setlogindatatolocalstorage(data);

          this.user=data.dto;
        }
       })


       if(this.user){
        cartservice.getcardofuser(this.user.userid).subscribe({
          next:cartt=>{
            cartstore.dispatch(updatecart(cartt));
          }
        })
       }


       socialauth.authState.subscribe({
        next:user=>{
          console.log(user);
          authserive.signinwithgoogle(user).subscribe({
            next:(userlogin:loginresponse)=>{
console.log(userlogin)
  tost.success("login with google successfully ")
              this.store.dispatch(setlogindata(userlogin));
              this.router.navigate(['/user']);

            },
            error:err=>{
              tost.error("error in login with google ")
              console.log(err)
            }
          })
        },
        error:err=>{
          console.log(err)
        }
       })
  }
}
