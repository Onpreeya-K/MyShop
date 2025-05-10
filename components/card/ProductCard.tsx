import { useAlert } from '@/contexts/AlertContext';
import { useProductContext } from '@/contexts/ProductContext';
import { Product } from '@/types/ProductType';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

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
            <Card style={styles.card} mode="outlined">
                <Card.Cover source={{ uri: product.image }} style={styles.cardCover} />
                {screen === 'FAVORITE' && (
                    <TouchableOpacity
                        onPress={handleAddToFavorite}
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'white',
                            borderRadius: 16,
                            padding: 4,
                            zIndex: 1,
                        }}
                    >
                        <MaterialCommunityIcons
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isFavorite ? 'red' : 'gray'}
                        />
                    </TouchableOpacity>
                )}
                <Card.Content style={styles.cardContent}>
                    <Text variant="titleLarge" numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                        {product.name}
                    </Text>
                    <View style={styles.bottomContent}>
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
                </Card.Content>
                {screen === 'HOME' && (
                    <Card.Actions>
                        <Button
                            icon="cart"
                            onPress={(e) => {
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                        >
                            เพิ่มสินค้า
                        </Button>
                    </Card.Actions>
                )}
            </Card>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        height: '100%',
        marginVertical: 0,
        marginHorizontal: 0,
        elevation: 2,
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRadius: 8,
    },
    cardCover: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
        backgroundColor: '#ffffff',
        borderRadius: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomContent: {
        marginTop: 'auto',
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
});
