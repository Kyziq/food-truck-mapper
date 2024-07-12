import { useEffect } from "react";
import * as Location from "expo-location";
import { LocationCoords } from "../types";

type LocationPermissionProps = {
  onLocationRetrieved: (location: LocationCoords) => void;
  onError: (errorMsg: string) => void;
};

const LocationPermission = ({
  onLocationRetrieved,
  onError,
}: LocationPermissionProps) => {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        onError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      onLocationRetrieved({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return null;
};

export default LocationPermission;
