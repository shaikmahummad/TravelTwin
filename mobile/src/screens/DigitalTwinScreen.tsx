import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { StatusBadge } from "../components/StatusBadge";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../navigation/AppNavigator";
import { fetchDestinationTwin, TwinData } from "../services/api";

export function DigitalTwinScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, "DigitalTwin">) {
  const { destination } = route.params;
  const [twin, setTwin] = useState<TwinData>();
  useEffect(() => { fetchDestinationTwin(destination.id).then(setTwin); }, [destination.id]);
  if (!twin) return <View style={styles.loading}><ActivityIndicator color={colors.indigo} /><Text style={styles.muted}>Reading live signals around {destination.name}…</Text></View>;
  const status = twin.status;
  const recommendation = status.best_suggestion || "Your twin will suggest the best next moment as conditions change.";
  return <ScrollView contentContainerStyle={styles.page}>
    <Text style={styles.kicker}>LIVE DIGITAL TWIN · {destination.name.toUpperCase()}</Text>
    <Text style={styles.title}>Your destination, right now.</Text>
    <Text style={styles.muted}>TravelTwin combines live conditions with your interests to guide the next decision.</Text>
    <AppCard style={styles.liveCard}><View style={styles.liveHeader}><View style={styles.liveDot} /><Text style={styles.liveLabel}>LIVE SIGNALS · JUST UPDATED</Text></View><Text style={styles.liveTitle}>{destination.name} is responding to the moment.</Text><Text style={styles.muted}>The twin is watching the place so you do not have to guess.</Text></AppCard>
    <View style={styles.statusGrid}>
      <Signal label="Crowd" value={status.crowd_level || "Moderate"} />
      <Signal label="Weather" value={status.weather_status || "Clear"} />
      <Signal label="Safety" value={status.safety_status || "All clear"} />
      <Signal label="Route" value={status.route_status || "Open"} />
    </View>
    <AppCard style={styles.recommendation}><Text style={styles.cardKicker}>TWIN RECOMMENDATION</Text><Text style={styles.recommendationText}>{recommendation}</Text><Text style={styles.muted}>This is a live recommendation, not a fixed itinerary.</Text></AppCard>
    <AppCard><Text style={styles.cardKicker}>YOUR NEXT BEST MOMENT</Text><Text style={styles.place}>{status.recommended_next_place || "Queen's Bath"}</Text><Text style={styles.muted}>Estimated visit: {status.estimated_visit_minutes || 90} minutes</Text><Text style={styles.event}>Nearby cultural event · {status.nearby_cultural_event || "Local heritage story walk at 4:30 PM"}</Text></AppCard>
    <Text style={styles.sectionTitle}>Active alerts</Text>
    {twin.alerts.length ? twin.alerts.map((alert, index) => <AppCard key={`${alert.title}-${index}`} style={styles.alert}><Text style={styles.alertTitle}>{alert.title || "Live destination alert"}</Text><Text style={styles.muted}>{alert.message || "Check the route before continuing."}</Text></AppCard>) : <AppCard><Text style={styles.muted}>No active alerts. Your current route is clear.</Text></AppCard>}
    <Text style={styles.sectionTitle}>Change the plan with your twin</Text>
    <AppButton title="Reroute me" onPress={() => navigation.navigate("Reroute", { destination })} />
    <AppButton title="View culture layer" variant="secondary" onPress={() => navigation.navigate("Culture", { destination })} />
    <AppButton title="Ask guide" variant="secondary" onPress={() => navigation.navigate("ChatGuide")} />
    <AppButton title="Safety help" variant="secondary" onPress={() => navigation.navigate("Safety")} />
  </ScrollView>;
}

function Signal({ label, value }: { label: string; value: string }) {
  return <View style={styles.signal}><Text style={styles.signalLabel}>{label}</Text><StatusBadge label={value.replace(/_/g, " ")} tone={label === "Crowd" ? "warning" : "safe"} /></View>;
}

const styles = StyleSheet.create({
  page: { padding: 20, paddingTop: 30, paddingBottom: 45, gap: 12, backgroundColor: colors.warmWhite },
  loading: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12, backgroundColor: colors.warmWhite }, kicker: { color: colors.saffron, fontSize: 10, fontWeight: "700", letterSpacing: 1.1 }, title: { color: colors.charcoal, fontSize: 30, fontWeight: "700", marginTop: 2 }, muted: { color: colors.muted, fontSize: 12, lineHeight: 18 }, liveCard: { backgroundColor: colors.indigo, borderColor: colors.indigo, marginTop: 8 }, liveHeader: { flexDirection: "row", alignItems: "center", gap: 7 }, liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#86D0AE" }, liveLabel: { color: "#C9D1FF", fontSize: 9, fontWeight: "700", letterSpacing: 1 }, liveTitle: { color: colors.white, fontSize: 19, fontWeight: "700", lineHeight: 25, marginVertical: 13 }, statusGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 }, signal: { width: "48%", backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 13, padding: 12, gap: 7 }, signalLabel: { color: colors.muted, fontSize: 11 }, recommendation: { backgroundColor: colors.sand, borderColor: colors.sand }, cardKicker: { color: colors.saffron, fontSize: 10, fontWeight: "700", letterSpacing: 1 }, recommendationText: { color: colors.charcoal, fontWeight: "700", fontSize: 16, lineHeight: 23, marginVertical: 9 }, place: { color: colors.charcoal, fontSize: 22, fontWeight: "700", marginVertical: 7 }, event: { color: colors.emerald, fontSize: 12, fontWeight: "700", marginTop: 12 }, sectionTitle: { color: colors.charcoal, fontSize: 16, fontWeight: "700", marginTop: 7 }, alert: { backgroundColor: colors.dangerSoft, borderColor: colors.dangerSoft }, alertTitle: { color: colors.danger, fontWeight: "700", marginBottom: 5 },
});
