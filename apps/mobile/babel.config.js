module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@root-assets": "../../assets",
            "@components": "./src/components",
            "@app": "./src/apasdp",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
