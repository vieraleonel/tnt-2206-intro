import { FAVORITOS_HOOK_KEY, useFavoritos } from "@/src/hooks/useFavoritos";
import { useProducto } from "@/src/hooks/useProducto";
import {
  eliminarFavorito,
  guardarFavorito,
} from "@/src/services/favorites.service";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function getNutriScoreColor(grade?: string): string {
  switch (grade?.toLowerCase()) {
    case "a":
    case "a-plus":
      return "#2e7d32";
    case "b":
      return "#6fa832";
    case "c":
      return "#ffb300";
    case "d":
      return "#e65100";
    case "e":
      return "#c62828";
    default:
      return "#9e9e9e";
  }
}

function getNovaGroupColor(group?: number): string {
  switch (group) {
    case 1:
      return "#2e7d32";
    case 2:
      return "#7bc142";
    case 3:
      return "#f4a53e";
    case 4:
      return "#c62828";
    default:
      return "#9e9e9e";
  }
}

export function ProductosShowScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: favoritos } = useFavoritos();
  const { data: product, isLoading, isError } = useProducto(String(id));

  const isFavorito = favoritos?.some((favorito) => favorito.id === id) ?? false;

  async function toggleFavorito() {
    try {
      if (isFavorito) {
        await eliminarFavorito(id);
      } else {
        await guardarFavorito({
          id: String(id),
          nombre: product?.product_name ?? `Producto ${id}`,
        });
      }
      queryClient.invalidateQueries({ queryKey: FAVORITOS_HOOK_KEY });
    } catch (error) {
      console.error("Error al guardar/eliminar favorito", error);
      alert("Hubo un error. Por favor, intenta nuevamente.");
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00640a" />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el producto.</Text>
      </View>
    );
  }

  const n = product.nutriments;

  return (
    <>
      <Stack.Screen
        options={{ headerTitle: product.brands?.split(",")[0] ?? "Producto" }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={{ uri: product.image_front_url || product.image_url }}
            style={styles.heroImage}
            resizeMode="contain"
          />
          <Pressable style={styles.favoriteButton} onPress={toggleFavorito}>
            <Ionicons
              name={isFavorito ? "heart" : "heart-outline"}
              size={22}
              color="white"
            />
          </Pressable>
        </View>

        {/* Content card */}
        <View style={styles.card}>
          {product.brands ? (
            <Text style={styles.brand}>
              {product.brands.split(",")[0].toUpperCase()}
            </Text>
          ) : null}
          <Text style={styles.productName}>{product.product_name}</Text>

          {/* Scores */}
          <View style={styles.scoresRow}>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreLabel}>NUTRI-SCORE</Text>
              <View
                style={[
                  styles.scoreValue,
                  {
                    backgroundColor: getNutriScoreColor(
                      product.nutriscore_grade,
                    ),
                  },
                ]}
              >
                <Text style={styles.scoreValueText}>
                  {product.nutriscore_grade?.toUpperCase() ?? "?"}
                </Text>
              </View>
            </View>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreLabel}>NOVA GROUP</Text>
              <View
                style={[
                  styles.scoreValue,
                  { backgroundColor: getNovaGroupColor(product.nova_group) },
                ]}
              >
                <Text style={styles.scoreValueText}>
                  {product.nova_group ?? "?"}
                </Text>
              </View>
            </View>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreLabel}>ECO-SCORE</Text>
              <View
                style={[
                  styles.scoreValue,
                  {
                    backgroundColor: getNutriScoreColor(product.ecoscore_grade),
                  },
                ]}
              >
                <Text style={styles.scoreValueText}>
                  {product.ecoscore_grade?.toUpperCase() ?? "?"}
                </Text>
              </View>
            </View>
          </View>

          {/* Macros strip */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.macrosScroll}
            contentContainerStyle={styles.macrosContent}
          >
            <MacroChip
              label="ENERGY"
              value={`${n?.["energy-kj_100g"] ?? "-"} kJ`}
            />
            <MacroChip label="FAT" value={`${n?.fat_100g ?? "-"}g`} />
            <MacroChip label="PROTEIN" value={`${n?.proteins_100g ?? "-"}g`} />
            <MacroChip
              label="CARBS"
              value={`${n?.carbohydrates_100g ?? "-"}g`}
            />
            {n?.fiber_100g != null && (
              <MacroChip label="FIBRE" value={`${n.fiber_100g}g`} />
            )}
            <MacroChip label="SALT" value={`${n?.salt_100g ?? "-"}g`} />
          </ScrollView>

          {/* Ingredients */}
          {product.ingredients_text ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{"🌿 Ingredients"}</Text>
              <Text style={styles.ingredientsText}>
                {product.ingredients_text}
              </Text>
              {product.allergens ? (
                <View style={styles.allergenBox}>
                  <Text style={styles.allergenTitle}>
                    {"⚠  ALLERGEN INFORMATION"}
                  </Text>
                  <Text style={styles.allergenText}>{product.allergens}</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {/* Nutritional Values */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Nutritional Values (per 100g)
            </Text>
            <NutrientRow
              label="Energy"
              value={`${n?.["energy-kcal_100g"] ?? "-"} kcal / ${n?.["energy-kj_100g"] ?? "-"} kJ`}
              bold
            />
            <NutrientRow label="Fat" value={`${n?.fat_100g ?? "-"}g`} bold />
            <NutrientRow
              label="— of which saturates"
              value={`${n?.["saturated-fat_100g"] ?? "-"}g`}
              indent
            />
            <NutrientRow
              label="Carbohydrate"
              value={`${n?.carbohydrates_100g ?? "-"}g`}
              bold
            />
            <NutrientRow
              label="— of which sugars"
              value={`${n?.sugars_100g ?? "-"}g`}
              indent
            />
            {n?.fiber_100g != null && (
              <NutrientRow label="Fibre" value={`${n.fiber_100g}g`} bold />
            )}
            <NutrientRow
              label="Protein"
              value={`${n?.proteins_100g ?? "-"}g`}
              bold
            />
            <NutrientRow label="Salt" value={`${n?.salt_100g ?? "-"}g`} bold />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function MacroChip({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.macroChip}>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroValue}>{value}</Text>
    </View>
  );
}

function NutrientRow({
  label,
  value,
  bold = false,
  indent = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  indent?: boolean;
}) {
  return (
    <View style={[styles.nutrientRow, bold && styles.nutrientRowBold]}>
      <Text
        style={[
          styles.nutrientLabel,
          bold && styles.nutrientTextBold,
          indent && styles.nutrientIndent,
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.nutrientValue,
          bold && styles.nutrientTextBold,
          indent && styles.nutrientIndent,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  errorText: {
    fontSize: 16,
    color: "#c62828",
  },
  // Hero
  hero: {
    height: 280,
    backgroundColor: "#e07060",
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: "65%",
    height: "90%",
  },
  favoriteButton: {
    position: "absolute",
    bottom: -20,
    right: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#00640a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#191c1d",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  // Card
  card: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 48,
  },
  brand: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00640a",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#191c1d",
    letterSpacing: -0.5,
    lineHeight: 30,
    marginBottom: 20,
  },
  // Scores
  scoresRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  scoreBadge: {
    flex: 1,
    backgroundColor: "#f3f4f5",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    gap: 6,
  },
  scoreLabel: {
    fontSize: 8,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  scoreValue: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 36,
    alignItems: "center",
  },
  scoreValueText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
  },
  // Macros
  macrosScroll: {
    marginBottom: 24,
    marginHorizontal: -24,
  },
  macrosContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  macroChip: {
    backgroundColor: "#f3f4f5",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    minWidth: 72,
  },
  macroLabel: {
    fontSize: 8,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#191c1d",
  },
  // Sections
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191c1d",
    marginBottom: 12,
  },
  ingredientsText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 22,
  },
  allergenBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  allergenTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#c62828",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  allergenText: {
    fontSize: 13,
    color: "#7f1d1d",
    lineHeight: 20,
  },
  // Nutritional table
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 4,
    borderRadius: 4,
    marginBottom: 2,
  },
  nutrientRowBold: {
    backgroundColor: "#ffffff",
  },
  nutrientLabel: {
    fontSize: 13,
    color: "#6b7280",
    flex: 1,
  },
  nutrientValue: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "right",
  },
  nutrientTextBold: {
    fontWeight: "600",
    color: "#191c1d",
  },
  nutrientIndent: {
    color: "#9ca3af",
    fontSize: 12,
    paddingLeft: 8,
  },
});
