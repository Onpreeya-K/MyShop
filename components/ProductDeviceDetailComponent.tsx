import { useAlert } from '@/contexts/AlertContext';
import { useProductContext } from '@/contexts/ProductContext';
import { Product } from '@/types/ProductType';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RatingStarComponent } from './rating-star';
import { Button } from 'react-native-paper';

type RootStackParamList = {
    ProductDeviceDetail: { product: Product };
};

type ProductDeviceDetailRouteProp = RouteProp<RootStackParamList, 'ProductDeviceDetail'>;

export default function ProductDeviceDetailComponent() {
    const route = useRoute<ProductDeviceDetailRouteProp>();
    const product = route.params?.product;
    if (!product) return null;

    const { showAddToCartSuccess, showAddFavorite, showDeleteFavorite } = useAlert();
    const { state, dispatch } = useProductContext();
    const isFavorite = state.favoriteProduct.some((item) => item.id === product.id);
    const handleAddToFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'REMOVE_FROM_FAVORITE', payload: product.id });
            showDeleteFavorite();
        } else {
            dispatch({ type: 'ADD_TO_FAVORITE', payload: product });
            showAddFavorite();
        }
    };

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        showAddToCartSuccess();
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{product.name}</Text>
                    <TouchableOpacity onPress={handleAddToFavorite}>
                        <MaterialCommunityIcons
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isFavorite ? 'red' : 'gray'}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.desc}>{product.desc}</Text>
                <Text style={styles.price}>฿{product?.price?.toLocaleString()}</Text>
                <Text style={styles.rating}>
                    <RatingStarComponent rating={product?.rating?.rate ?? 0} />
                    {product?.rating?.rate} ({product?.rating?.count} รีวิว)
                </Text>
                <View style={styles.button}>
                    <Button icon="cart" mode="outlined" onPress={handleAddToCart}>
                        เพิ่มสินค้า
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 12,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    desc: {
        color: '#666',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    rating: {
        color: '#888',
    },
});
