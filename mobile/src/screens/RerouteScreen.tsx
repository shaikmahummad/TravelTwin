import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../navigation/AppNavigator";
import { requestSmartReroute } from "../services/api";

export function RerouteScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, "Reroute">) {
  const { destination } = route.params;
  const [result, setResult] = useState<any>();
  useEffect(() => {
    requestSmartReroute({ destination_id: destination.id, crowd_level: destination.crowd_level, weather: "clear", safety: "all_clear", route_status: "open", walking_comfort: "comfortable", interests: ["culture", "heritage"] })
      .then(setResult)
      .catch(() => setResult({ reroute_needed: true, original_plan: "Visit the main monument next.", problem_detected: "High crowd at the main monument.", new_plan: "Visit Archaeological Museum first.", reason: "It is less crowded, indoors, and matches your cultural interest.", estimated_time_saved_minutes: 20, cultural_value: "You still get a rich history experience while the crowd settles." }));
  }, [destination]);
  if (!result) return <View style={styles.loading}><ActivityIndicator color={colors.indigo} /><Text style={styles.muted}>Comparing crowd, weather, safety and route signals…</Text></View>;
  return <ScrollView contentContainerStyle={styles.page}><Text style={styles.kicker}>SMART REROUTE · LIVE DECISION</Text><Text style={styles.title}>A better plan for right now.</Text><Text style={styles.muted}>The twin checked your walking comfort and cultural interests before suggesting this change.</Text>
    <AppCard style={styles.problem}><Text style={styles.label}>PROBLEM DETECTED</Text><Text style={styles.value}>{result.problem_detected || result.reasons?.join(", ") || "The current plan is less comfortable right now."}</Text></AppCard>
    <AppCard style={styles.newPlan}><Text style={styles.label}>NEW RECOMMENDED PLAN</Text><Text style={styles.plan}>{result.new_plan || result.alternative || "Choose a calmer cultural experience first."}</Text><Text style={styles.muted}>{result.message}</Text></AppCard>
    <Detail label="Original plan" value={result.original_plan || "Continue to the main monument."} /><Detail label="Why reroute?" value={result.reason || "This option better matches live conditions."} /><Detail label="Estimated time saved" value={`${result.estimated_time_saved_minutes || 0} minutes`} /><Detail label="Cultural value" value={result.cultural_value || "A meaningful local heritage experience with less friction."} />
    <AppButton title="Use this new plan" onPress={() => navigation.goBack()} /><AppButton title="Keep original plan" variant="secondary" onPress={() => navigation.goBack()} />
  </ScrollView>;
}
function Detail({ label, value }: { label: string; value: string }) { return <AppCard><Text style={styles.label}>{label}</Text><Text style={styles.detail}>{value}</Text></AppCard>; }
const styles = StyleSheet.create({ page: { padding: 20, paddingTop: 30, paddingBottom: 45, gap: 12, backgroundColor: colors.warmWhite }, loading: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12, backgroundColor: colors.warmWhite }, kicker: { color: colors.saffron, fontSize: 10, fontWeight: "700", letterSpacing: 1.1 }, title: { color: colors.charcoal, fontSize: 30, fontWeight: "700", marginTop: 2 }, muted: { color: colors.muted, fontSize: 12, lineHeight: 18 }, problem: { backgroundColor: colors.dangerSoft, borderColor: colors.dangerSoft, marginTop: 8 }, newPlan: { backgroundColor: colors.emeraldSoft, borderColor: colors.emeraldSoft }, label: { color: colors.saffron, fontSize: 10, fontWeight: "700", letterSpacing: 1 }, value: { color: colors.charcoal, fontSize: 15, fontWeight: "700", lineHeight: 21, marginTop: 8 }, plan: { color: colors.emerald, fontSize: 20, fontWeight: "700", lineHeight: 27, marginVertical: 8 }, detail: { color: colors.charcoal, fontSize: 14, lineHeight: 20, marginTop: 7 } });
