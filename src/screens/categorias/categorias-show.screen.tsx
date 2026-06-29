import { useProductos } from "@/src/hooks/useProductos";
import { ROUTES } from "@/src/navigation/routes";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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
  const { data } = useProductos(nombre);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: nombre }} />

      {/* Header Section */}
      <View style={styles.headerSection}>
        <View>
          <Text style={styles.categoryTitle}>{nombre}</Text>
          <Text style={styles.itemsCount}>
            {data?.products?.length || 0} ITEMS FOUND
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#a1a1aa"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search juices, craft sodas, teas..."
            placeholderTextColor="#a1a1aa"
          />
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={data?.products}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: ROUTES.PRODUCTO, params: { id: item.id } }}
            asChild
          >
            <Pressable
              style={({ pressed }) => [
                styles.productCard,
                pressed && styles.productCardPressed,
              ]}
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
                            backgroundColor: getNutriScoreColor(
                              item.nutriscore_grade,
                            ),
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
          </Link>
        )}
      />
    </View>
  );
}

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
