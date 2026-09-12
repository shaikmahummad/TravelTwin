import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { TravellerTwinScreen } from "../screens/TravellerTwinScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { DestinationListScreen } from "../screens/DestinationListScreen";
import { DestinationDetailScreen } from "../screens/DestinationDetailScreen";
import { PlannerScreen } from "../screens/PlannerScreen";
import { DigitalTwinScreen } from "../screens/DigitalTwinScreen";
import { CultureScreen } from "../screens/CultureScreen";
import { ChatGuideScreen } from "../screens/ChatGuideScreen";
import { SafetyScreen } from "../screens/SafetyScreen";

export type Destination = { id: string; name: string; city: string; state: string; description: string; best_time_to_visit: string; crowd_level: string; image: string };
export type RootStackParamList = {
  Welcome: undefined; Login: undefined; TravellerTwin: undefined; Home: { name?: string } | undefined;
  Destinations: undefined; DestinationDetail: { destination: Destination }; Planner: { destination?: string } | undefined;
  DigitalTwin: { destination: Destination }; Culture: { destination: Destination }; ChatGuide: undefined; Safety: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export function AppNavigator() {
  return <NavigationContainer><Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#F8F7F3" } }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} /><Stack.Screen name="Login" component={LoginScreen} /><Stack.Screen name="TravellerTwin" component={TravellerTwinScreen} /><Stack.Screen name="Home" component={HomeScreen} /><Stack.Screen name="Destinations" component={DestinationListScreen} /><Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} /><Stack.Screen name="Planner" component={PlannerScreen} /><Stack.Screen name="DigitalTwin" component={DigitalTwinScreen} /><Stack.Screen name="Culture" component={CultureScreen} /><Stack.Screen name="ChatGuide" component={ChatGuideScreen} /><Stack.Screen name="Safety" component={SafetyScreen} />
  </Stack.Navigator></NavigationContainer>;
}
