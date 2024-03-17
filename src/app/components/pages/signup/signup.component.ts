import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from '../../../service/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


    user= new User("","","","","");
    isLoading = false;

    constructor(private toastr: ToastrService, private userservice:UserserviceService) {}

    formsubmit(event: Event, formValue: NgForm) {
      

        if (formValue.valid) {

          
            console.log("Form is valid");
            this.isLoading = true; 
            this.userservice.signupuser(this.user).subscribe({
              
                 next:(user)=>{
                    console.log(user);
                    this.toastr.success("user is successfully register ");

                   this.user= new User("","","","","");
                   formValue.resetForm();
                 },
                 error:(err)=>{
                    console.log(err);
                    this.toastr.error("user is not register due to some problem")
                    this.toastr.error("this is email might exit try with another")
                    this.isLoading = false;
                 },
                 complete:()=>{
                    this.isLoading = false;
                    console.log("complete ")
                 }

            })

           console.log(this.user)
            
        } else {
            // Form is invalid, display error message
            this.toastr.error("Form is not valid");
            console.log("Toaster not working");
        }
    }
}


