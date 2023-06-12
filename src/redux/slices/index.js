import { combineReducers } from "@reduxjs/toolkit";

import counterSlice from "./counter";
import userInfoSlice from "./userInfo";
import cartSlice from "./cart";
import activePromoSlice from "./activePromo";
import deliveryStatusSlice from "./deliveryStatus";
import filterSlice from "./filter";
import productIdSlice from './productId'


const reducers = combineReducers({
    counter: counterSlice,
    cart: cartSlice,
    userInfo: userInfoSlice,
    activePromo: activePromoSlice,
    deliveryStatus: deliveryStatusSlice,
    filter: filterSlice,
    productId: productIdSlice,
   
});

export default reducers;