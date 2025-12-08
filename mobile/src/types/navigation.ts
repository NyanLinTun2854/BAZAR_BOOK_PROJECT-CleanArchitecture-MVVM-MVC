// types.ts or features/Authentication/types/index.ts

// Define a type for all screens in the Auth Stack
export type AuthStackParamList = {
  Login: undefined; // undefined means no parameters are expected when navigating
  Register: undefined;
};

// Define a type for all screens in the Home Stack
export type HomeStackParamList = {
  Home: undefined;
  // Add other Home screens here
};

// Combine all navigators' params into a single RootStackParamList if needed for navigation across modules
export type RootStackParamList = AuthStackParamList & HomeStackParamList;
