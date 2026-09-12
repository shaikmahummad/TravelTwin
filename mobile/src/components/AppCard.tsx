import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { colors } from "../theme/colors";
export function AppCard({ children, style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props}>{children}</View>;
}
const styles = StyleSheet.create({ card: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 16, padding: 16 } });
