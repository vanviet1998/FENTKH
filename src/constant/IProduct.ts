import { ICategory } from "./ICategory";
import { IMaterial } from "./IMaterial";

export interface IProduct {
    _id:string,
    category: ICategory[];
    image: string[];
    color:string[];
    size:any;
    guarantee:number;
    status:number;
    optionsPrice:boolean;
    name:string;
    descripsion:string;
    material:IMaterial;
    price:number;
    disCount:number;

}
export  const intitalIProduct: IProduct = {
    _id:"",
    category: [],
    image: [],
    color:[],
    size:[],
    guarantee:0,
    status:0,
    optionsPrice:false,
    name:"",
    descripsion:"",
    material:{
        _id:"",
        title:"",
    },
    price:0,
    disCount:0,
}