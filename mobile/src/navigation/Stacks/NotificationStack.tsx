import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NotificationScreen from '@features/Notification/Notification/Notification.view';
import NotificationInfoDetailScreen from '@features/Notification/NotificationInfoDetail/NotificationInfoDetail.view';

import {NotificationStackParamList} from '@navigation/types';

const NotificationStack =
  createNativeStackNavigator<NotificationStackParamList>();

const NotificationStackScreens = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name="Notification"
      component={NotificationScreen}
    />
    <NotificationStack.Screen
      name="NotificationInfoDetail"
      component={NotificationInfoDetailScreen}
    />
  </NotificationStack.Navigator>
);

export default NotificationStackScreens;
