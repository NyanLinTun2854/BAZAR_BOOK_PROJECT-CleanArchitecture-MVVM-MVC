import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyCartScreen from '@features/Cart/MyCart/MyCart.view';
import ConfirmOrderScreen from '@features/Cart/ConfirmOrder/ConfirmOrder.view';
import OrderSuccessScreen from '@features/Cart/OrderSuccess/OrderSuccess.view';
import OrderWaitingScreen from '@features/Cart/OrderWaiting/OrderWaiting.view';

import {CartStackParamList} from '@navigation/types';

const CartStack = createNativeStackNavigator<CartStackParamList>();

const CartStackScreens = () => (
  <CartStack.Navigator>
    <CartStack.Screen name="Cart" component={MyCartScreen} />
    <CartStack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />
    <CartStack.Screen name="OrderWaiting" component={OrderWaitingScreen} />
    <CartStack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
  </CartStack.Navigator>
);

export default CartStackScreens;
