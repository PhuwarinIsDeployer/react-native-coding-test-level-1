import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/form-submitssion/HomeScreen";
import FormScreen from "./src/screens/form-submitssion/FormScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: "Form" }}
        />
        <Stack.Screen
          name="Pokemon"
          component={PokemonHomeScreen}
          options={{ title: "Pokemon" }}
        />
        <Stack.Screen
          name="ViewPokemon"
          component={PokemonViewScreen}
          options={{ title: "ViewPokemon" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
