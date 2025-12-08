import {TextStyle} from 'react-native';

/**
 * Typography Constants
 *
 * This file centralizes all font families, sizes, and weights
 * to ensure consistent typography based on the design system.
 */

// --- 1. Font Families (Aliases for consistent usage) ---
// NOTE: In a real project, you must ensure these custom fonts (Open Sans, Roboto)
// are properly linked and loaded into your React Native project.
export const FONT_FAMILY = {
  // Headings
  HEADING_BOLD: 'OpenSans-Bold',

  // Body Text
  BODY_BOLD: 'Roboto-Bold',
  BODY_SEMI_BOLD: 'Roboto-SemiBold',
  BODY_MEIDUM: 'Roboto-Medium',
  BODY_REGULAR: 'Roboto-Regular',
};

// --- 2. Font Weights (Standardized aliases) ---
// This maps the design system weight names (Bold, Medium, etc.) to
// the standard React Native 'fontWeight' properties.
export const FONT_WEIGHT = {
  BOLD: '700' as const, // Used for Headings (Open Sans Bold) and Body (Roboto Bold)
  SEMI_BOLD: '600' as const, // Used for Body (Roboto SemiBold)
  MEDIUM: '500' as const, // Used for Body (Roboto Medium)
  REGULAR: '400' as const, // Used for Body (Roboto Regular)
};

// --- 3. Font Sizes (Standardized sizes) ---
export const FONT_SIZE = {
  // Headings
  H1: 40,
  H2: 32,
  H3: 24,
  H4: 20,
  H5: 18,
  H6: 16,

  // Body Sizes
  BODY_XLARGE: 18, // Used for Body XLarge
  BODY_LARGE: 16, // Used for Body Large (H6 is also 16px, but for different family/weight)
  BODY_MEDIUM: 14, // Used for Body Medium
  BODY_SMALL: 12, // Used for Body Small
};

// --- 4. Composed Text Styles (Complete TextStyle objects) ---
// These combine family, size, and weight into reusable styles.

// --- HEADINGS (Open Sans Bold) ---
export const HEADINGS: {[key: string]: TextStyle} = {
  H1: {
    fontFamily: FONT_FAMILY.HEADING_BOLD,
    fontSize: FONT_SIZE.H1,
  },
  H2: {
    fontFamily: FONT_FAMILY.HEADING_BOLD,
    fontSize: FONT_SIZE.H2,
  },
  H3: {
    fontFamily: FONT_FAMILY.HEADING_BOLD,
    fontSize: FONT_SIZE.H3,
  },
  H4: {
    fontFamily: FONT_FAMILY.HEADING_BOLD,
    fontSize: FONT_SIZE.H4,
  },
  H5: {
    fontFamily: FONT_FAMILY.HEADING_BOLD,
    fontSize: FONT_SIZE.H5,
  },
  H6: {
    fontFamily: FONT_FAMILY.HEADING_BOLD,
    fontSize: FONT_SIZE.H6,
  },
};

// --- BODY TEXT (Roboto) ---
export const BODY: {[key: string]: TextStyle} = {
  // XLarge (18px)
  XLARGE_MEDIUM: {
    fontFamily: FONT_FAMILY.BODY_MEIDUM,
    fontSize: FONT_SIZE.BODY_XLARGE,
  },

  // Large (16px)
  LARGE_SEMIBOLD: {
    fontFamily: FONT_FAMILY.BODY_SEMI_BOLD,
    fontSize: FONT_SIZE.BODY_LARGE,
  },
  LARGE_MEDIUM: {
    fontFamily: FONT_FAMILY.BODY_MEIDUM,
    fontSize: FONT_SIZE.BODY_LARGE,
  },
  LARGE_REGULAR: {
    fontFamily: FONT_FAMILY.BODY_REGULAR,
    fontSize: FONT_SIZE.BODY_LARGE,
  },

  // Medium (14px)
  MEDIUM_BOLD: {
    fontFamily: FONT_FAMILY.BODY_BOLD,
    fontSize: FONT_SIZE.BODY_MEDIUM,
  },
  MEDIUM_SEMIBOLD: {
    fontFamily: FONT_FAMILY.BODY_SEMI_BOLD,
    fontSize: FONT_SIZE.BODY_MEDIUM,
  },
  MEDIUM_MEDIUM: {
    fontFamily: FONT_FAMILY.BODY_MEIDUM,
    fontSize: FONT_SIZE.BODY_MEDIUM,
  },
  MEDIUM_REGULAR: {
    fontFamily: FONT_FAMILY.BODY_REGULAR,
    fontSize: FONT_SIZE.BODY_MEDIUM,
  },

  // Small (12px)
  SMALL_BOLD: {
    fontFamily: FONT_FAMILY.BODY_BOLD,
    fontSize: FONT_SIZE.BODY_SMALL,
  },
  SMALL_SEMIBOLD: {
    fontFamily: FONT_FAMILY.BODY_SEMI_BOLD,
    fontSize: FONT_SIZE.BODY_SMALL,
  },
  SMALL_MEDIUM: {
    fontFamily: FONT_FAMILY.BODY_MEIDUM,
    fontSize: FONT_SIZE.BODY_SMALL,
  },
  SMALL_REGULAR: {
    fontFamily: FONT_FAMILY.BODY_REGULAR,
    fontSize: FONT_SIZE.BODY_SMALL,
  },
};
