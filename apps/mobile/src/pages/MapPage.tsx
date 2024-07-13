import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapComponent from "../components/MapComponent";
import LocationPermission from "../components/LocationPermission";
import { fetchFoodTrucks } from "../utils/api";
import { LocationCoords, FoodTruck } from "../types";

const MapPage: React.FC = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);

  useEffect(() => {
    const loadFoodTrucks = async () => {
      try {
        const data = await fetchFoodTrucks();
        setFoodTrucks(data);
      } catch (error) {
        console.error("Failed to fetch food trucks:", error);
      }
    };

    loadFoodTrucks();
  }, []);

  const handleLocationRetrieved = (loc: LocationCoords) => setLocation(loc);
  const handleError = (error: string) => setErrorMsg(error);

  return (
    <View style={styles.container}>
      <LocationPermission
        onLocationRetrieved={handleLocationRetrieved}
        onError={handleError}
      />
      <MapComponent location={location} foodTrucks={foodTrucks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapPage;
