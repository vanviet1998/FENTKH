import { Host } from '@services/host';
import { METHOD, BodyPayLoadFeedBack } from './../constant/index';
import { BaseService } from './base';


export class Service {

    private _baseService = new BaseService()
    private _addresService = new BaseService(Host.URL_GET_ADDRESS_FREE)
    private _method = METHOD

    public getProduct = (params: any) => {
        return this._baseService.initApi(this._method.GET, "/product", undefined, params, true)
    }
    public getDetailProduct = (params: any) => {
        if (params)
            return this._baseService.initApi(this._method.GET, `/product/${params}`, undefined, undefined, true)
    }
    public getAllPanel = (params?: any) => {
        return this._baseService.initApi(this._method.GET, "/panel", undefined, params, true)
    }
    public getAllCategory = (params?: any) => {
        return this._baseService.initApi(this._method.GET, "/category/all", undefined, params, true)
    }
    public createFeedBack = (body:BodyPayLoadFeedBack) => {
        return this._baseService.initApi(this._method.POST, "/feedBack/create", body, undefined, true)
    }
    /** get address freee api  */

    public getProvince = (params?: any) => {
        return this._addresService.initApi(this._method.GET, "/province/", undefined, params, true)
    }
    public getDistrict = (params?: any) => {
        return this._addresService.initApi(this._method.GET, "/province/district/" + params, undefined, undefined, true)
    }
}

export const service = new Service()