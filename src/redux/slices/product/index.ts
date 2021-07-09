import { intitleIPage, IPage } from './../../../constant/IPage';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { intitalIProduct, IProduct } from "src/constant/IProduct"
import { IBaseRedux, intitalIBaseRedux } from 'src/constant/IBaseRedux';
import { fetchAllProduct,searchAllProduct } from './apiThunk';

const initialState: IBaseRedux<IPage<IProduct>> = {
    ...intitalIBaseRedux,
    data: {
        ...intitleIPage,
        result: [intitalIProduct]
    }

}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getAllProducts: (state, action: PayloadAction<IPage<IProduct>>) => {
            state.data = action.payload
        },

    },
    extraReducers: {
        [`${fetchAllProduct.pending}`]: (state, action) => {

          if (!state.loading) {
            state.loading =true
            state.currentRequestId = action.meta.requestId
          }
        },
        [`${fetchAllProduct.fulfilled}`]: (state, action) => {
          const { requestId } = action.meta
          if (state.loading && state.currentRequestId === requestId) {
            state.loading = false
            state.currentRequestId = undefined
            const tempt = state.data.result.filter(data => data._id)
            state.data = {
              ...action.payload,
              result:[
                ...tempt,
                ...action.payload.result,
                
              ]
            }
          }
        },
        [`${fetchAllProduct.rejected}`]: (state, action) => {

          const { requestId } = action.meta
          if (state.loading  && state.currentRequestId === requestId) {
            state.loading = false
            state.error = action.error
            state.currentRequestId = undefined
          }
        },
        [`${searchAllProduct.pending}`]: (state, action) => {

          if (!state.loading) {
            state.loading =true
            state.currentRequestId = action.meta.requestId
          }
        },
        [`${searchAllProduct.fulfilled}`]: (state, action) => {
          const { requestId } = action.meta
          if (state.loading && state.currentRequestId === requestId) {
            state.loading = false
            state.currentRequestId = undefined
            state.data = {
              ...action.payload,
              result:[
                ...action.payload.result,
                
              ]
            }
          }
        },
        [`${searchAllProduct.rejected}`]: (state, action) => {

          const { requestId } = action.meta
          if (state.loading  && state.currentRequestId === requestId) {
            state.loading = false
            state.error = action.error
            state.currentRequestId = undefined
          }
        }
      }
})

export const { getAllProducts } = productSlice.actions

export const selectAllProduct = (state) => state.product

export default productSlice.reducer