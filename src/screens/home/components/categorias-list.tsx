import { categorias } from "@/src/data/categorias";
import { buildRoute, ROUTES } from "@/src/navigation/routes";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const CategoriasList = () => {
  const router = useRouter();
  const handlePressCategoria = (categoriaId: string) => () => {
    router.push(buildRoute(ROUTES.CATEGORIA, { nombre: categoriaId }));
  };
  return (
    <View style={styles.categoriesGrid}>
      {categorias.map((categoria) => {
        return (
          <Pressable
            key={categoria.id}
            onPress={handlePressCategoria(categoria.id)}
            style={({ pressed }) => [
              styles.categoryCard,
              pressed && styles.categoryCardPressed,
            ]}
          >
            <CategoriaListItem
              nombre={categoria.nombre}
              gradientsColors={categoria.gradientColors}
              textColor={categoria.textColor}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

type CategoriaListItemProps = {
  nombre: string;
  gradientsColors: [string, string];
  textColor: string;
};
const CategoriaListItem = ({
  nombre,
  gradientsColors,
  textColor,
}: CategoriaListItemProps) => {
  return (
    <LinearGradient
      colors={gradientsColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.categoryGradient}
    >
      <Text style={[styles.categoryText, { color: textColor }]}>
        {nombre.toLowerCase()}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  categoryCard: {
    width: "47%",
    aspectRatio: 0.85,
    borderRadius: 16,
    overflow: "hidden",
  },
  categoryCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  categoryGradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },
});
