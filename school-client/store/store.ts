import { configureStore , combineReducers } from "@reduxjs/toolkit"
import { persistStore , persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from "./authSlice"
import themeSlice from "./themeSlice"

const persistConfig = {
    key : "root",
    storage,
    whitelist: ['auth', 'theme']
}

const rootReucer = combineReducers({
    auth : authSlice,
    theme : themeSlice
})

const persistedReducer = persistReducer(persistConfig , rootReucer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false})
})

export const persistor = persistStore(store)