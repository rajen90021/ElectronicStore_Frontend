import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../../service/userservice.service';
import { User, userresponse } from '../../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit {


  userresponse!:userresponse
user?:User
pagenumber=0;
loading=false;
  constructor(private userservice:UserserviceService,private modelservice:NgbModal){}
  
  
  
  ngOnInit(): void {
   
      this.loadpaginateduser(0)
  }
  loadpaginateduser(pagenumber=0,pagesize=10,sortby='name',sortdir='asc'){
    this.loading=true;
    this.userservice.getusers(pagenumber,pagesize,sortby,sortdir).subscribe({
      next:data=>{
         if(data.pagenumber>0){
         this.userresponse={
          ... data,
          content:[...this.userresponse!.content,...this.userresponse.content]
         }
         }
        else{
          this.userresponse=data
          console.log(this.userresponse)
          
        }
        this.loading=false;
        console.log(this.userresponse)
      },
      error:err=>{
        console.log(err)
        this.loading=false;
      }
    })
  }

  openusermodel(content:any,user:User){
   this.user = user
    this.modelservice.open(content,{

    })
  }
     
  userScroll(event:IInfiniteScrollEvent){
  
    if(this.loading || this.userresponse?.lastpage){
      return ;
    }
   
    this.pagenumber +=1;
    this.loadpaginateduser(this.pagenumber)


  }
}
