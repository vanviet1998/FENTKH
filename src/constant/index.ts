import { IProduct } from './IProduct';
export enum METHOD {
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    GET = "GET"
}

export enum STATUS_API {
    PENDING = "pending"
}

export enum INFORMATION_SHOP {
    PHONE_NUMBER = "0394655656",
    EMAIL = "noithatkhanhhuyen@gmail.com",
    LOGO = "https://tunhua.vn/wp-content/uploads/2019/09/tunhua.vn_.png"

}

export const DEFAULT_TIMEOUT: number = 30000

export enum SUB_FIX_PRCE {
    VND = "VND"
}

export enum LANGUAGE_CODE {
    VN = "vi-VN"
}

export enum PARAMS_PRODUCT_DEFAULT {
    pageNumber = 1,
    limit = 12
}

export enum LOCAL_STORE_NAME {
    cards = "cards"
}

export interface IResult {

}


export interface ICardItem {
    _id: string;
    image: string;
    // color:string[];
    size: string;
    guarantee: number;
    name: string;
    price: number;
    disCount: number;
    amount: number,
    total: number,
    realPrice: number
}

export interface ICards {
    cards: ICardItem[],
    total: number,
}

export interface IAddItemCard{
    item: IProduct, 
    amount: number
}
export interface IAddAmountItemCard{
    id: string, 
    amount: number
}
export enum Type_Noti {
    success = "success",
    error = "error",
    info = "info",
    warning = "warning",
    warn = "warn",
}