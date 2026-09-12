import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DestinationCard } from "../components/DestinationCard";
import { colors } from "../theme/colors";
import { fetchDestinations } from "../services/api";
import { Destination, RootStackParamList } from "../navigation/AppNavigator";
export function DestinationListScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Destinations">) { const [items, setItems] = useState<Destination[]>([]); useEffect(() => { fetchDestinations().then(setItems); }, []); return <ScrollView contentContainerStyle={styles.page}><Text style={styles.kicker}>DISCOVER AROUND YOU</Text><Text style={styles.title}>More to feel.</Text><Text style={styles.copy}>Places and experiences matched to your Traveller Twin.</Text>{items.length === 0 ? <ActivityIndicator color={colors.indigo} /> : items.map(item => <DestinationCard key={item.id} destination={item} onPress={() => navigation.navigate("DestinationDetail", { destination: item })} />)}</ScrollView>; }
const styles = StyleSheet.create({ page: { padding: 20, paddingTop: 30, backgroundColor: colors.warmWhite }, kicker: { color: colors.saffron, fontSize: 10, fontWeight: "700", letterSpacing: 1.2 }, title: { color: colors.charcoal, fontSize: 31, fontWeight: "700", marginTop: 8 }, copy: { color: colors.muted, fontSize: 13, marginTop: 5, marginBottom: 22 } });
