import { useAlert } from '@/contexts/AlertContext';
import { useProductContext } from '@/contexts/ProductContext';
import { Product } from '@/types/ProductType';
import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

type ProductCardProps = {
    product: Product;
    onPress: (id: number) => void;
};

export default function ProductCard({ product, onPress }: ProductCardProps) {
    const { dispatch } = useProductContext();
    const { showAddToCartSuccess } = useAlert();
    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        showAddToCartSuccess();
    };

    return (
        <TouchableWithoutFeedback onPress={() => onPress(product.id)}>
            <Card style={styles.card} mode="outlined">
                <Card.Cover source={{ uri: product.image }} style={styles.cardCover} />
                <Card.Content style={styles.cardContent}>
                    <Text variant="titleLarge" numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                        {product.name}
                    </Text>
                    <View style={styles.bottomContent}>
                        <Text variant="bodyMedium" style={styles.price}>
                            ฿{product?.price?.toLocaleString()}
                        </Text>
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
                    </View>
                </Card.Content>
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
            </Card>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
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
