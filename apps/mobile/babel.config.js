module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./apps/mobile"], // Root of the mobile app
          alias: {
            "@root-assets": "../../packages/assets",
            "@components": "./src/components",
            "@types": "../../packages/types",
            "@utils": "./src/utils",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
