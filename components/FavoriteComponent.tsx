import { useProductContext } from '@/contexts/ProductContext';
import { Product } from '@/types/ProductType';
import { Util } from '@/utils/utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProductCard } from './card';

type RootStackParamList = {
    Favorite: undefined;
    ProductDeviceDetail: { product: Product };
};
export default function FavoriteComponent() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleCardPress = (item: Product) => {
        navigation.navigate('ProductDeviceDetail', { product: item });
    };
    const { state } = useProductContext();

    return (
        <View style={styles.container}>
            {!Util.isNullOrUndefined(state.favoriteProduct) ? (
                <FlatList
                    data={state.favoriteProduct}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProductCard screen="FAVORITE" product={item} onPress={() => handleCardPress(item)} />
                    )}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={{ padding: 12 }}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.cartContainer}>
                    <View style={styles.emptyFavoriteContent}>
                        <Text style={styles.title}>รายการ favorite ว่าง</Text>
                    </View>
                </View>
            )}
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    cartContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    emptyFavoriteContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
