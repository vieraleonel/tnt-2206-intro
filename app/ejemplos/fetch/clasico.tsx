import { getCategoriesV3 } from "@/src/services/categories";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ClasicoFetchScreen() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategorias = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await getCategoriesV3("bebidas");
      setCategories(data);
    } catch (error) {
      console.error("No se pudieron cargar las categorías.", error);
      setIsError(true);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Patrón clásico</Text>
        <View style={styles.panel}>
          {isError && (
            <Text style={styles.errorText}>Error cargando categorías</Text>
          )}
          {isLoading && <LoadingState />}
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemIndex}>{index + 1}.</Text>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

function LoadingState() {
  return (
    <View style={styles.centeredState}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.stateText}>Cargando categorías...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#334155",
  },
  queryLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1d4ed8",
  },
  panel: {
    flex: 1,
  },
  centeredState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  stateText: {
    fontSize: 16,
    color: "#334155",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#b91c1c",
    textAlign: "center",
  },
  listContent: {
    gap: 10,
  },
  itemRow: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#eff6ff",
  },
  itemIndex: {
    width: 24,
    fontSize: 16,
    fontWeight: "700",
    color: "#1d4ed8",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },
});
