import { useAlert } from '@/contexts/AlertContext';
import { useProductContext } from '@/contexts/ProductContext';
import { Product } from '@/types/ProductType';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

type ProductCardProps = {
    screen: 'HOME' | 'FAVORITE';
    product: Product;
    onPress: (id: number) => void;
};

export default function ProductCard({ screen, product, onPress }: ProductCardProps) {
    const { state, dispatch } = useProductContext();
    const { showAddToCartSuccess, showAddFavorite, showDeleteFavorite } = useAlert();
    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        showAddToCartSuccess();
    };

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

    return (
        <TouchableWithoutFeedback onPress={() => onPress(product.id)}>
            <View style={styles.card}>
                <View>
                    <Image source={{ uri: product.image }} style={styles.cardCover} />
                    {screen === 'FAVORITE' && (
                        <TouchableOpacity
                            onPress={handleAddToFavorite}
                            style={styles.favorite}
                        >
                            <MaterialCommunityIcons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={24}
                                color={isFavorite ? 'red' : 'gray'}
                            />
                        </TouchableOpacity>
                    )}
                    <Text variant="titleLarge" numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                        {product.name}
                    </Text>
                </View>
                <View style={styles.bottomContent}>
                    <View style={styles.priceRatingContent}>
                        <Text variant="bodyMedium" style={styles.price}>
                            ฿{product?.price?.toLocaleString()}
                        </Text>
                        {screen === 'HOME' && (
                            <Text variant="bodySmall" style={styles.rating}>
                                <Image
                                    source={require('@/assets/images/star.png')}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        marginRight: 2,
                                    }}
                                    resizeMode="contain"
                                />
                                {product?.rating?.rate} ({product?.rating?.count} รีวิว)
                            </Text>
                        )}
                    </View>
                    {screen === 'HOME' && (
                        <View style={styles.buttonAddCart}>
                            <Button
                                icon="cart"
                                mode="outlined"
                                onPress={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart();
                                }}
                            >
                                เพิ่มสินค้า
                            </Button>
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 3px',
        backgroundColor: '#f7f3f9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardCover: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    bottomContent: {
        marginTop: 'auto',
        paddingHorizontal: 16,
    },
    price: {
        fontSize: 16,
        color: '#e91e63',
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 14,
        color: '#888',
    },
    favorite: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 4,
        zIndex: 1,
    },
    buttonAddCart: {
        paddingBottom: 16,
    },
    priceRatingContent: {
        paddingBottom: 16,
        flexDirection: 'column',
        gap: 5,
    },
});
