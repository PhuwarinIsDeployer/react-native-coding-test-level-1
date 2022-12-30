import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Button
        onPress={() => {
          navigation.push("Form");
        }}
        title="Contact Us"
        style={{ alignItems: "center", justifyContent: "center" }}
      />
      <Button
        onPress={() => {
          navigation.push("Pokemon");
        }}
        title="View Catalog"
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      />
    </View>
  );
}
