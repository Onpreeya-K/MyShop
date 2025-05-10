import FavoriteComponent from '@/components/FavoriteComponent';
import ProductDeviceDetailComponent from '@/components/ProductDeviceDetailComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function FavoriteScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorite" component={FavoriteComponent} options={{ headerShown: false }} />
            <Stack.Screen
                name="ProductDeviceDetail"
                component={ProductDeviceDetailComponent}
                options={{
                    title: 'รายละเอียดสินค้า',
                    headerBackTitle: '',
                }}
            />
        </Stack.Navigator>
    );
}
