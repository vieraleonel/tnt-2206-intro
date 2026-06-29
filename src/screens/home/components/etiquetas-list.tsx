import { etiquetas } from "@/src/data/etiquetas";
import { buildRoute, ROUTES } from "@/src/navigation/routes";
import { theme } from "@/src/theme/global";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function EtiquetasList() {
  const router = useRouter();

  const handlePressEtiqueta = (etiquetaId: string) => () => {
    router.push(buildRoute(ROUTES.ETIQUETA, { nombre: etiquetaId }));
  };

  return (
    <View style={styles.tagsContainer}>
      {etiquetas.map((etiqueta) => (
        <Pressable
          key={etiqueta.id}
          onPress={handlePressEtiqueta(etiqueta.id)}
          style={({ pressed }) => [styles.tag, pressed && styles.tagPressed]}
        >
          <Text style={styles.tagText}>{etiqueta.nombre}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // Tags
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },
  tag: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  tagPressed: {
    opacity: 0.8,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.primary,
  },
});
