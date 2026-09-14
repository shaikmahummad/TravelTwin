import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

export function PreferenceChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.chip, selected && styles.selected]}><Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  chip: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 10 },
  selected: { backgroundColor: colors.indigoSoft, borderColor: colors.indigo },
  label: { color: colors.muted, fontSize: 12 },
  selectedLabel: { color: colors.indigo, fontWeight: "700" },
});
