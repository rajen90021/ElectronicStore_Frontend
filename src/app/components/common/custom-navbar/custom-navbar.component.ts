import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { loginresponse } from '../../../models/loginresponse.model';
import { Store } from '@ngrx/store';
import { removelogindata } from '../../../store/auth/auth.action';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../../../models/Cart.model';


@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.css'
})
export class CustomNavbarComponent {
  collopse=true

  logindata?:loginresponse;
  isadmin?:Observable<boolean>

  cart?:Cart

   constructor(private authserv:AuthService,
    private store:Store<{auth:loginresponse}>,
    private route:Router,
    private cartstore:Store<{cart:Cart}>
    ){

    authserv.getloggindata().subscribe({

      next:(data)=>{
        this.logindata=data;
        console.log(this.logindata)
      }
    })

    this.isadmin = authserv.checkloginandadminuser()


       cartstore.select('cart').subscribe({
        next:data=>{
          this.cart=data;
          
        }
       })
   }

  toogle(){
    this.collopse=!this.collopse
  }
     
    

  logout(){
   this.store.dispatch(removelogindata());
   this.route.navigateByUrl('/login')
  }
}
