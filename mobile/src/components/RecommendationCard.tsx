import React from "react";
import { StyleSheet, Text } from "react-native";
import { AppCard } from "./AppCard";
import { colors } from "../theme/colors";

export function RecommendationCard({ destination, reason, onPress }: { destination: string; reason: string; onPress: () => void }) {
  return <AppCard style={styles.card}><Text style={styles.kicker}>RECOMMENDED FOR YOU</Text><Text style={styles.title}>{destination}</Text><Text style={styles.reason}>{reason}</Text><Text onPress={onPress} style={styles.action}>Open destination twin →</Text></AppCard>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  kicker: { color: "#DDE0FF", fontSize: 10, fontWeight: "700", letterSpacing: 1.1 },
  title: { color: colors.white, fontSize: 25, fontWeight: "700", marginTop: 9 },
  reason: { color: "#E4E5F6", fontSize: 12, lineHeight: 18, marginTop: 6 },
  action: { color: colors.white, fontSize: 12, fontWeight: "700", marginTop: 16 },
});
