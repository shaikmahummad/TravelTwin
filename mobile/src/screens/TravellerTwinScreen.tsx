import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppButton } from "../components/AppButton";
import { PreferenceChip } from "../components/PreferenceChip";
import { SectionHeader } from "../components/SectionHeader";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { RootStackParamList } from "../navigation/AppNavigator";
import { saveTravellerProfile } from "../services/api";

const travelStyles = ["Relaxed", "Adventure", "Cultural", "Family", "Spiritual", "Budget"];
const interestsList = ["Forts", "Temples", "Food", "Crafts", "Nature", "Festivals", "Museums"];
const languages = ["English", "Hindi", "Kannada", "Tamil", "Telugu", "Malayalam"];
const safetyOptions = ["Avoid crowded places", "Prefer family-safe routes", "Prefer short routes", "No special preference"];

export function TravellerTwinScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "TravellerTwin">) {
  const [name, setName] = useState("");
  const [travelStyle, setTravelStyle] = useState("Cultural");
  const [interests, setInterests] = useState<string[]>(["Food"]);
  const [budget, setBudget] = useState("Medium");
  const [walking, setWalking] = useState("Medium");
  const [language, setLanguage] = useState("English");
  const [safety, setSafety] = useState("No special preference");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleInterest = (value: string) => setInterests(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value]);
  const submit = async () => {
    if (!name.trim() || interests.length === 0) {
      setError("Add your name and at least one interest to continue.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await saveTravellerProfile({ user_id: "demo-user", name: name.trim(), travel_style: travelStyle, interests, budget_range: budget, walking_comfort: walking, preferred_language: language, safety_preference: safety });
      navigation.navigate("Home");
    } catch {
      setError("We could not save your Traveller Twin. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return <ScrollView contentContainerStyle={styles.page}>
    <Text style={styles.kicker}>YOUR TRAVELLER TWIN</Text><Text style={styles.title}>Travel like you.</Text><Text style={styles.copy}>A few choices help your twin find moments made for your pace.</Text>
    <TextInput value={name} onChangeText={setName} placeholder="What should we call you?" placeholderTextColor={colors.muted} style={styles.input} />
    <PreferenceSection title="Travel style" values={travelStyles} selected={travelStyle} onSelect={setTravelStyle} />
    <PreferenceSection title="What sparks your curiosity?" values={interestsList} selected={interests} onSelect={toggleInterest} multi />
    <PreferenceSection title="Budget range" values={["Low", "Medium", "Premium"]} selected={budget} onSelect={setBudget} />
    <PreferenceSection title="Walking comfort" values={["Low", "Medium", "High"]} selected={walking} onSelect={setWalking} />
    <PreferenceSection title="Preferred language" values={languages} selected={language} onSelect={setLanguage} />
    <PreferenceSection title="Safety preference" values={safetyOptions} selected={safety} onSelect={setSafety} />
    {error ? <Text style={styles.error}>{error}</Text> : null}
    <AppButton title={saving ? "Saving your twin..." : "Save my Traveller Twin"} onPress={submit} disabled={saving} />
    {saving ? <ActivityIndicator color={colors.indigo} style={styles.loader} /> : null}
  </ScrollView>;
}

function PreferenceSection({ title, values, selected, onSelect, multi = false }: { title: string; values: string[]; selected: string | string[]; onSelect: (value: string) => void; multi?: boolean }) {
  return <View style={styles.section}><SectionHeader title={title} /><View style={styles.chips}>{values.map(value => <PreferenceChip key={value} label={value} selected={multi ? (selected as string[]).includes(value) : selected === value} onPress={() => onSelect(value)} />)}</View></View>;
}

const styles = StyleSheet.create({
  page: { padding: spacing.page, paddingBottom: 40, backgroundColor: colors.warmWhite },
  kicker: { color: colors.saffron, fontWeight: "700", letterSpacing: 1.4, fontSize: 10, marginTop: 20 },
  title: { color: colors.charcoal, fontSize: 32, fontWeight: "700", marginTop: 8 },
  copy: { color: colors.muted, lineHeight: 20, marginTop: 6, marginBottom: 18 },
  input: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 13, marginBottom: 4 },
  section: { borderTopWidth: 1, borderTopColor: colors.line, paddingVertical: 17 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  error: { color: colors.danger, fontSize: 12, marginBottom: 12 },
  loader: { marginTop: 12 },
});
