import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './types';
import AuthStackScreens from './Stacks/AuthStack';

import MainTabNavigator from './BottomTabs';
import NotificationStackScreens from './Stacks/NotificationStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  // TEMPO::: === authentication
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <>
            <RootStack.Screen name="MainApp" component={MainTabNavigator} />
            <RootStack.Screen
              name="Notification"
              component={NotificationStackScreens}
            />
          </>
        ) : (
          <RootStack.Screen name="AuthFlow" component={AuthStackScreens} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
