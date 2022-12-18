import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Ads from "./src/Ads";
import "expo-dev-client";
import { createStackNavigator } from "@react-navigation/stack";
import FBAds from "./src/FBAds";
const Stack = createStackNavigator();
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainHome"
          component={MainHome}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="AdmobAds"
          component={Ads}
          options={{ title: "Admob Ads" }}
        />
        <Stack.Screen
          name="FBAds"
          component={FBAds}
          options={{ title: "FB Ads" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function MainHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Admob" onPress={() => navigation.navigate("AdmobAds")} />
      <Button title="FB Ads" onPress={() => navigation.navigate("FBAds")} />
    </View>
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
