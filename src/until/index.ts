import { LANGUAGE_CODE, SUB_FIX_PRCE } from "src/constant"

export const formatPrice = (number: number)=>{
   return new Intl.NumberFormat(LANGUAGE_CODE.VN, { style: 'currency', currency: SUB_FIX_PRCE.VND }).format(number)
}

export const caculatorPriceSale = (price: number,sale:number)=>{
    const result = price - (price * sale / 100)
    return new Intl.NumberFormat(LANGUAGE_CODE.VN, { style: 'currency', currency: SUB_FIX_PRCE.VND }).format(result)
 }