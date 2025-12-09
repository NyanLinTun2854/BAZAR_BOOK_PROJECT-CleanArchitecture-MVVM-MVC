// navigation/BottomTabs.tsx

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabParamList} from './types';

// --- Import Nested Stack Navigators (assume they are also .tsx) ---
import HomeStackScreens from './Stacks/HomeStack';
import CategoryStackScreens from './Stacks/CategoryStack';
import CartStackScreens from './Stacks/CartStack';
import ProfileStackScreens from './Stacks/ProfileStack';

// --- Import SVG Icons ---
// import HomeIcon from '../assets/icons/home.svg';
import HomeIcon from '@assets/icons/Tabs/home.svg';
import CategoryIcon from '@assets/icons/Tabs/category.svg';
import CartIcon from '@assets/icons/Tabs/cart.svg';
import ProfileIcon from '@assets/icons/Tabs/profile.svg';

// ... other icons

const Tab = createBottomTabNavigator<TabParamList>();

// Custom Tab Icon Component (same logic, but now typed by TabParamList)
const TabBarIcon = ({
  routeName,
  focused,
  color,
  size,
}: {
  routeName: keyof TabParamList;
  focused: boolean;
  color: string;
  size: number;
}) => {
  let IconComponent: React.ElementType;

  switch (routeName) {
    case 'HomeTab':
      IconComponent = HomeIcon;
      break;
    case 'CategoryTab':
      IconComponent = CategoryIcon;
      break;
    case 'CartTab':
      IconComponent = CartIcon;
      break;
    case 'ProfileTab':
      IconComponent = ProfileIcon;
      break;
    default:
      return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      fill={color}
      style={{opacity: focused ? 1 : 0.7}}
    />
  );
};

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => (
        <TabBarIcon
          routeName={route.name}
          focused={focused}
          color={color}
          size={size}
        />
      ),
      tabBarActiveTintColor: '#6739B7',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {height: 60, paddingBottom: 5},
    })}>
    <Tab.Screen
      name="HomeTab"
      component={HomeStackScreens}
      options={{title: 'Home'}}
    />
    <Tab.Screen
      name="CategoryTab"
      component={CategoryStackScreens}
      options={{title: 'Category'}}
    />
    <Tab.Screen
      name="CartTab"
      component={CartStackScreens}
      options={{title: 'Cart'}}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileStackScreens}
      options={{title: 'Profile'}}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;
