import { METHOD } from './../constant/index';
import { BaseService } from './base';


export class Service {

    private _baseService = new BaseService()
    private  _method = METHOD

    public getProduct = (params:any)=>{
        return     this._baseService.initApi(METHOD.GET,"/products",undefined,params,true)
    }

}

export const service = new Service()