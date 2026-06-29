import { useInfiniteProductosByCategoria } from "@/src/hooks/useInfiniteProductosByCategoria";
import { ROUTES } from "@/src/navigation/routes";
import { theme } from "@/src/theme/global";
import { MyProduct } from "@/src/transformers/search-products.transformer";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type CategoriaParams = {
  nombre: string;
};

// Función helper para obtener el color del badge según el score
const getNutriScoreColor = (score: string) => {
  switch (score.toUpperCase()) {
    case "A":
      return "#16a34a"; // green-600
    case "B":
      return "#22c55e"; // green-500
    case "C":
      return "#eab308"; // yellow-500
    case "D":
      return "#f59e0b"; // amber-500
    case "E":
      return "#ef4444"; // red-500
    default:
      return "#16a34a";
  }
};

export function CategoriasShowScreen() {
  const { nombre } = useLocalSearchParams<CategoriaParams>();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isError } =
    useInfiniteProductosByCategoria(nombre);

  const FooterComponent = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }

    if (hasNextPage && fetchNextPage) {
      return (
        <Pressable
          onPress={() => fetchNextPage()}
          style={{
            flex: 1,
            padding: 5,
            backgroundColor: "yellow",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 26 }}>Cargar más</Text>
        </Pressable>
      );
    }

    return null;
  };

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar los productos.</Text>
      </View>
    );
  }

  // const productosCombinados = data?.pages.map((page) => page.products).flat() ?? [];
  const productosCombinados2 =
    data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: nombre }} />

      {/* Header Section */}
      <View style={styles.headerSection}>
        <View>
          <Text style={styles.categoryTitle}>{nombre}</Text>
          <Text style={styles.itemsCount}>
            {data?.pages[0]?.result_count ?? "-"} ITEMS FOUND
          </Text>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={productosCombinados2}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductoItem item={item} />}
        ListFooterComponent={<FooterComponent />}
        //onEndReached={() => fetchNextPage()}
      />
    </View>
  );
}

const ProductoItem = ({ item }: { item: MyProduct }) => {
  const router = useRouter();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.productCard,
        pressed && styles.productCardPressed,
      ]}
      onPress={() => {
        router.push({
          pathname: ROUTES.PRODUCTO,
          params: { id: item.id },
        });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          backgroundColor: "#ffffff",
          borderRadius: 12,
          padding: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              style={styles.productImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="restaurant" size={32} color="#d4d4d8" />
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.brandName} numberOfLines={1}>
            {item.brands || "UNKNOWN BRAND"}
          </Text>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            {item.nutriscore_grade && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: getNutriScoreColor(item.nutriscore_grade),
                  },
                ]}
              >
                <Text style={styles.badgeText}>
                  NUTRI-SCORE {item.nutriscore_grade.toUpperCase()}
                </Text>
              </View>
            )}
            {item.ecoscore_grade && (
              <View style={styles.badgeEco}>
                <Text style={styles.badgeEcoText}>
                  ECO-SCORE {item.ecoscore_grade.toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Chevron Icon */}
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={24} color="#d4d4d8" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // surface
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 16,
  },
  categoryTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#191c1d", // on-surface
    letterSpacing: -0.5,
  },
  itemsCount: {
    fontSize: 12,
    color: "#71717a", // zinc-500
    letterSpacing: 2,
    marginTop: 4,
  },
  searchContainer: {
    position: "relative",
    height: 56,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: 18,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 56,
    backgroundColor: "#f3f4f5", // surface-container-low
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 15,
    fontWeight: "500",
    color: "#191c1d",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff", // surface-container-lowest
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  productCardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f3f4f5",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
    gap: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191c1d",
    lineHeight: 20,
  },
  brandName: {
    fontSize: 11,
    color: "#71717a",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  badgesContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.3,
  },
  badgeEco: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
    backgroundColor: "#c6e9be", // secondary-container
  },
  badgeEcoText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#4c6a48", // on-secondary-container
    letterSpacing: 0.3,
  },
  chevronContainer: {
    marginLeft: 16,
  },
});
