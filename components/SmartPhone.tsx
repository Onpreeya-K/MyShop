import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AlertSuccessProvider } from '@/contexts/AlertSuccessContext';
import { useProductContext } from '@/contexts/ProductContext';
import { Product } from '@/types/ProductType';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProductCard from './ProductCard';
import useProduct from '@/hooks/useProduct';

type RootStackParamList = {
    SmartPhone: undefined;
    SmartPhoneDetail: { product: Product };
};
export default function SmartPhoneListScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleCardPress = (item: Product) => {
        navigation.navigate('SmartPhoneDetail', { product: item });
    };
    const { state, dispatch } = useProductContext();
    const { getAllProductByCategory } = useProduct();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllProductByCategory('smartphones');
            if (response) {
                dispatch({ type: 'SET_ALL_PRODUCTS', payload: response });
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={state.productAll}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductCard product={item} onPress={() => handleCardPress(item)} />}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ padding: 12 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
});
