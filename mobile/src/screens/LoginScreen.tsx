import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../navigation/AppNavigator";
export function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Login">) { return <View style={styles.page}><Text style={styles.kicker}>WELCOME BACK</Text><Text style={styles.title}>Your twin remembers.</Text><Text style={styles.copy}>Sign in to continue your journey.</Text><TextInput placeholder="Email address" placeholderTextColor={colors.muted} style={styles.input} keyboardType="email-address" /><AppButton title="Continue" onPress={() => navigation.navigate("Home", { name: "Aanya" })} /><Text style={styles.demo}>Demo mode · no account required</Text></View>; }
const styles = StyleSheet.create({ page: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: colors.warmWhite }, kicker: { color: colors.saffron, fontWeight: "700", letterSpacing: 1.5, fontSize: 11 }, title: { fontSize: 30, fontWeight: "700", color: colors.charcoal, marginTop: 10 }, copy: { color: colors.muted, marginTop: 8, marginBottom: 25 }, input: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 12, padding: 15, marginBottom: 12 }, demo: { textAlign: "center", color: colors.muted, fontSize: 11, marginTop: 16 } });
