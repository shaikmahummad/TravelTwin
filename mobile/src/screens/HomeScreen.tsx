import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { RecommendationCard } from "../components/RecommendationCard";
import { SectionHeader } from "../components/SectionHeader";
import { TwinSummaryCard } from "../components/TwinSummaryCard";
import { getPersonalizedHome, PersonalizedHome } from "../services/api";
import { colors } from "../theme/colors";
import { Destination, RootStackParamList } from "../navigation/AppNavigator";

const USER_ID = "demo-user";

export function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Home">) {
  const [home, setHome] = useState<PersonalizedHome | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHome = async () => {
    setLoading(true);
    setError("");
    try {
      setHome(await getPersonalizedHome(USER_ID));
    } catch {
      setHome(null);
      setError("Create your Traveller Twin to unlock your personalized home.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadHome(); }, []);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color={colors.indigo} /><Text style={styles.muted}>Tuning your home...</Text></View>;
  }

  if (!home) {
    return <View style={styles.empty}><Text style={styles.kicker}>WELCOME TO TRAVELTWIN</Text><Text style={styles.title}>India, made personal.</Text><Text style={styles.copy}>{error}</Text><AppButton title="Create my Traveller Twin" onPress={() => navigation.navigate("TravellerTwin")} /></View>;
  }

  const destination: Destination = {
    id: home.recommended_destination.name.toLowerCase(),
    name: home.recommended_destination.name,
    city: home.recommended_destination.city,
    state: home.recommended_destination.state,
    description: home.recommended_destination.description,
    best_time_to_visit: "October to March",
    crowd_level: "moderate",
    image: "",
  };

  return <ScrollView contentContainerStyle={styles.page}>
    <View style={styles.header}><View><Text style={styles.kicker}>YOUR PERSONALIZED HOME</Text><Text style={styles.greeting}>Good morning, {home.traveller_twin.name}</Text><Text style={styles.muted}>A day shaped around your travel rhythm.</Text></View><Text style={styles.avatar}>{home.traveller_twin.name.slice(0, 2).toUpperCase()}</Text></View>
    <TwinSummaryCard profile={home.traveller_twin} />
    <Text style={styles.sectionSpacing}><SectionHeader title="A place picked for you" /></Text>
    <RecommendationCard destination={home.recommended_destination.name} reason={home.reason} onPress={() => navigation.navigate("DigitalTwin", { destination })} />
    <AppCard style={styles.preview}><Text style={styles.kicker}>DIGITAL TWIN PREVIEW</Text><Text style={styles.previewTitle}>{home.digital_twin_preview.status}</Text><Text style={styles.muted}>{home.digital_twin_preview.summary}</Text></AppCard>
    <AppCard style={styles.highlight}><Text style={styles.kicker}>CULTURAL HIGHLIGHT</Text><Text style={styles.highlightTitle}>{home.cultural_highlight}</Text></AppCard>
    <AppCard><Text style={styles.kicker}>SUGGESTED NEXT ACTION</Text><Text style={styles.action}>{home.suggested_next_action}</Text><AppButton title="Explore destinations" variant="secondary" onPress={() => navigation.navigate("Destinations")} /></AppCard>
    <View style={styles.actions}><AppButton title="Edit my Traveller Twin" variant="secondary" onPress={() => navigation.navigate("TravellerTwin")} /><AppButton title="Open live guide" onPress={() => navigation.navigate("DigitalTwin", { destination })} /></View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  page: { padding: 20, paddingTop: 30, paddingBottom: 40, backgroundColor: colors.warmWhite },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  kicker: { color: colors.saffron, fontSize: 10, fontWeight: "700", letterSpacing: 1.1 },
  greeting: { fontSize: 24, fontWeight: "700", color: colors.charcoal, marginVertical: 5 },
  muted: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#E8D0B8", textAlign: "center", textAlignVertical: "center", overflow: "hidden", color: "#654437", fontWeight: "700", fontSize: 12 },
  sectionSpacing: { marginTop: 22 },
  preview: { marginTop: 14, backgroundColor: colors.indigoSoft, borderColor: colors.indigoSoft },
  previewTitle: { color: colors.charcoal, fontSize: 16, fontWeight: "700", marginVertical: 7 },
  highlight: { marginTop: 14, backgroundColor: colors.sand, borderColor: colors.sand },
  highlightTitle: { color: colors.charcoal, fontWeight: "700", fontSize: 14, lineHeight: 20, marginTop: 7 },
  action: { color: colors.charcoal, fontSize: 14, fontWeight: "700", marginVertical: 10 },
  actions: { gap: 9, marginTop: 14 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: colors.warmWhite },
  empty: { flex: 1, justifyContent: "center", padding: 28, backgroundColor: colors.warmWhite },
  title: { color: colors.charcoal, fontSize: 32, fontWeight: "700", marginVertical: 10 },
  copy: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: 20 },
});
