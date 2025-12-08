// AppContainer.tsx
import React, {ReactNode} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  StatusBar,
  StatusBarStyle,
  KeyboardAvoidingView,
  ScrollView,
  ViewStyle,
} from 'react-native';
// Use named imports for better clarity, though the default import is fine if your package requires it
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

type AppContainerProps = {
  children: ReactNode;
  scroll?: boolean;
  keyboardAvoiding?: boolean; // now defaults to false
  keyboardBehavior?: 'height' | 'position' | 'padding';
  backgroundColor?: string;
  contentStyle?: ViewStyle;
  statusBarStyle?: StatusBarStyle;
  statusBarBackgroundColor?: string;
  // Set default to FALSE for better cross-platform compatibility and reliability
  statusBarTranslucent?: boolean;
};

// --- CORRECTED DEFAULTS AND IMPLEMENTATION ---

export const AppContainer: React.FC<AppContainerProps> = ({
  children,
  scroll = false,
  keyboardAvoiding = false, // Default false as per request
  keyboardBehavior,
  backgroundColor = '#ffffff',
  contentStyle,
  statusBarStyle = 'dark-content',
  statusBarBackgroundColor,
  statusBarTranslucent = false, // Setting default to FALSE is generally safer
}) => {
  const isAndroid = Platform.OS === 'android';

  // 1. Determine Keyboard Behavior
  // Use 'height' for Android and 'padding' for iOS as common best practice.
  const kbBehavior = keyboardBehavior ?? (isAndroid ? 'height' : 'padding');

  // 2. Determine Android Status Bar Background
  let androidBarBg = statusBarBackgroundColor;
  if (!androidBarBg) {
    // If translucent, use transparent. If not (solid bar), use the container color.
    androidBarBg = statusBarTranslucent ? 'transparent' : backgroundColor;
  }

  // 3. Content Component Selection
  const Content = scroll ? ScrollView : View;

  // 4. Content Props (Handles ScrollView vs. View)
  const contentProps = scroll
    ? {
        contentContainerStyle: [styles.contentContainer, contentStyle],
        // Allows ScrollView to receive taps even if content is smaller than screen
        keyboardShouldPersistTaps: 'handled' as const,
        showsVerticalScrollIndicator: false,
      }
    : {
        style: [styles.content, contentStyle],
      };

  // 5. INNER COMPONENT (SafeAreaView + Content)
  const Inner = (
    // Apply background to SafeAreaView to ensure the entire safe area is colored
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor}]}
      // Explicitly set edges to control where padding is applied.
      // If translucent, we rely on SafeAreaView to handle the top edge correctly.
      edges={['left', 'right', 'bottom', 'top']}
      // NOTE: On Android, if statusBarTranslucent is TRUE, the content starts at Y=0.
      // SafeAreaView must then push the content down. If FALSE, the Status Bar pushes content down.
    >
      <Content {...contentProps}>{children}</Content>
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <View style={[styles.container, {backgroundColor}]}>
        <StatusBar
          barStyle={statusBarStyle}
          // Use the component's prop value
          translucent={statusBarTranslucent}
          // Android needs the background color set when translucent is FALSE
          backgroundColor={isAndroid ? androidBarBg : 'transparent'}
        />
        {keyboardAvoiding ? (
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={kbBehavior}
            // Set keyboardVerticalOffset to handle the height of the Status Bar/Header
            keyboardVerticalOffset={0}>
            {Inner}
          </KeyboardAvoidingView>
        ) : (
          Inner
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  safeArea: {flex: 1},
  flex: {flex: 1},
  content: {flex: 1},
  contentContainer: {flexGrow: 1, paddingBottom: 16},
});
