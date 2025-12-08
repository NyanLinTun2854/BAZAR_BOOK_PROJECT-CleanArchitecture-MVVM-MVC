module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-compiler',
    [
      'babel-plugin-root-import',
      {
        paths: [
          {rootPathPrefix: '@assets', rootPathSuffix: 'src/assets'},
          {rootPathPrefix: '@components', rootPathSuffix: 'src/components'},
          {rootPathPrefix: '@features', rootPathSuffix: 'src/features'},
          {rootPathPrefix: '@navigation', rootPathSuffix: 'src/navigation'},
          {rootPathPrefix: '@services', rootPathSuffix: 'src/services'},
          {rootPathPrefix: '@store', rootPathSuffix: 'src/store'},
          {rootPathPrefix: '@utils', rootPathSuffix: 'src/utils'},
          {rootPathPrefix: '@constants', rootPathSuffix: 'src/constants'},
          {rootPathPrefix: '@helpers', rootPathSuffix: 'src/helpers'},
          {rootPathPrefix: '@theme', rootPathSuffix: 'src/theme'},
        ],
      },
    ],
    'react-native-worklets/plugin',
  ],
};
