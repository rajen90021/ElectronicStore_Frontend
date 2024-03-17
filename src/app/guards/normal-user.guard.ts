import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const normalUserGuard: CanActivateFn = (route, state) => {
 

    const authserive= inject(AuthService);

    const routerr = inject(Router)

    const tost= inject(ToastrService)
 console.log("normal user guard")
// console.log(authserive.checkloginandnormaluser())
   return authserive.checkloginandnormaluser().pipe(

    map((value)=>{
      if(value){
        return true;
      }else{
       

        //  tost.warning("you are not logging in")
        routerr.navigate(['/login'])
     
        return false;
       
      }
    })
   )
   
  
};
