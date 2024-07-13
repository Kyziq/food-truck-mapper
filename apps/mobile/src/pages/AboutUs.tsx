import React from "react";
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";

const AboutUs: React.FC = () => {
  const devs = [
    {
      name: "MUHAMMAD KHAIRUL HAZIQ BIN MOHAMAD KHAIRI",
      matric: "2023164629",
      class: "RCDCS2515B",
      image: require("../../assets/haziq.png"),
    },
    {
      name: "MUHAMAD ADIB ASYRAAF BIN AZIS",
      matric: "2023126433",
      class: "RCDCS2515B",
      image: require("../../assets/adib.jpg"),
    },
    {
      name: "MUHAMMAD IQBAL BIN ABDUL RAHIM",
      matric: "2023382949",
      class: "RCDCS2515B",
      image: require("../../assets/iqbal.jpg"),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Devs</Text>
      {devs.map((dev, index) => (
        <View key={index} style={styles.card}>
          <Image source={dev.image} style={styles.devImage} />
          <View style={styles.devInfo}>
            <Text style={styles.devName}>{dev.name}</Text>
            <Text style={styles.devText}>{dev.matric}</Text>
            <Text style={styles.devText}>{dev.class}</Text>
          </View>
        </View>
      ))}
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL("https://github.com/Kyziq/food-truck-mapper")
        }
      >
        GitHub: @food-truck-mapper
      </Text>
      <Text style={styles.footerText}>© 2024 Haziq Khairi</Text>
      <Text style={styles.license}>
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
      </Text>
      <Text style={styles.license}>
        The above copyright notice and this permission notice shall be included
        in all copies or substantial portions of the Software.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: "90%",
    padding: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  devImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  devInfo: {
    flexDirection: "column",
    flex: 1,
  },
  devName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },
  devText: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    fontSize: 16,
    color: "blue",
    marginVertical: 20,
    textDecorationLine: "underline",
  },
  footerText: {
    fontSize: 12,
    color: "#777",
    marginVertical: 10,
    textAlign: "center",
  },
  license: {
    fontSize: 10,
    textAlign: "center",
    marginVertical: 2,
    color: "#888",
  },
});

export default AboutUs;
