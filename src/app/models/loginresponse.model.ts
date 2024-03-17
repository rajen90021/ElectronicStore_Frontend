import { User } from "./user.model"

export interface loginresponse{
    
  jwtToken:string;
  dto:User | undefined;
  login:boolean;


}