import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../types/navigation";

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>App Name</Text>
      <Text>Description of the app</Text>
      <Button title="Explore" onPress={() => navigation.navigate("MapPage")} />
      <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
        <Text>Info Icon</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
