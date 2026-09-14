import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

export function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({ title: { color: colors.charcoal, fontSize: 15, fontWeight: "700", marginBottom: 11 } });
