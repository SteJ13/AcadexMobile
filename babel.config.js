module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@context': './src/context',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@notifications': './src/notifications',
          '@config': './src/config',
          '@constants': './src/constants',
          '@translate': './src/translate',
        },
      },
    ],
  ],
};
