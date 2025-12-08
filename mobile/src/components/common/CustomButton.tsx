import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

// --- Prop Types for Customization ---

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface CustomButtonProps extends TouchableOpacityProps {
  /** The text content of the button. */
  title: string;

  /** Visual style of the button. Defaults to 'primary'. */
  variant?: ButtonVariant;

  /** State of the button. If true, shows loading spinner and disables presses. */
  isLoading?: boolean;

  /** Optional custom style for the button container. */
  buttonStyle?: ViewStyle;

  /** Optional custom style for the button text. */
  textStyle?: TextStyle;
}

// --- Component Implementation ---

const BASE_COLORS = {
  primary: '#5F4B8B', // Dark Purple
  secondary: '#FFC107', // Amber/Gold
  outline: 'transparent',
  textLight: '#FFFFFF',
  textDark: '#5F4B8B',
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled: propDisabled = false, // Use propDisabled to avoid conflict with the component's internal disabled state
  buttonStyle,
  textStyle,
  ...rest
}) => {
  const isDisabled = propDisabled || isLoading;

  // Dynamically determine button and text styles based on variant and state
  const getButtonStyles = (
    variant: ButtonVariant,
    disabled: boolean,
  ): ViewStyle[] => {
    const stylesArray: ViewStyle[] = [styles.baseButton];

    switch (variant) {
      case 'primary':
        stylesArray.push(styles.primaryButton);
        break;
      case 'secondary':
        stylesArray.push(styles.secondaryButton);
        break;
      case 'outline':
        stylesArray.push(styles.outlineButton);
        break;
    }

    if (disabled) {
      stylesArray.push(styles.disabledButton);
    }

    return stylesArray;
  };

  const getTextStyle = (
    variant: ButtonVariant,
    disabled: boolean,
  ): TextStyle[] => {
    const stylesArray: TextStyle[] = [styles.baseText];

    switch (variant) {
      case 'primary':
        stylesArray.push(styles.textLight);
        break;
      case 'secondary':
        stylesArray.push(styles.textDark);
        break;
      case 'outline':
        stylesArray.push(styles.textDark);
        break;
    }

    if (disabled) {
      // Apply a faded text style when disabled
      stylesArray.push(styles.disabledText);
    }

    return stylesArray;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={[...getButtonStyles(variant, isDisabled), buttonStyle]}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator
          color={
            variant === 'primary' ? BASE_COLORS.textLight : BASE_COLORS.textDark
          }
        />
      ) : (
        <Text style={[...getTextStyle(variant, isDisabled), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// --- Stylesheet for Variants and Base Styles ---

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Variants
  primaryButton: {
    backgroundColor: BASE_COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: BASE_COLORS.secondary,
  },
  outlineButton: {
    backgroundColor: BASE_COLORS.outline,
    borderWidth: 2,
    borderColor: BASE_COLORS.primary,
  },

  // Text Colors
  textLight: {
    color: BASE_COLORS.textLight,
  },
  textDark: {
    color: BASE_COLORS.textDark,
  },

  // States
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    // Optionally apply specific color/style for disabled text
  },
});
