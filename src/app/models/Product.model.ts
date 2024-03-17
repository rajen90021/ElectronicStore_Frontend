import { Category } from "./Category.model";

export class Product{


    constructor(
 public id:string='',
  public title:string='',
  public discription:string='',
  public quantity:number=0,
  public price:number=0,
  public discount:number=0,
  public live:boolean=false,
  public stock:boolean=false,
  public category:Category= new Category('','','','')


    ){}
}

export interface productresponse{
  lastpage:boolean,
  pagenumber:number,
  pageseize:number,
  totalelement:number,
  totalpages:number,
  content:Product[]
}