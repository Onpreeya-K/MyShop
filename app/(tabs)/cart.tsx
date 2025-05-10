import { StyleSheet } from 'react-native';

import CartScreen from '@/components/CartComponent';
import { View } from '@/components/Themed';
import { useProductContext } from '@/contexts/ProductContext';
import { useTheme } from '@react-navigation/native';

export default function TabTwoScreen() {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CartScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
