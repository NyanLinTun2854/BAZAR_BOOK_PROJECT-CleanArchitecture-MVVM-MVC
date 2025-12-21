import React, {ReactNode} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  StatusBar,
  StatusBarStyle,
  KeyboardAvoidingView,
  ViewStyle,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type AppWrapperProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  isForm?: boolean; // Set to true if using TextInputs to enable keyboard lifting
  backgroundColor?: string;
  contentStyle?: ViewStyle;
  statusBarStyle?: StatusBarStyle;
  statusBarColor?: string;
  statusBarTranslucent?: boolean;
  keyboardVerticalOffset?: number;
};

const AppWrapperContent = ({
  children,
  header,
  footer,
  isForm = false,
  backgroundColor = '#ffffff',
  contentStyle,
  statusBarStyle = 'dark-content',
  statusBarColor,
  statusBarTranslucent = true,
  keyboardVerticalOffset = 0,
}: AppWrapperProps) => {
  const insets = useSafeAreaInsets();

  // On iOS, 'padding' is essential. On Android, usually handled by manifest (adjustResize).
  const kbBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  const finalStatusBarColor = statusBarTranslucent
    ? 'transparent'
    : statusBarColor ?? backgroundColor;

  // Determine if we wrap in KeyboardAvoidingView
  const Wrapper = isForm ? KeyboardAvoidingView : View;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <StatusBar
        barStyle={statusBarStyle}
        translucent={statusBarTranslucent}
        backgroundColor={finalStatusBarColor}
      />

      {/* Dynamic Status Bar Height */}
      <View
        style={{height: insets.top, backgroundColor: finalStatusBarColor}}
      />

      {/* Static Header: Stays at the top while list scrolls below */}
      {header && <View style={styles.headerContainer}>{header}</View>}

      <Wrapper
        style={styles.flex}
        behavior={kbBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        {/* TouchableWithoutFeedback is used for forms to dismiss keyboard.
            accessible={false} prevents it from interfering with screen readers.
        */}
        <TouchableWithoutFeedback
          onPress={isForm ? Keyboard.dismiss : undefined}
          accessible={false}>
          <View style={[styles.flex, contentStyle]}>{children}</View>
        </TouchableWithoutFeedback>

        {/* Dynamic Footer: Sits at bottom, or above keyboard if isForm is true */}
        {footer && <View style={styles.footerContainer}>{footer}</View>}
      </Wrapper>

      {/* Dynamic Bottom Spacing (iPhone Home Indicator / Android Navigation Bar) */}
      <View style={{height: insets.bottom}} />
    </View>
  );
};

export const AppWrapper = (props: AppWrapperProps) => (
  <SafeAreaProvider>
    <AppWrapperContent {...props} />
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {flex: 1},
  flex: {flex: 1},
  headerContainer: {width: '100%'},
  footerContainer: {width: '100%'},
});
