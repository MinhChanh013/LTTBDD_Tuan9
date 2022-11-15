import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Detail from "./src/components/Detail";
import Home from "./src/components/Home";
import Onboarding from "./src/components/Onboarding";
import Order from "./src/components/Order";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Order" component={Order} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
