import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 1. Onboarding Flow
import OnboardingScreen from '@features/Auth/Onboarding/Onboarding.view';

// 2. Sign In & Sign Up Flow
import EnterPhoneNumberScreen from '@features/Auth/EnterPhoneNumber/EnterPhoneNumber.view';
import SignInScreen from '@features/Auth/SignIn/SignIn.view';
import SignUpScreen from '@features/Auth/SignUp/SignUp.view';
import SuccessVerificationScreen from '@features/Auth/SuccessVerification/SuccessVerification.view';
import VerificationEmailScreen from '@features/Auth/VerificationEmail/VerificationEmail.view';
import VerificationPhoneScreen from '@features/Auth/VerificationPhone/VerificationPhone';

// 3. Forgot Password Flow
import ForgotPasswordScreen from '@features/Auth/ForgotPassword/ForgotPassword.view';
import ResetPasswordScreen from '@features/Auth/ResetPassword/ResetPassword.view';
import VerificationCodeScreen from '@features/Auth/VerificationCode/VerificationCode.view';
import NewPasswordScreen from '@features/Auth/NewPassword/NewPassword.view';
import SuccessPasswordChangedScreen from '@features/Auth/SuccessPasswordChanged/SuccessPasswordChanged.view';

import {AuthStackParamList} from '@navigation/types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreens = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    {/* 1. Onboarding Flow */}
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />

    {/* 2. Sign In & Sign Up Flow */}
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen
      name="VerificationEmail"
      component={VerificationEmailScreen}
    />
    <AuthStack.Screen
      name="VerificationPhone"
      component={VerificationPhoneScreen}
    />
    <AuthStack.Screen
      name="EnterPhoneNumber"
      component={EnterPhoneNumberScreen}
    />
    <AuthStack.Screen
      name="SuccessVerification"
      component={SuccessVerificationScreen}
    />

    {/* 3. Forgot Password Flow */}
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <AuthStack.Screen
      name="VerificationCode"
      component={VerificationCodeScreen}
    />
    <AuthStack.Screen name="NewPassword" component={NewPasswordScreen} />
    <AuthStack.Screen
      name="SuccessPasswordChanged"
      component={SuccessPasswordChangedScreen}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreens;
