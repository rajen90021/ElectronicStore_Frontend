import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginresponse } from '../models/loginresponse.model';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { role } from '../models/role.model';
import { json } from 'stream/consumers';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private store :Store<{auth:loginresponse}>) { }



  loginformdata(logindata:{email:string,password:string}){
   return  this.http.post<loginresponse>(`${environment.baseurl}/auth/login`,logindata);
  }

   checkloginandnormaluser(){
      return this.store.select('auth').pipe(

        map((value)=>{
        //  console.log(value.login)
        //  console.log(value.jwtToken)
        //  console.log(value.dto)
        //  console.log(value.dto?.role)

        
         const isnormal= value.dto?.role.find((role)=>role.roleid==environment.ROLE_NORMAL_ID && role.rolename==environment.ROLE_NORMAL_NAME)
        //  console.log(" is normal "+isnormal?.rolename)
        //  console.log(" is normal "+isnormal?.roleid)

         if(value.login && value.dto && value.jwtToken && isnormal?.roleid && isnormal.rolename){
         console.log("if block")
          return true;
         } 
         else{
          console.log("else block")
          return false;
         } 
        } )
      )

}
checkloginandadminuser(){


  return this.store.select('auth').pipe(

    map((value)=>{
     console.log(value.login)
     console.log(value.jwtToken)
     console.log(value.dto)
     console.log(value.dto?.role)

    
     const isadmin= value.dto?.role.find((role)=>role.roleid==environment.ROLE_ADMIN_ID && role.rolename==environment.ROLE_ADMIN_NAME)
     console.log(" is normal "+isadmin?.rolename)
     console.log(" is normal "+isadmin?.roleid)

     if(value.login && value.dto && value.jwtToken && isadmin?.roleid && isadmin.rolename){
     console.log("if block")
      return true;
     } 
     else{
      console.log("else block")
      return false;
     } 
    } )
  )
}



getloggindata(){
  return this.store.select("auth");
}

   setlogindatatolocalstorage(logindata:loginresponse){
          
      localStorage.setItem('data',JSON.stringify(logindata));
    
   }

 static  getlogindatafromlocalstorage(){
  if (typeof localStorage !== 'undefined') {
    const dataString = localStorage.getItem('data');
    if (dataString) {
     
      return JSON.parse(dataString);
      
    }
  }
   else {
    console.error('localStorage is not available.');
  }
  return null;
}


signinwithgoogle(user:SocialUser){
 return this.http.post<loginresponse>(`${environment.baseurl}/auth/google`,user);
}
   }


