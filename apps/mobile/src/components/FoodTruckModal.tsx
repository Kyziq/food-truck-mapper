import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { FoodTruck, MenuItem } from "../types";
import { fetchMenuItems } from "../utils/api";

type FoodTruckModalProps = {
  visible: boolean;
  onClose: () => void;
  foodTruck: FoodTruck | null;
};

const FoodTruckModal = ({
  visible,
  onClose,
  foodTruck,
}: FoodTruckModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const loadMenuItems = async () => {
      if (foodTruck) {
        setLoading(true);
        const items = await fetchMenuItems(foodTruck.id);
        setMenuItems(items);
        setLoading(false);
      }
    };

    loadMenuItems();
  }, [foodTruck]);

  if (!visible || !foodTruck) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{foodTruck.name}</Text>
          <Text>Operator: {foodTruck.operator_name}</Text>
          <Text>Schedule: {foodTruck.schedule}</Text>
          <Text>Menu:</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            menuItems.map((item, index) => (
              <Text key={index}>
                - {item.name} (RM{item.price})
              </Text>
            ))
          )}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: Dimensions.get("window").width * 0.8,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default FoodTruckModal;
