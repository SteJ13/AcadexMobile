module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@hooks': './src/hooks',
          '@context': './src/context',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@assets': './assets',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
