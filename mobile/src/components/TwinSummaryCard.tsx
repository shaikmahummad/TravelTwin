import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "./AppCard";
import { colors } from "../theme/colors";
import { TravellerProfile } from "../services/api";

export function TwinSummaryCard({ profile }: { profile: TravellerProfile }) {
  return <AppCard><Text style={styles.kicker}>YOUR TRAVELLER TWIN</Text><Text style={styles.title}>{profile.travel_style} traveller</Text><Text style={styles.copy}>{profile.interests.join(" · ")} · {profile.budget_range} budget · {profile.walking_comfort} walking</Text><View style={styles.safe}><Text style={styles.safeText}>{profile.safety_preference}</Text></View></AppCard>;
}

const styles = StyleSheet.create({
  kicker: { color: colors.saffron, fontSize: 10, fontWeight: "700", letterSpacing: 1.1 },
  title: { color: colors.charcoal, fontSize: 18, fontWeight: "700", marginTop: 7 },
  copy: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  safe: { alignSelf: "flex-start", backgroundColor: colors.emeraldSoft, borderRadius: 12, marginTop: 12, paddingHorizontal: 10, paddingVertical: 6 },
  safeText: { color: colors.emerald, fontSize: 11, fontWeight: "700" },
});
