import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
export function TwinMetricCard({ label, value, icon }: { label: string; value: string; icon: string }) { return <View style={styles.card}><Text style={styles.icon}>{icon}</Text><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value}</Text></View>; }
const styles = StyleSheet.create({ card: { flex: 1, minHeight: 91, backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.line, padding: 12 }, icon: { fontSize: 16 }, label: { color: colors.muted, fontSize: 10, marginTop: 8 }, value: { color: colors.charcoal, fontSize: 13, fontWeight: "700", marginTop: 3 } });
