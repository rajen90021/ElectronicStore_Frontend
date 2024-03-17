import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginresponse } from '../../../models/loginresponse.model';
import { removelogindata } from '../../../store/auth/auth.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindasboard',
  templateUrl: './admindasboard.component.html',
  styleUrl: './admindasboard.component.css'
})
export class AdmindasboardComponent {
 
  constructor(private route:Router,private storee:Store<{auth:loginresponse}>){}
  adminmenus=[
   
       {
        title:"home",
        link:"/admin/home",
        icon:"fa-solid fa-house",
        cssclass:""
       },
       {
        title:"add product",
        link:"/admin/add-product",
        icon:"fa-solid fa-plus",
        cssclass:""
       },
       {
        title:"view product",
        link:"/admin/view-product",
        icon:"fa-regular fa-eye",
        cssclass:""
       },
       {
        title:"add categories",
        link:"/admin/add-categories",
        icon:"fa-solid fa-plus",
        cssclass:""
       },
       {
        title:"view categories",
        link:"/admin/view-categories",
        icon:"fa-regular fa-eye",
        cssclass:""
       },
     
       {
        title:"view user",
        link:"/admin/users",
        icon:"fa-solid fa-user",
        cssclass:""
       },
       {
        title:"view orders",
        link:"/admin/orders",
        icon:"fa-regular fa-eye",
        cssclass:""
       },
       {
        title:"my orders",
        link:"/my/orders",
        icon:"fa-regular fa-eye",
        cssclass:""
       },
       {
        title:"logout",
        link:"#!",
        icon:"fa-solid fa-right-from-bracket",
        cssclass:""
       },
     



  ]
 
  logout(){
    this.storee.dispatch(removelogindata());
    this.route.navigateByUrl('/login')
   
   }
}
