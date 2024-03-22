import { Component } from '@angular/core';
import { UserserviceService } from '../../../service/userservice.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { User, userresponse } from '../../../models/user.model';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgotpasswordpage',
  templateUrl: './forgotpasswordpage.component.html',
  styleUrl: './forgotpasswordpage.component.css'
})
export class ForgotpasswordpageComponent {
   
   
    constructor(private modelService:NgbModal, private userservice:UserserviceService, private tost:ToastrService,private router:Router){}

    oldemail?:String='';
    user?:User
    newpassword?:String='';
    conformnewpassword?:String='';


    checkemailiscorrectornot(event:any,content:any){
     
       this.userservice.checkemail(this.oldemail as string).subscribe({
        next:(userr: User)=>{
  
         if(userr.email==this.oldemail && this.oldemail != ''){
          this.user=userr
          this.tost.success(" got your user email is "+this.user.name)
          this.modelService.open(content , { ariaLabelledBy: 'modal-basic-title',size:'xl' })

           
         }else{
          this.tost.error("error in email verified ")
         }
        },
        error: err=>{
          console.log(err);
          this.tost.error("error in email verified ")
        }
       })

    }
    updatepassword(event :any){
      if (!this.newpassword || !this.conformnewpassword) {
        this.tost.error("Passwords cannot be empty.");
        return;
    }

    const newPasswordTrimmed = this.newpassword.trim();
    const conformNewPasswordTrimmed = this.conformnewpassword.trim();

    if (newPasswordTrimmed === conformNewPasswordTrimmed) {
        this.tost.success("Passwords match.");
        // Reset the form fields
        this.newpassword = '';
        this.conformnewpassword = '';
        // Navigate to another page


        // call the backend to update 

        
        this.modelService.dismissAll();
        this.router.navigate(['/login']);
    } else {
        this.tost.error("Passwords must match.");
    }
       
    }
     
}
