export class Category{
    constructor(public title:String,
        public discription:string,
        public coverimage:String,
        public categoryid:String
        
        ){}
}


export interface categorypaginatedresponse{
    content:Category[],
    lastpage:boolean,
    pagenumber:number,
    pageseize:number,
    totalelement:number,
    totalpages:number

}