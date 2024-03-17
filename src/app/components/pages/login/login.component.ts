import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';
import { loginresponse } from '../../../models/loginresponse.model';
import { Store } from '@ngrx/store';
import { setlogindata } from '../../../store/auth/auth.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logindata={
    email:'',
    password:'',
  }
constructor(private toster:ToastrService ,private authserive:AuthService,private store:Store<{auth:loginresponse}>,private router:Router){
   
  this.store.select('auth').subscribe({
    next:(data)=>{
      console.log(data)
    },
  })

     
}

  logindatasubmit(event :SubmitEvent){  
    


     if(this.logindata.email.trim()==''|| this.logindata.password.trim()==''){
      this.toster.error("login is required ");
      return;
     }else{
     this.authserive.loginformdata(this.logindata).subscribe({

      next:(data:loginresponse)=>{
         console.log(data)
         this.store.dispatch(setlogindata(data));
        this.router.navigate(['/user']);
      },
      error:(err)=>{
        console.log(err)
        this.toster.error("invalid user name and password ")
      },
      complete:()=>{
        console.log("complete ");
      }
         
     })
     }
  }
}
