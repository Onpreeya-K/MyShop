import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SmartPhone from '@/components/SmartPhone';
import SmartPhoneDetail from '@/components/SmartPhoneDetail';

const Stack = createNativeStackNavigator();
export default function TabHomeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SmartPhone" component={SmartPhone} options={{ headerShown: false }} />
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