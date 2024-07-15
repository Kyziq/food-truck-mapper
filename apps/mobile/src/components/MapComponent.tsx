import React, { useEffect, useState, useCallback, useRef } from "react";
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
};

const MapComponent = ({ location, foodTrucks }: MapComponentProps) => {
  const [region, setRegion] = useState<Region>({
    latitude: 3.139,
    longitude: 101.6869,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }); // Region for Kuala Lumpur
  const [selectedFoodTruck, setSelectedFoodTruck] = useState<FoodTruck | null>(
    null
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useEffect(() => {
    if (location) {
      setRegion({
        ...region,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleMarkerPress = useCallback((foodTruck: FoodTruck) => {
    setSelectedFoodTruck(foodTruck);
    setIsBottomSheetVisible(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
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
            key={truck.id}
            {...truck}
            onPress={() => handleMarkerPress(truck)}
          />
        ))}
      </MapView>
      {selectedFoodTruck && (
        <FoodTruckBottomSheet
          ref={bottomSheetRef}
          foodTruck={selectedFoodTruck}
          isVisible={isBottomSheetVisible}
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
