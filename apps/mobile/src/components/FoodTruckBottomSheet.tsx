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
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FoodTruck, MenuItem } from "@types";
import { fetchMenuItems } from "@utils/api";

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
        if (foodTruck?.foodTruckId !== undefined) {
          setLoading(true);
          try {
            const items = await fetchMenuItems(foodTruck.foodTruckId);
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

    const renderItem = ({ item }: { item: MenuItem }) => (
      <View style={styles.menuRow}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>
          RM{parseFloat(item.price).toFixed(2)}
        </Text>
      </View>
    );

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
          <Text style={styles.operator}>
            Operator: {foodTruck.operatorName}
          </Text>
          <Text style={styles.schedule}>Schedule: {foodTruck.schedule}</Text>
          <Text style={styles.menuTitle}>Menu:</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : menuItems.length === 0 ? (
            <Text style={styles.noMenuText}>
              No menu available for this truck.
            </Text>
          ) : (
            <BottomSheetFlatList
              data={menuItems}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: "white",
    flex: 1,
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    paddingRight: 20, // Ensure there's space for the close button
  },
  operator: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  schedule: {
    fontSize: 12,
    color: "#555",
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  noMenuText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "gray",
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemName: {
    fontSize: 14,
  },
  menuItemPrice: {
    fontSize: 14,
  },
});

export default FoodTruckBottomSheet;
