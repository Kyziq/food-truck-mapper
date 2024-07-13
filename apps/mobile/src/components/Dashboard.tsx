// src/components/Dashboard.tsx
import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Truck Mapper</Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("AboutUs")}
        >
          <Ionicons name="information-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Explore"
          onPress={() => navigation.navigate("Map", { location, foodTrucks })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconContainer: {
    padding: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default DashboardScreen;
