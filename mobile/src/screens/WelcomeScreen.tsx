import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../navigation/AppNavigator";
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;
export function WelcomeScreen({ navigation }: Props) { return <View style={styles.container}><View style={styles.orb}><Text style={styles.spark}>✦</Text></View><Text style={styles.kicker}>TRAVELTWIN AI</Text><Text style={styles.title}>India, made{"\n"}personal.</Text><Text style={styles.copy}>A smart travel companion that learns your rhythm and adapts to the real world around you.</Text><AppButton title="Create my Traveller Twin" onPress={() => navigation.navigate("TravellerTwin")} /><AppButton title="I already have an account" variant="secondary" onPress={() => navigation.navigate("Login")} /></View>; }
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", padding: 28, backgroundColor: colors.warmWhite }, orb: { width: 72, height: 72, borderRadius: 24, backgroundColor: colors.indigo, justifyContent: "center", alignItems: "center", marginBottom: 30 }, spark: { color: colors.white, fontSize: 32 }, kicker: { color: colors.saffron, fontSize: 11, letterSpacing: 2, fontWeight: "700" }, title: { color: colors.charcoal, fontSize: 39, lineHeight: 43, fontWeight: "700", marginTop: 12 }, copy: { color: colors.muted, fontSize: 16, lineHeight: 24, marginVertical: 18 } });
