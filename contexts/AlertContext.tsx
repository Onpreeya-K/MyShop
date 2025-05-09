import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AlertContextProps {
    showAddToCartSuccess: () => void;
    showAddFavorite: () => void;
    showDeleteFavorite: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [isShowAddToCart, setIsShowAddToCart] = useState(false);
    const [isShowAddFavorite, setIsShowAddFavorite] = useState(false);
    const [isShowDeleteFavorite, setIsShowDeleteFavorite] = useState(false);

    const showAddToCartSuccess = () => {
        setIsShowAddToCart(true);
        setTimeout(() => setIsShowAddToCart(false), 500);
    };
    const showAddFavorite = () => {
        setIsShowAddFavorite(true);
        setTimeout(() => setIsShowAddFavorite(false), 500);
    };
    const showDeleteFavorite = () => {
        setIsShowDeleteFavorite(true);
        setTimeout(() => setIsShowDeleteFavorite(false), 500);
    };

    return (
        <AlertContext.Provider value={{ showAddToCartSuccess, showAddFavorite, showDeleteFavorite }}>
            {children}
            {isShowAddToCart && (
                <View style={styles.toastWrapper}>
                    <View style={styles.toast}>
                        <MaterialIcons name="task-alt" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
                        <Text style={styles.successText}>เพิ่มสินค้าแล้ว</Text>
                    </View>
                </View>
            )}
            {isShowAddFavorite && (
                <View style={styles.toastWrapper}>
                    <View style={styles.toast}>
                        <MaterialIcons name="favorite" size={20} color="red" style={{ marginRight: 8 }} />
                        <Text style={styles.favoriteText}>เพิ่มรายการที่ชอบแล้ว</Text>
                    </View>
                </View>
            )}
            {isShowDeleteFavorite && (
                <View style={styles.toastWrapper}>
                    <View style={styles.toast}>
                        <MaterialIcons name="favorite-border" size={20} color="red" style={{ marginRight: 8 }} />
                        <Text style={styles.favoriteText}>ลบรายการที่ชอบแล้ว</Text>
                    </View>
                </View>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) throw new Error('useAlertSuccess must be used within AlertProvider');
    return context;
};

import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    toastWrapper: {
        position: 'absolute',
        top: '45%',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
        elevation: 9999,
        pointerEvents: 'none',
    },
    toast: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    successText: {
        color: '#4CAF50',
        fontWeight: '600',
        fontSize: 16,
    },
    favoriteText: {
        color: '#ff0000',
        fontWeight: '600',
        fontSize: 16,
    },
});
