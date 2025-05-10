import { Product } from '@/types/ProductType';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type ProductInCart = Product & {
    idAddToCart: string;
    quantity: number;
};

type State = {
    // State ของทั้ง 3 menu
    productAll: Product[];
    productInCart: ProductInCart[];
    favoriteProduct: Product[];
};

type Action =
    | { type: 'SET_ALL_PRODUCTS'; payload: Product[] }
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string } // ลบรายการออกจากรถเข็น
    | { type: 'INCREMENT_CART_QUANTITY'; payload: string } // กดเพิ่มสินค้า
    | { type: 'DECREMENT_CART_QUANTITY'; payload: string } // กดลบสินค้า
    | { type: 'ADD_TO_FAVORITE'; payload: Product } // เพิ่มรายการที่ชอบ
    | { type: 'REMOVE_FROM_FAVORITE'; payload: number }; // ลบรายการที่ชอบ

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
        case 'ADD_TO_CART': {
            // เช็คว่ากดสินค้าเดิมซ้ำไหม ถ้ากด id เดิม เพิ่ม quantity +1
            const existingProductIndex = state.productInCart.findIndex((p) => p.id === action.payload.id);
            if (existingProductIndex !== -1) {
                const updatedCart = state.productInCart.map((item, index) =>
                    index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
                return {
                    ...state,
                    productInCart: updatedCart,
                };
            } else {
                const productWithIdAddToCart: ProductInCart = {
                    ...action.payload,
                    idAddToCart: `${action.payload.id}-${state.productInCart.length + 1}`,
                    quantity: 1,
                };
                return {
                    ...state,
                    productInCart: [...state.productInCart, productWithIdAddToCart],
                };
            }
        }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                productInCart: state.productInCart.filter((p) => p.idAddToCart !== action.payload),
            };
        case 'INCREMENT_CART_QUANTITY':
            return {
                ...state,
                productInCart: state.productInCart.map((p) =>
                    p.idAddToCart === action.payload ? { ...p, quantity: p.quantity + 1 } : p
                ),
            };
        case 'DECREMENT_CART_QUANTITY': {
            const updatedCart = state.productInCart.reduce<ProductInCart[]>((acc, item) => {
                if (item.idAddToCart === action.payload) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                    }
                }
                return acc;
            }, []);
            return {
                ...state,
                productInCart: updatedCart,
            };
        }
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favoriteProduct: [...state.favoriteProduct, action.payload],
            };

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
