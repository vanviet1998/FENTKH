// import "reflect-metadata"
import axios from "axios";
import { Host } from "./host"
import { injectable, container } from "tsyringe";
import { DEFAULT_TIMEOUT, METHOD } from "src/constant";


export class BaseService {

    private host:string = Host.URL
    private optionalHeaders:object={
        'Authorization': "Bearer " + "JWT",
  }
    public initApi = (method?: METHOD, url?: string, body?: any, params?:any,auth?: boolean) => {
        const options :object = auth?this.optionalHeaders:{}
        return axios({
            baseURL: this.host,
            timeout: DEFAULT_TIMEOUT,
            method: method,
            url: url,
            data: method == METHOD.GET ? undefined :body,
            params:params,
            ...options,
        }).then((response) => {


            if (response?.status !== 200 && response?.status !== 201) {
              throw response
            }
      
            return response?.data || {};
      
          })
          .catch((err) => {
            if (err?.response?.status === 401) {
              throw err
            }
            if (err?.response?.status === 403) {
              throw err
            }
          });
      
    }

}
