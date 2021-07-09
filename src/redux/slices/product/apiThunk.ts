import { IParamsPage } from './../../../constant/IParams';
import { service } from '@services';
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAllProduct = createAsyncThunk(
    'product/fetchAll',
    async (params:IParamsPage | undefined) => {
            const response = await service.getProduct(params)
            return response
     

    }
)
export const searchAllProduct = createAsyncThunk(
    'product/searchfetchAll',
    async (params:IParamsPage | undefined) => {
            const response = await service.getProduct(params)
            return response
     

    }
)