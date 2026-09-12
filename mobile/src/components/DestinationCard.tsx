import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Destination } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { StatusBadge } from "./StatusBadge";
export function DestinationCard({ destination, onPress }: { destination: Destination; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.card}><Image source={{ uri: destination.image }} style={styles.image} /><View style={styles.content}><View style={styles.row}><Text style={styles.title}>{destination.name}</Text><StatusBadge label={destination.crowd_level} tone={destination.crowd_level === "Busy" ? "warning" : "safe"} /></View><Text style={styles.location}>{destination.city}, {destination.state}</Text><Text style={styles.description}>{destination.description}</Text><Text style={styles.time}>Best time · {destination.best_time_to_visit}</Text></View></Pressable>;
}
const styles = StyleSheet.create({ card: { backgroundColor: colors.white, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: colors.line, marginBottom: 14 }, image: { width: "100%", height: 130 }, content: { padding: 14 }, row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, title: { fontSize: 18, fontWeight: "700", color: colors.charcoal }, location: { fontSize: 11, color: colors.muted, marginTop: 4 }, description: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 8 }, time: { color: colors.saffron, fontWeight: "600", fontSize: 10, marginTop: 10 } });
