import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FetchExamplesIndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.quickActions}>
        <Pressable
          onPress={() => router.push("/ejemplos/fetch/clasico")}
          style={[styles.card, styles.greenCard]}
        >
          <Text style={styles.cardText}>Fetch clásico con useEffect</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/ejemplos/fetch/moderno")}
          style={[styles.card, styles.blueCard]}
        >
          <Text style={styles.cardText}>Fetch moderno con use</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/ejemplos/fetch/tanstack")}
          style={[styles.card, styles.orangeCard]}
        >
          <Text style={styles.cardText}>Fetch con TanStack Query</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#eff6ff",
  },
  quickActions: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  card: {
    width: "90%",
    minHeight: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  greenCard: {
    backgroundColor: "#86efac",
  },
  blueCard: {
    backgroundColor: "#93c5fd",
  },
  orangeCard: {
    backgroundColor: "#fdba74",
  },
  cardText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
});