import React from "react";
import { View, Text, Linking } from "react-native";

const AboutUs: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>About Us</Text>
      <Text>Details about the app</Text>
      <Text onPress={() => Linking.openURL("https://github.com/your-repo")}>
        GitHub: @your-repo
      </Text>
    </View>
  );
};

export default AboutUs;
