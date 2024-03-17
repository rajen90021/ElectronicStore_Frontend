import { createReducer, on } from "@ngrx/store";
import { loginresponse } from "../../models/loginresponse.model";
import { removelogindata, setlogindata } from "./auth.action";
import { AuthService } from "../../service/auth.service";


// export const intialState: loginresponse = AuthService.getlogindatafromlocalstorage() ? AuthService.getlogindatafromlocalstorage() : {
//         jwtToken:'',
//         dto:null,
//         login:false,
//     }
// ************************************************************************************************
let intialState: loginresponse; // Define intialState variable without assignment

const storedData = AuthService.getlogindatafromlocalstorage(); // Get data from local storage

if (storedData) {
    // If data is available in local storage
    intialState = storedData;
} else {
    // If no data is available in local storage, assign default values
    intialState = {
        jwtToken: '',
        dto: undefined,
        login: false
    };
}
// ***************************************************************************************************

// export const intialState:loginresponse ={
//     jwtToken:'',
//     dto:null,
//     login:false,
// }


export const authreducer= createReducer(intialState,on(setlogindata,(oldstate,payload)=>{


console.log("set login action with reducer ");
    //  console.log(oldstate);
    //  console.log(payload)
    return { ...oldstate, ...payload,login:true};
}),
on(removelogindata,(state)=>{

    return { 

        jwtToken:'',
        dto:undefined,
        login:false,

      };
})
)