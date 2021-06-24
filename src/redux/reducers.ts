import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import product  from '@redux/slices/product';

const rootReducer = combineReducers({ counter,product });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;