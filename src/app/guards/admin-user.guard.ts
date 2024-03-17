import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';


export const adminUserGuard: CanActivateFn = (route, state) => {
 
  const authservie= inject(AuthService);
  const routee=inject(Router)

  return authservie.checkloginandadminuser().pipe(map((value)=>{

    if(value){
      return true;
    }else{
     

      //  tost.warning("you are not logging in")
      routee.navigate(['/user'])
   
      return false;
     
    }
   }))

};
