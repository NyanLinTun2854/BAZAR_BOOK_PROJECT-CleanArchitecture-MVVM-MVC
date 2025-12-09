import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from '@features/Profile/Profile/Profile.view';
import MyAccountScreen from '@features/Profile/MyAccount/MyAccount.view';
import LocationScreen from '@features/Profile/Location/Location.view';
import MyFavouritesScreen from '@features/Profile/MyFavourites/MyFavourites.view';
import OrderHistoryScreen from '@features/Profile/OrderHistory/OrderHistory.view';
import HelpCenterScreen from '@features/Profile/HelpCenter/HelpCenter.view';
import {ProfileStackParamList} from '@navigation/types';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackScreens = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="MyAccount" component={MyAccountScreen} />
    <ProfileStack.Screen name="Location" component={LocationScreen} />
    <ProfileStack.Screen name="MyFavourites" component={MyFavouritesScreen} />
    <ProfileStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreens;
