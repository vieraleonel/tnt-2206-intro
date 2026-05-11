import { Suspense, use } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getCategoriesV3 } from "@/src/services/categories";

let categoriesPromise: Promise<string[]>;

export default function ModernoFetchScreen() {
  categoriesPromise = getCategoriesV3("Bebidas");
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Patrón moderno</Text>
        <Text style={styles.description}>
          El hook use consume una promesa directamente y Suspense resuelve el
          estado de carga sin mantener loading manual en el componente.
        </Text>

        <View style={styles.panel}>
          <Suspense fallback={<LoadingState />}>
            <ResolvedCategories />
          </Suspense>
        </View>
      </View>
    </View>
  );
}

function ResolvedCategories() {
  const categories = use(categoriesPromise);

  return (
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
  );
}

function LoadingState() {
  return (
    <View style={styles.centeredState}>
      <ActivityIndicator size="large" color="#0f766e" />
      <Text style={styles.stateText}>Resolviendo promesa con Suspense...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0fdfa",
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#134e4a",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#134e4a",
  },
  queryLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f766e",
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
    color: "#134e4a",
  },
  listContent: {
    gap: 10,
  },
  itemRow: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#ccfbf1",
  },
  itemIndex: {
    width: 24,
    fontSize: 16,
    fontWeight: "700",
    color: "#0f766e",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#134e4a",
  },
});
