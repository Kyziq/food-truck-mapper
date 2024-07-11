import React from "react";
import MapView, { Marker } from "react-native-maps";
import FoodTruckMarker from "./FoodTruckMarker";
import { StyleSheet, Dimensions } from "react-native";

type MapComponentProps = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  foodTrucks: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    schedule: string;
    operator_name: string;
  }[];
};

const MapComponent = ({ location, foodTrucks }: MapComponentProps) => {
  let region = {
    latitude: 3.139,
    longitude: 101.6869,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (location) {
    region = {
      ...region,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  return (
    <MapView style={styles.map} initialRegion={region}>
      {location && (
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={"Your Location"}
        />
      )}
      {foodTrucks.map((truck) => (
        <FoodTruckMarker key={truck.id} {...truck} />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapComponent;
