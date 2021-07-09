import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import product  from '@redux/slices/product';
import card  from '@redux/slices/card';

const rootReducer = combineReducers({ counter,product,card });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;