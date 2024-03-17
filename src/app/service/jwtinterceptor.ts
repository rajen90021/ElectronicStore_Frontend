import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class jwtinterceptor implements HttpInterceptor{
     jwttoken='';
   constructor(private authservie:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
       
        
         console.log("jwt intecercptor work ")


         const value =  this.authservie.getloggindata().subscribe({
            next:(value=>{
               this.jwttoken= value.jwtToken;


               if (this.jwttoken) {
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${this.jwttoken}`
                  }
                });
              }
              return next.handle(req);

            })
         })


        return next.handle(req)
    };
}