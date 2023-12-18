import {configureStore} from '@reduxjs/toolkit';
import product from './apis/productApi';

const store = configureStore({
    reducer: {
    [product.reducerPath] : product.reducer
    },
    middleware : getDefaultMiddleware=>getDefaultMiddleware().concat(product.middleware),
    devTools: true
});
export default store;