import { role } from "./role.model";

export class User{
    constructor(

       
 public name:string,
 public email:string,
 public password:string,
 public gender:String,
 public about:String,
 public role:role[]=[],
 public userid:string='',
 public userimage:string=''

    ){}
}
export interface userresponse{
    lastpage:boolean,
    pagenumber:number,
    pageseize:number,
    totalelement:number,
    totalpages:number,
    content:User[]
  }