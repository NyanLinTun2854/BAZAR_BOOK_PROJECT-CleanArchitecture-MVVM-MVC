import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {LucideIcon, Eye, EyeOff} from 'lucide-react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  LeftIcon?: LucideIcon;
  containerStyle?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
}

export const CustomInput = ({
  label,
  error,
  LeftIcon,
  containerStyle,
  iconSize = 20,
  iconColor = '#999',
  secureTextEntry,
  ...props
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggle for password visibility
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  // Determine if we should actually hide the text
  const shouldHideText = secureTextEntry && !isPasswordVisible;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error ? styles.inputError : null,
        ]}>
        {LeftIcon && (
          <View style={styles.leftIcon}>
            <LeftIcon size={iconSize} color={iconColor} />
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholderTextColor="#C4C4C4"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={shouldHideText}
          autoCapitalize="none"
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={toggleVisibility} style={styles.rightIcon}>
            {isPasswordVisible ? (
              <EyeOff size={iconSize} color={iconColor} />
            ) : (
              <Eye size={iconSize} color={iconColor} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // Matches your "off-white" screenshot background
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent', // Looks borderless in your screenshots
    paddingHorizontal: 12,
    height: 56,
  },
  inputFocused: {
    borderColor: '#6200EE', // Subtle focus color
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#1A1A1A',
    fontSize: 16,
  },
  rightIcon: {
    padding: 4,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
