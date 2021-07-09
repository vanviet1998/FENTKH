import { METHOD } from './../constant/index';
import { BaseService } from './base';


export class Service {

    private _baseService = new BaseService()
    private _method = METHOD

    public getProduct = (params: any) => {
        return this._baseService.initApi(this._method.GET, "/product", undefined, params, true)
    }
    public getDetailProduct = (params: any) => {
        if(params)
        return this._baseService.initApi(this._method.GET, `/product/${params}`, undefined, undefined, true)
    }
    public getAllPanel = (params?: any) => {
        return this._baseService.initApi(this._method.GET, "/panel", undefined, params, true)
    }
    public getAllCategory = (params?: any) => {
        return this._baseService.initApi(this._method.GET, "/category/all", undefined, params, true)
    }
}   

export const service = new Service()