import React, { useState } from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FoodTruckModal from "./FoodTruckModal";
import { FoodTruck } from "../types";

const FoodTruckMarker = (foodTruck: FoodTruck) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowMore = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Marker
        key={foodTruck.id}
        coordinate={{
          latitude: parseFloat(foodTruck.latitude),
          longitude: parseFloat(foodTruck.longitude),
        }}
      >
        <Image
          source={require("../../assets/truck-icon.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <Callout>
          <View style={styles.callout}>
            <Text style={styles.title}>{foodTruck.name}</Text>
            <Text>{foodTruck.schedule}</Text>
            <TouchableOpacity onPress={handleShowMore}>
              <Text style={styles.showMore}>Show More</Text>
            </TouchableOpacity>
          </View>
        </Callout>
      </Marker>
      <FoodTruckModal
        visible={modalVisible}
        onClose={handleCloseModal}
        foodTruck={foodTruck}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  callout: {
    width: 200,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  showMore: {
    color: "blue",
    marginTop: 10,
  },
});

export default FoodTruckMarker;
