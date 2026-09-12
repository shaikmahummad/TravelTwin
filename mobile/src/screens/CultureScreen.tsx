import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppCard } from "../components/AppCard";
import { colors } from "../theme/colors";
import { RootStackParamList } from "../navigation/AppNavigator";
import { fetchCulture, CultureData } from "../services/api";

export function CultureScreen({ route }: NativeStackScreenProps<RootStackParamList, "Culture">) {
  const { destination } = route.params; const [culture, setCulture] = useState<CultureData>();
  useEffect(() => { fetchCulture(destination.id).then(setCulture); }, [destination.id]);
  if (!culture) return <View style={styles.loading}><ActivityIndicator color={colors.indigo} /><Text style={styles.muted}>Opening the story behind {destination.name}…</Text></View>;
  const story = culture.stories[0] || {};
  return <ScrollView contentContainerStyle={styles.page}><Text style={styles.kicker}>CULTURE LAYER · {destination.name.toUpperCase()}</Text><Text style={styles.title}>Meet the place beyond the view.</Text><Text style={styles.muted}>Simple context that helps you travel with curiosity and respect.</Text>
    <CultureCard title="Explain like I’m new here" text={String(story.historical_importance || "This is a living heritage place. Its buildings, people and traditions are connected.")} highlight />
    <CultureCard title="Local story" text={String(story.local_story || "Ask a local storyteller what visitors usually miss.")} />
    <CultureCard title="Tradition connected to this place" text={String(story.traditions || "Observe local rituals quietly and support the community that keeps them alive.")} />
    <CultureCard title="Festival connection" text={String(story.festival_connection || "Seasonal festivals bring music, food and community stories to the heritage landscape.")} />
    <CultureCard title="Local food & craft nearby" text={String(story.food_and_craft_notes || "Try a regional meal and look for a family-run craft workshop.")} />
    <View style={styles.columns}><ListCard title="DO" items={story.dos} tone="good" /><ListCard title="DON’T" items={story.donts} tone="caution" /></View>
  </ScrollView>;
}
function CultureCard({ title, text, highlight }: { title: string; text: string; highlight?: boolean }) { return <AppCard style={highlight ? styles.highlight : undefined}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.body}>{text}</Text></AppCard>; }
function ListCard({ title, items, tone }: { title: string; items?: string | string[]; tone: "good" | "caution" }) { const values = Array.isArray(items) ? items : items ? [items] : ["Be respectful of local people and places."]; return <AppCard style={styles.listCard}><Text style={[styles.cardTitle, tone === "good" ? styles.good : styles.caution]}>{title}</Text>{values.map((item, index) => <Text key={`${item}-${index}`} style={styles.listItem}>• {item}</Text>)}</AppCard>; }
const styles = StyleSheet.create({ page: { padding: 20, paddingTop: 30, paddingBottom: 45, gap: 12, backgroundColor: colors.warmWhite }, loading: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12, backgroundColor: colors.warmWhite }, kicker: { color: colors.saffron, fontSize: 10, fontWeight: "700", letterSpacing: 1 }, title: { color: colors.charcoal, fontSize: 29, fontWeight: "700", lineHeight: 36, marginTop: 2 }, muted: { color: colors.muted, fontSize: 12, lineHeight: 18 }, highlight: { backgroundColor: colors.indigoSoft, borderColor: colors.indigoSoft }, cardTitle: { color: colors.charcoal, fontWeight: "700", fontSize: 15, marginBottom: 8 }, body: { color: colors.muted, fontSize: 13, lineHeight: 21 }, columns: { flexDirection: "row", gap: 9 }, listCard: { flex: 1, padding: 13 }, good: { color: colors.emerald }, caution: { color: colors.danger }, listItem: { color: colors.muted, fontSize: 12, lineHeight: 19, marginBottom: 6 } });
