import productService from "@/services/productService";
import { Product } from "@/types/ProductType";

const useProduct = () => {
    const getAllProductByCategory = async (category: string): Promise<Product[] | any> => {
        try {
            const data = await productService.getAll(category);
            if (data) {
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
        }
    }
    return {
        getAllProductByCategory
    }
}
export default useProduct;