import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';

import './src/i18n/i18n';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppNavigator />;
};

export default App;

const styles = StyleSheet.create({});
