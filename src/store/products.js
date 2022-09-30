import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    return axios.get('https://product-comparson-assainment.onrender.com/products')
        .then(res => res.data)
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        status: null,
        list: [],
        compareProducts: {
            product1: null,
            product2: null
        }
    },
    reducers: {
        selectProduct1: (state, action) => {
            const selectedProduct = state.list.find(product => product._id === action.payload);
            return {
                ...state,
                compareProducts: {
                    ...state.compareProducts,
                    product1: selectedProduct
                }
            }
        },
        selectProduct2: (state, action) => {
            const selectedProduct = state.list.find(product => product._id === action.payload);
            return {
                ...state,
                compareProducts: {
                    ...state.compareProducts,
                    product2: selectedProduct
                }
            }
        },
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.status = 'loading';
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.list = action.payload.products;
        },
        [getProducts.rejected]: (state) => {
            state.status = 'failed';
        }
    },
});

export const { selectProduct1, selectProduct2 } = productsSlice.actions;
export default productsSlice.reducer