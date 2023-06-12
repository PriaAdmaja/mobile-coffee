import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer, PERSIST, FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import reducer from './slices'

const persistConfig = {
    key: "coffee-shop",
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) => {
        return defaultMiddleware({
            serializableCheck: {
                ignoreActions: [PAUSE, PERSIST, PURGE, FLUSH, REHYDRATE, REGISTER]
            },
            thunk: false,
        })
    }
})

export const persistor = persistStore(store);
export default store;