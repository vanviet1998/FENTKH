export interface IBaseRedux<T> {
    loading: boolean;
    error:string;
    currentRequestId:any;
    data:T
}
export const intitalIBaseRedux={
    loading:false,
    error:"",
    currentRequestId:undefined,
    data:{},
}