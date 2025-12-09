// navigation/types.ts

// --- 1. Define Param Lists for each Stack Navigator ---

export type AuthStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  VerificationEmail: undefined;
  VerificationPhone: undefined;
  EnterPhoneNumber: undefined;
  SuccessVerification: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerificationCode: undefined;
  NewPassword: undefined;
  SuccessPasswordChanged: undefined;
};

// Parameters for the Profile Stack Screens
export type ProfileStackParamList = {
  Profile: undefined; // No parameters needed for the main Profile screen
  MyAccount: undefined;
  Location: undefined;
  MyFavourites: undefined;
  OrderHistory: undefined;
  HelpCenter: undefined;
  // ... other profile sub-screens
};

// Parameters for the Home Stack Screens
export type HomeStackParamList = {
  Home: undefined;
  //   BookDetail: {bookId: string; title: string}; // Example: Requires book ID and title
  Vendors: undefined;
  Authors: undefined;
};

// Parameters for the Cart & Checkout Stack Screens
export type CartStackParamList = {
  Cart: undefined;
  ConfirmOrder: undefined;
  //   OrderWaiting: {orderId: string; status: 'pending' | 'shipped' | 'delivered'};
  OrderWaiting: undefined;
  //   OrderSuccess: {orderId: string};
  OrderSuccess: undefined;
};

// Parameters for the Category Stack Screens
export type CategoryStackParamList = {
  Category: undefined;
  SearchCategory: undefined; // Shared screen with HomeStack
  // ... other category sub-screens
};

export type NotificationStackParamList = {
  Notification: undefined;
  NotificationInfoDetail: undefined;
};

// --- 2. Define the Tab Navigator's Param List ---
// A Tab Navigator's parameter list maps a tab name to its nested Stack's Param List
export type TabParamList = {
  HomeTab: HomeStackParamList;
  CategoryTab: CategoryStackParamList;
  CartTab: CartStackParamList;
  ProfileTab: ProfileStackParamList;
};

// --- 3. Define the Root Stack's Param List ---
// This includes the authentication flow, the Main App (tabs), and global screens.
export type RootStackParamList = {
  // Auth Flow
  AuthFlow: undefined;

  // Main App (The Tabs container)
  MainApp: undefined;

  // Global Screens (e.g., Notifications)
  Notification: undefined;
};
