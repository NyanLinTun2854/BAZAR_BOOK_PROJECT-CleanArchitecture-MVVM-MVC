import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {LucideIcon, ChevronLeft} from 'lucide-react-native';

interface AppHeaderProps {
  title?: string;
  LeftIcon?: LucideIcon | React.ReactNode;
  RightIcon?: LucideIcon | React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  iconSize?: number;
  iconColor?: string;
  showBack?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const AppHeader = ({
  title,
  LeftIcon,
  RightIcon,
  onLeftPress,
  onRightPress,
  iconSize = 24,
  iconColor = '#1A1A1A',
  showBack = false,
  containerStyle,
  titleStyle,
}: AppHeaderProps) => {
  const renderIcon = (Icon: LucideIcon | React.ReactNode) => {
    if (!Icon) return null;
    if (typeof Icon === 'function') {
      const IconComponent = Icon as LucideIcon;
      return (
        <IconComponent size={iconSize} color={iconColor} strokeWidth={2} />
      );
    }
    return Icon;
  };

  return (
    <View style={[styles.headerOuter, containerStyle]}>
      {/* Left Slot */}
      <View style={styles.slot}>
        {showBack ? (
          <TouchableOpacity onPress={onLeftPress} hitSlop={10}>
            <ChevronLeft size={iconSize} color={iconColor} strokeWidth={2.5} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onLeftPress} hitSlop={10}>
            {renderIcon(LeftIcon)}
          </TouchableOpacity>
        )}
      </View>

      {/* Center Slot */}
      <View style={styles.centerSlot}>
        {title && (
          <Text style={[styles.titleText, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      {/* Right Slot */}
      <View style={[styles.slot, styles.rightAlign]}>
        <TouchableOpacity onPress={onRightPress} hitSlop={10}>
          {renderIcon(RightIcon)}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerOuter: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  slot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerSlot: {
    flex: 4, // More space for the title
    alignItems: 'center',
  },
  rightAlign: {
    justifyContent: 'flex-end',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});

export default AppHeader;
