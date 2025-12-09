const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const {
    resolver: {assetExts, sourceExts},
  } = defaultConfig;

  return {
    transformer: {
      // 1. Specify the custom transformer for SVG files
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      // 2. Remove 'svg' from the list of asset extensions
      // This tells Metro *not* to treat SVG files as generic assets.
      assetExts: assetExts.filter(ext => ext !== 'svg'),

      // 3. Add 'svg' to the list of source extensions
      // This tells Metro to process SVG files using the transformer (step 1)
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})(); // The async function is immediately invoked

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
