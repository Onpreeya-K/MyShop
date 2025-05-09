import apiClient from './apiClient';

export interface Product {
    id: number;
    name: string;
    desc: string;
    price: number;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const productService = {
    getAll: async (category?: string): Promise<Product[]> => {
        const res = await apiClient.get<Product[]>(`/products/${category || ''}`);
        return res.data;
    },
};

export default productService;
