export interface IPage<T> {
    "total": number;
    "page": number;
    "pageSize": number;
    "result": T[];
    
}

export const intitleIPage={
    total:0,
    page:0,
    pageSize:0,
    result:[]
}

