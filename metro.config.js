// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = async () => {
  const config = await getDefaultConfig(__dirname);

  // 1. Allow .tflite files to be bundled as assets
  config.resolver.assetExts.push("tflite");

  // 2. Redirect any `react-native-fs` imports to use Expo's FileSystem instead
  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    "react-native-fs": require.resolve("expo-file-system"),
  };

  return config;
};
