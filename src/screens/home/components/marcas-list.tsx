import { marcas } from "@/src/data/marcas";
import { buildRoute, ROUTES } from "@/src/navigation/routes";
import { theme } from "@/src/theme/global";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function MarcasList() {
  const router = useRouter();

  return (
    <View style={styles.brandsGrid}>
      {marcas.map((marca) => (
        <Pressable
          key={marca.id}
          onPress={() =>
            router.push(buildRoute(ROUTES.MARCA, { nombre: marca.id }))
          }
          style={({ pressed }) => [
            styles.brandCard,
            pressed && styles.brandCardPressed,
          ]}
        >
          <View style={styles.brandCircle}>
            <Text style={styles.brandCircleText} />
          </View>
          <Text style={styles.brandName}>{marca.nombre}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  brandsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  brandCard: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: "#edeeef",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0, 100, 10, 0.1)",
  },
  brandCardPressed: {
    backgroundColor: "#edeeef",
    opacity: 0.9,
  },
  brandCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCircleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
});
