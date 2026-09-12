import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
export function StatusBadge({ label, tone = "safe" }: { label: string; tone?: "safe" | "warning" | "danger" | "neutral" }) {
  return <Text style={[styles.badge, styles[tone]]}>{label}</Text>;
}
const styles = StyleSheet.create({ badge: { alignSelf: "flex-start", borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5, fontSize: 10, fontWeight: "700" }, safe: { color: colors.emerald, backgroundColor: colors.emeraldSoft }, warning: { color: "#A85F31", backgroundColor: "#F9E5D8" }, danger: { color: colors.danger, backgroundColor: colors.dangerSoft }, neutral: { color: colors.indigo, backgroundColor: colors.indigoSoft } });
