import { CategoriasList } from "@/src/screens/home/components/categorias-list";
import { EtiquetasList } from "@/src/screens/home/components/etiquetas-list";
import { MarcasList } from "@/src/screens/home/components/marcas-list";
import { theme } from "@/src/theme/global";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Hero Section */}
        <View>
          <Text style={styles.heroSubtitle}>CURATED FLAVORS</Text>
          <Text style={styles.heroTitle}>
            The art of <Text style={styles.heroTitleItalic}>conscious</Text>{" "}
            discovery.
          </Text>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <CategoriasList />
        </View>

        {/* Refine by Taste Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Refine by Taste</Text>
          <EtiquetasList />
        </View>

        {/* Global Brands Section */}
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Global Brands</Text>
            <Text style={styles.brandsSubtitle}>
              Explored through the lens of quality.
            </Text>
          </View>

          <MarcasList />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 32,
  },
  heroSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.primary,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  heroTitleItalic: {
    fontStyle: "italic",
    color: theme.colors.primary,
  },
  // Section
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  viewLibrary: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.primary,
  },

  // Tags
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },

  // Brands
  brandsSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  brandsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
});
