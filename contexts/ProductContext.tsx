import { Product } from '@/types/ProductType';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type State = {
    // State ของทั้ง 3 menu
    productAll: Product[];
    productInCart: Product[];
    favoriteProduct: Product[];
};

type Action =
    | { type: 'SET_ALL_PRODUCTS'; payload: Product[] } // เก็บค่า product ทั้งหมดไว้ก่อน
    | { type: 'ADD_TO_CART'; payload: Product } // state ที่ต้องการเพิ่มให้รถเข็น
    | { type: 'ADD_TO_FAVORITE'; payload: Product } // state ที่ต้องการเพิ่มรายการที่ถูกใจ
    | { type: 'REMOVE_FROM_CART'; payload: number } // ลบรายการออกจากรถเข็น
    | { type: 'REMOVE_FROM_FAVORITE'; payload: number }; // ลบรายการออกจากรายการที่ถูกใจ

const initialState: State = {
    productAll: [],
    productInCart: [],
    favoriteProduct: [],
};

const ProductContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => {},
});

function productReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ALL_PRODUCTS':
            return { ...state, productAll: action.payload };
        case 'ADD_TO_CART':
            const productWithIdAddToCart = {
                ...action.payload,
                idAddToCart: `${action.payload.id}-${state.productInCart.length + 1}`,
            };
            return {
                ...state,
                productInCart: [...state.productInCart, productWithIdAddToCart],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                productInCart: state.productInCart.filter((p) => p.id !== action.payload),
            };
        case 'ADD_TO_FAVORITE':
            return { ...state, favoriteProduct: [...state.favoriteProduct, action.payload] };
        case 'REMOVE_FROM_FAVORITE':
            return {
                ...state,
                favoriteProduct: state.favoriteProduct.filter((p) => p.id !== action.payload),
            };
        default:
            return state;
    }
}

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);
    return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => useContext(ProductContext);
