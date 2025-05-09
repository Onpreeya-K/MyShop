import { StyleSheet } from 'react-native';

import { View, Text } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';
import { useProductContext } from '@/contexts/ProductContext';
import { Util } from '@/utils/utils';

export default function FavoriteScreen() {
    const { colors } = useTheme();
    const { state } = useProductContext();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {!Util.isNullOrUndefined(state.favoriteProduct) ? (
                state.favoriteProduct.map((item) => <Text key={item.id}>{item.name}</Text>)
            ) : (
                <Text style={styles.title}>รายการ favorite ว่าง</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
});
