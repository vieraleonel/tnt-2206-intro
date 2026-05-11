import { useCategorias } from "@/src/hooks/useCategorias";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TanStackFetchScreen() {
  const router = useRouter();
  const { data, isError, isFetching, isLoading } = useCategorias();

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>TanStack Query</Text>
        <Text style={styles.description}>
          La librería centraliza cache, estados de carga y reintentos. El
          componente solo declara la query y renderiza el resultado.
        </Text>

        <View style={styles.panel}>
          {isLoading ? <LoadingState /> : null}
          {isError ? <ErrorState /> : null}
          {!isLoading && !isError ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.listContent}
              renderItem={({ item, index }) => (
                <Pressable onPress={() => router.push("/ejemplos/fetch/temp")}>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemIndex}>{index + 1}.</Text>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                </Pressable>
              )}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

function LoadingState() {
  return (
    <View style={styles.centeredState}>
      <ActivityIndicator size="large" color="#7c2d12" />
      <Text style={styles.stateText}>TanStack Query está cargando...</Text>
    </View>
  );
}

function ErrorState() {
  return (
    <View style={styles.centeredState}>
      <Text style={styles.errorText}>La query falló al traer categorías.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff7ed",
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#7c2d12",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#9a3412",
  },
  queryLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#c2410c",
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
    color: "#9a3412",
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
    backgroundColor: "#ffedd5",
  },
  itemIndex: {
    width: 24,
    fontSize: 16,
    fontWeight: "700",
    color: "#c2410c",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#7c2d12",
  },
});
