import { Categoria, categorias } from "@/src/data/categorias";
import { Etiqueta, etiquetas } from "@/src/data/etiquetas";
import { Marca, marcas } from "@/src/data/marcas";
import { fichaShowRoute } from "@/src/navigation/routes";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

const items: (Categoria | Etiqueta | Marca)[] = categorias
  .concat(etiquetas)
  .concat(marcas);
export default function IndexScreen() {
  //   function keyExtractor(item: Categoria | Etiqueta | Marca) {
  //     return item.id;
  //   }

  //   function renderItem({ item }: { item: Categoria | Etiqueta | Marca }) {
  //     return <Text>{item.nombre}</Text>;
  //   }

  return (
    <FlashList
      contentContainerStyle={styles.container}
      data={items}
      //windowSize={13}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Item id={item.id} nombre={item.nombre} />}
      ListEmptyComponent={<Text>No hay elementos para mostrar.</Text>}
      ListHeaderComponent={<Text>HEADER</Text>}
      ListFooterComponent={<Text>FOOTER</Text>}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 5,
            backgroundColor: "red",
            marginVertical: 6,
          }}
        />
      )}
    />
  );
}

function Item({ id, nombre }: { id: string; nombre: string }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.itemButton}
      onPress={() => router.push(fichaShowRoute(parseInt(id, 10)))}
    >
      <Text style={styles.itemText}>{nombre}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  listBlock: {
    width: "100%",
    maxWidth: 420,
    gap: 12,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  itemButton: {
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  itemText: {
    fontSize: 16,
  },
});
