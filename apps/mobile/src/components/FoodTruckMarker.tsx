import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FoodTruck } from "@types";

type FoodTruckMarkerProps = FoodTruck & {
  onPress: () => void;
};

const FoodTruckMarker = (props: FoodTruckMarkerProps) => {
  const { id, name, latitude, longitude, schedule, onPress } = props;

  return (
    <Marker
      coordinate={{
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }}
    >
      <Image
        source={require("../../assets/truck-icon.png")}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />
      <Callout>
        <View style={styles.callout}>
          <Text style={styles.title}>{name}</Text>
          <Text>{schedule}</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.showMore}>Show More</Text>
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
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
