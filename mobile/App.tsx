import { View, Text, Pressable, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>TRAVELTWIN AI</Text>
      <Text style={styles.title}>India, made personal.</Text>
      <Text style={styles.copy}>
        This Expo shell is ready for the Traveller Twin mobile screens. Connect
        it to the FastAPI endpoints in backend/app/routes.
      </Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Create my Traveller Twin</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 28, backgroundColor: "#f8f7f3" },
  kicker: { color: "#e87945", fontSize: 12, fontWeight: "700", letterSpacing: 2 },
  title: { color: "#20212b", fontSize: 34, fontWeight: "700", marginTop: 12 },
  copy: { color: "#737584", fontSize: 16, lineHeight: 24, marginTop: 14 },
  button: { backgroundColor: "#3f438d", borderRadius: 12, padding: 16, marginTop: 28 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" }
});
