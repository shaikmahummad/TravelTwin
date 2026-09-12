import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

type Props = { title: string; onPress: () => void; variant?: "primary" | "secondary" | "danger"; disabled?: boolean };
export function AppButton({ title, onPress, variant = "primary", disabled }: Props) {
  return <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, disabled && styles.disabled]}><Text style={[styles.text, variant !== "primary" && styles.darkText]}>{title}</Text></Pressable>;
}
const styles = StyleSheet.create({
  base: { minHeight: 48, paddingHorizontal: 18, borderRadius: 13, justifyContent: "center", alignItems: "center" },
  primary: { backgroundColor: colors.indigo }, secondary: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line }, danger: { backgroundColor: colors.danger },
  text: { color: colors.white, fontWeight: "700", fontSize: 13 }, darkText: { color: colors.indigo }, pressed: { opacity: 0.82 }, disabled: { opacity: 0.5 },
});
