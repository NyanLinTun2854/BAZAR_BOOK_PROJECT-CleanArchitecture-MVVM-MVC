import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '@features/Home/Home/Home.view';
import AuthorsScreen from '@features/Home/Authors/Authors.view';
import VendorsScreen from '@features/Home/Vendors/Vendors.view';

import {HomeStackParamList} from '@navigation/types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackScreens = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Vendors" component={VendorsScreen} />
    <HomeStack.Screen name="Authors" component={AuthorsScreen} />
  </HomeStack.Navigator>
);

export default HomeStackScreens;
