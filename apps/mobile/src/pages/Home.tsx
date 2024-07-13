import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
          <Ionicons name="information-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Food Truck Mapper</Text>
      <Image
        source={require("../../assets/animatedLogo2.gif")}
        style={styles.logo}
      />
      <Button title="Explore" onPress={() => navigation.navigate("MapPage")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default Home;
