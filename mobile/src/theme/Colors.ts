/**
 * Theme Color Constants
 *
 * This file centralizes all colors defined in the style guide
 * to ensure consistency across the React Native application.
 */

// --- Primary Colors ---
// This is the main branding palette, based on the purple shades.
export const PRIMARY = {
  // Light to Dark shades based on the style guide (50 to 900)
  P50: '#FAF9FD',
  P100: '#ESDEF8',
  P200: '#CABCED',
  P300: '#A28CE0', // Note: This appears to be the accent color used for the button.
  P400: '#7D64C3',
  P500: '#5A440BC', // Note: There seems to be a typo in the provided image (#5440BC seems more likely based on context)
  P600: '#352388',
  P700: '#251554',
  P800: '#10052F',
  P900: '#09031B',

  // Custom constant for the main button color seen in the Onboarding UI, which looks like #5F4B8B (or P400/P500 range)
  // We'll use a constant name that reflects its usage:
  BRAND_ACCENT: '#5F4B8B',
};

// --- Grayscale (Neutral) Colors ---
// Used for backgrounds, text, borders, and shadows.
export const GRAYSCALE = {
  G50: '#FAFAFA',
  G100: '#F5F5F5',
  G200: '#EBEBEB',
  G300: '#D6D6D6',
  G400: '#B8B8B8',
  G500: '#A6A6A6',
  G600: '#7A7A7A',
  G700: '#454545',
  G800: '#292929',
  G900: '#121212',

  // Common aliases
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  TEXT_BODY: '#5C5C5C', // A dark gray often used for body text (seen in Onboarding subtitle)
};

// --- Additional (Semantic/Utility) Colors ---
// Used for notifications, warnings, and accents.
export const ADDITIONAL_COLORS = {
  YELLOW: '#FBAE05',
  ORANGE: '#FF8C39',
  RED: '#EF5A56',
  BLUE: '#3784FB',
};

// --- Usage Aliases (Recommended) ---
// Define simple aliases for the most frequently used colors from your UI
export const COLORS = {
  // Base
  WHITE: GRAYSCALE.WHITE,
  BLACK: GRAYSCALE.BLACK,

  // Brand
  PRIMARY_ACCENT: PRIMARY.BRAND_ACCENT, // The primary button/link color
  PRIMARY_DARK: PRIMARY.P700, // A darker brand shade (e.g., for headers)

  // Text
  TEXT_HEADER: GRAYSCALE.G800, // Use a very dark gray/black for high contrast headers (Onboarding Title)
  TEXT_BODY: GRAYSCALE.TEXT_BODY, // For subtitles and paragraph text
  TEXT_DISABLED: GRAYSCALE.G400,

  // Backgrounds/Borders
  BACKGROUND: GRAYSCALE.WHITE,
  BORDER_LIGHT: GRAYSCALE.G200,

  // Utility
  YELLOW: ADDITIONAL_COLORS.YELLOW,
  RED: ADDITIONAL_COLORS.RED,
  BLUE: ADDITIONAL_COLORS.BLUE,
};
