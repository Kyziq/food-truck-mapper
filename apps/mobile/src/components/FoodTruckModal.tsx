import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { FoodTruck } from "../types";

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
          <Text>- Item 1</Text>
          <Text>- Item 2</Text>
          <Text>- Item 3</Text>
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
