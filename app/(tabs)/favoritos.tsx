import { FAVORITOS_HOOK_KEY, useFavoritos } from "@/src/hooks/useFavoritos";
import { useRefreshOnFocus } from "@/src/hooks/useRefreshOnFocus";
import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function FavoritosScreen() {
  const router = useRouter();
  useRefreshOnFocus(FAVORITOS_HOOK_KEY);
  const { data } = useFavoritos();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.description}>
        Este es el segundo tab para mostrar una navegacion basica con tabs.
      </Text>

      <Button title="SITEMAP" onPress={() => router.push("/_sitemap")} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
          >
            <Text style={{ fontSize: 18 }}>{item.nombre}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
    backgroundColor: "#eff6ff",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d4ed8",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#1e3a8a",
  },
});
