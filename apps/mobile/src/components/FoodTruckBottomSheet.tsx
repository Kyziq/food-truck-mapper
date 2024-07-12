import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FoodTruck, MenuItem } from "../types";
import { fetchMenuItems } from "../utils/api";

type FoodTruckBottomSheetProps = {
  foodTruck: FoodTruck;
  isVisible: boolean;
  onClose: () => void;
};

const FoodTruckBottomSheet = forwardRef<BottomSheet, FoodTruckBottomSheetProps>(
  ({ foodTruck, isVisible, onClose }, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

    useEffect(() => {
      const loadMenuItems = async () => {
        if (foodTruck) {
          setLoading(true);
          try {
            const items = await fetchMenuItems(foodTruck.id);
            setMenuItems(items);
          } catch (error) {
            console.error("Failed to fetch menu items:", error);
          } finally {
            setLoading(false);
          }
        }
      };

      loadMenuItems();
    }, [foodTruck]);

    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          onClose();
        }
      },
      [onClose]
    );

    const handleClosePress = () => {
      if (ref && "current" in ref && ref.current) {
        ref.current.close();
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={isVisible ? 1 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePress}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{foodTruck.name}</Text>
          <Text>Operator: {foodTruck.operator_name}</Text>
          <Text>Schedule: {foodTruck.schedule}</Text>
          <Text style={styles.menuTitle}>Menu:</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            menuItems.map((item, index) => (
              <Text key={index} style={styles.menuItem}>
                - {item.name} (RM{item.price})
              </Text>
            ))
          )}
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  menuItem: {
    marginBottom: 5,
  },
});

export default FoodTruckBottomSheet;
