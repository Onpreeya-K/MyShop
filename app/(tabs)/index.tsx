import ProductDeviceComponent from '@/components/ProductDeviceComponent';
import ProductDeviceDetailComponent from '@/components/ProductDeviceDetailComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function TabHomeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProductDevice" component={ProductDeviceComponent} options={{ headerShown: false }} />
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
