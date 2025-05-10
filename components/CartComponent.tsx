import { useProductContext } from '@/contexts/ProductContext';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Util } from '@/utils/utils';
import { RightSwipeActions } from './swipeaction';

const CartScreen = () => {
    const { state, dispatch } = useProductContext();

    const handleIncrement = (id: string) => {
        dispatch({ type: 'INCREMENT_CART_QUANTITY', payload: id });
    };

    const handleDecrement = (id: string) => {
        dispatch({ type: 'DECREMENT_CART_QUANTITY', payload: id });
    };
    const handleDelete = (id: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const totalPrice = state.productInCart.reduce((sum, item) => sum + (item?.price ?? 0) * item.quantity, 0);

    return (
        <View style={styles.body}>
            {!Util.isNullOrUndefined(state.productInCart) ? (
                <GestureHandlerRootView style={styles.gestureContainer}>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={state.productInCart}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.cardContainer}>
                                    <Swipeable
                                        renderRightActions={() => (
                                            <RightSwipeActions onDelete={() => handleDelete(item.idAddToCart)} />
                                        )}
                                        leftThreshold={Infinity}
                                    >
                                        <View style={styles.card}>
                                            <Image source={{ uri: item.image }} style={styles.image} />
                                            <View style={styles.details}>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <Text style={styles.price}>{item?.price?.toLocaleString()}฿</Text>
                                                <View style={styles.quantityControl}>
                                                    <TouchableOpacity onPress={() => handleDecrement(item.idAddToCart)}>
                                                        <Text style={styles.button}>−</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.quantity}>{item.quantity}</Text>
                                                    <TouchableOpacity onPress={() => handleIncrement(item.idAddToCart)}>
                                                        <Text style={styles.button}>＋</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Swipeable>
                                </View>
                            )}
                        />
                        <View style={styles.total}>
                            <Text style={styles.totalText}>ราคารวม: {totalPrice.toLocaleString()} ฿</Text>
                        </View>
                    </SafeAreaView>
                </GestureHandlerRootView>
            ) : (
                <View style={styles.cartContainer}>
                    <View style={styles.emptyCartContent}>
                        <Text style={styles.emptyCartText}>รถเข็นว่าง</Text>
                    </View>
                    <View style={styles.total}>
                        <Text style={styles.totalText}>ราคารวม: {totalPrice.toLocaleString()} ฿</Text>
                    </View>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    body: { width: '100%', height: '100%', backgroundColor: '#ffffff' },
    container: { flex: 1, backgroundColor: '#ffffff' },
    cardContainer: {
        marginVertical: 4,
        marginHorizontal: 12,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    image: { width: 80, height: 80, borderRadius: 8 },
    details: { flex: 1, marginLeft: 12 },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14, color: '#888', marginTop: 4 },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    button: {
        fontSize: 20,
        width: 32,
        textAlign: 'center',
        backgroundColor: '#ddd',
        borderRadius: 6,
    },
    quantity: { marginHorizontal: 12, fontSize: 16 },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#ff4444',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginHorizontal: 12,
        borderRadius: 8,
        marginVertical: 4,
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: { color: 'white', fontWeight: 'bold' },
    total: {
        width: '100%',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f2f2f2',
    },
    totalText: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
    cartContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    emptyCartContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CartScreen;
