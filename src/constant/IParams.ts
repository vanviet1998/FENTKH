import { PARAMS_PRODUCT_DEFAULT } from './index';
export interface IParamsPage {
    pageNumber: number,
    limit: number
    q: string,
    category: string
}

export const  intitalParamsPage={
    pageNumber: PARAMS_PRODUCT_DEFAULT.pageNumber,
    limit: PARAMS_PRODUCT_DEFAULT.limit,
    q: "",
    category: ""
}