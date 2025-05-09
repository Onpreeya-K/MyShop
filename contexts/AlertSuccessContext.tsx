import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlertSuccessContextProps {
    show: () => void;
}

const AlertSuccessContext = createContext<AlertSuccessContextProps | undefined>(undefined);

export const AlertSuccessProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);

    const show = () => {
        setVisible(true);
        setTimeout(() => setVisible(false), 500);
    };

    return (
        <AlertSuccessContext.Provider value={{ show }}>
            {children}
            {visible && (
                <View style={styles.toastWrapper}>
                    <View style={styles.toast}>
                        <MaterialIcons name="task-alt" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
                        <Text style={styles.toastText}>เพิ่มสินค้าแล้ว</Text>
                    </View>
                </View>
            )}
        </AlertSuccessContext.Provider>
    );
};

export const useAlertSuccess = () => {
    const context = useContext(AlertSuccessContext);
    if (!context) throw new Error('useAlertSuccess must be used within AlertSuccessProvider');
    return context;
};

import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
    toastText: {
        color: '#4CAF50',
        fontWeight: '600',
        fontSize: 16,
    },
});
