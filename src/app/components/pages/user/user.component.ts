import { Component, TemplateRef } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from '../../../service/userservice.service';
import { Store } from '@ngrx/store';
import { loginresponse } from '../../../models/loginresponse.model';
import { setlogindata } from '../../../store/auth/auth.action';
import { error } from 'console';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  user?:User
  hidePassword: boolean = true;
 prievewimageurl?:string;
 imagefile?:File
 loginresponse?:loginresponse


     constructor(private authstore:Store<{auth:loginresponse}>,private userserive:UserserviceService,private authservie:AuthService,private modalService:NgbModal,private tost:ToastrService){

     this.authservie.getloggindata().subscribe({

      next:(user)=>{
         this.user={...user.dto} as User;
         this.loginresponse=user
      }
     })
     }


     openupdateuserform(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'xl' })
    }
    togglePasswordVisibility(): void {
      this.hidePassword = !this.hidePassword;
    }

    imagefieldchange(event:any){

      this.imagefile = event.target.files![0];
    
  
      console.log(this.imagefile);
  
      if (this.imagefile && (this.imagefile.type === 'image/png' || this.imagefile.type === 'image/jpeg')) {
        // Proceed with image upload
  // priview image 
  
  const reader = new FileReader();
  reader.onload = (e) => {
      this.prievewimageurl = e.target!.result as string;
  };
  reader.readAsDataURL(this.imagefile);
  
      } else {
        this.tost.error("Only JPEG and PNG images are valid");
        this.imagefile=undefined
      }
    }

    updatesubmittedform(event:SubmitEvent){
      


      if(this.user?.name.trim()==''){
        this.tost.error("name cannot be emplty")
      }
      if(this.user?.email.trim()==''){
        this.tost.error("email cannot be emplty")
      }
      if(this.user?.password.trim()==''){
        this.tost.error("password cannot be emplty")
      }
   this.userserive.updateuser(this.user as User).subscribe({
    next:updateuser=>{
      console.log(updateuser);
      const newloginresponse={
        jwtToken:this.loginresponse?.jwtToken,
        dto:updateuser,
        login:this.loginresponse?.login
      }
      this.authstore.dispatch(setlogindata(newloginresponse as loginresponse))
      this.tost.success("updated succesfully ")

      if(this.imagefile){
        this.userserive.uploaduserimage(this.user!.userid,this.imagefile).subscribe({
          next:(data:any)=>{
            this.tost.success("image uploaded succssfully")
       
              this.user!.userimage=data.userimage
            const newloginresponse={
              jwtToken:this.loginresponse?.jwtToken,
              dto:{...this.user,userimage:data.userimage},
              login:this.loginresponse?.login
            }
              this.authstore.dispatch(setlogindata(newloginresponse as loginresponse))
            this.imagefile=undefined
            this.prievewimageurl='';
            this.modalService.dismissAll()
          },
          error:error=>{
            this.tost.error("error in uploading image ")
            console.log(error)
          }
        })
      }
    },
    error:err=>{
      this.tost.error("error from backend ")
      console.log("errror occur ")
    }
   })
      
    }
}
