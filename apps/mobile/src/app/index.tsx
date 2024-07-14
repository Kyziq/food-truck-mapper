import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Welcome() {
  return (
    <LinearGradient
      colors={["#FF9A8B", "#FF6A88", "#FF99AC"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Food Truck Mapper</Text>
          <Text style={styles.description}>
            Your Ultimate Street Food Adventure!
          </Text>
          <Image
            source={require("../../assets/animatedLogo2.gif")}
            style={styles.logo}
          />
          <Link href="/(tabs)/map" asChild>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Discover Food Trucks</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, alignItems: "center" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 30,
    fontStyle: "italic",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "white",
  },
  exploreButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 5,
  },
  exploreButtonText: {
    color: "#FF6A88",
    fontSize: 18,
    fontWeight: "bold",
  },
});
