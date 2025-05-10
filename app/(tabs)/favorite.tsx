import { StyleSheet } from 'react-native';
import FavoriteComponent from '@/components/FavoriteComponent';
import SmartPhoneDetail from '@/components/SmartPhoneDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function FavoriteScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorite" component={FavoriteComponent} options={{ headerShown: false }} />
            <Stack.Screen
                name="SmartPhoneDetail"
                component={SmartPhoneDetail}
                options={{
                    title: 'รายละเอียดสินค้า',
                    headerBackTitle: '',
                }}
            />
        </Stack.Navigator>
    );
}
