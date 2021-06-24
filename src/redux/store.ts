import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { logger } from 'redux-logger';

import rootReducer from "./reducers";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();



export default store;