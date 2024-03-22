import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, userresponse } from '../models/user.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor( private http:HttpClient) { }

  
   checkemail(email:String){
  return this.http.get<User>(`${environment.baseurl}/users/email/${email}`)
   }

  signupuser(user:User){

    return this.http.post(`${environment.baseurl}/users`,user);
  }
  getuserimageurl(userid:String){
    return `${environment.baseurl}/users/image/${userid}?${new Date().getTime()}`
  }
  // get all user

  getusers(
    pagenumber=0,
    pagesize=10,
    sortby='name',
    sortdir='asc'
  ){
    return this.http.get<userresponse>(`${environment.baseurl}/users?pagenumber=${pagenumber}&pagesize=${pagesize}&sortby=${sortby}&sortdir=${sortdir}`)
  }
  // getssingle users
  getsingleuser(userid:String){
    return this.http.get(`${environment.baseurl}/users/${userid}`)
  }

  // update user

  updateuser(user:User){
    return this.http.put(`${environment.baseurl}/users/${user.userid}`,user);
  }

// delete 
 deleteuser(userid:String){
    return this.http.delete(`${environment.baseurl}/users/${userid}`)
  }

  // get user by email id 
  getuserbyemailid(emailid:String){
    return this.http.get(`${environment.baseurl}/users/email/${emailid}`)
  }

  // upload image 
  uploaduserimage(userid:String,userimage:File){


        let formdata=new FormData();
        formdata.append('image',userimage)

        return this.http.post(`${environment.baseurl}/users/image/${userid}`,formdata);
  }



  // searchuser

  searchuser(quesry:String){
     return this.http.get(`${environment.baseurl}/users/search/${quesry}`)
  }
}
