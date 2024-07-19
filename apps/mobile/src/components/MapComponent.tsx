import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import FoodTruckMarker from "./FoodTruckMarker";
import FoodTruckBottomSheet from "./FoodTruckBottomSheet";
import { FoodTruck } from "@types";

type MapComponentProps = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  foodTrucks: FoodTruck[];
  loadFoodTrucks: (region: Region) => Promise<void>;
};

const MapComponent = ({
  location,
  foodTrucks,
  loadFoodTrucks,
}: MapComponentProps) => {
  const initialRegion = {
    // Default to Kuala Lumpur
    latitude: location?.latitude || 3.139,
    longitude: location?.longitude || 101.6869,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [region, setRegion] = useState<Region>(initialRegion);
  const [selectedFoodTruck, setSelectedFoodTruck] = useState<FoodTruck | null>(
    null
  );
  const [lastRegion, setLastRegion] = useState<Region | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Update region when location changes
  useEffect(() => {
    if (location) {
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    }
  }, [location]);

  // Handle marker press to select a food truck
  const handleMarkerPress = (foodTruck: FoodTruck) => {
    setSelectedFoodTruck(foodTruck);
  };

  // Handle closing the bottom sheet
  const handleCloseBottomSheet = () => {
    setSelectedFoodTruck(null);
  };

  // Check if the region change is significant
  const isSignificantRegionChange = (newRegion: Region) => {
    if (!lastRegion) return true;

    const latDiff = Math.abs(newRegion.latitude - lastRegion.latitude);
    const lonDiff = Math.abs(newRegion.longitude - lastRegion.longitude);

    return latDiff > 0.01 || lonDiff > 0.01;
  };

  // Handle region change and load food trucks
  // TODO: Load food trucks only based on the map that is currently displayed
  const handleRegionChangeComplete = async (newRegion: Region) => {
    setRegion(newRegion);

    if (isSignificantRegionChange(newRegion)) {
      setLastRegion(newRegion);
      await loadFoodTrucks(newRegion);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
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
          <FoodTruckMarker
            key={truck.foodTruckId}
            {...truck}
            onPress={() => handleMarkerPress(truck)}
          />
        ))}
      </MapView>
      {selectedFoodTruck && (
        <FoodTruckBottomSheet
          ref={bottomSheetRef}
          foodTruck={selectedFoodTruck}
          isVisible={!!selectedFoodTruck}
          onClose={handleCloseBottomSheet}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
