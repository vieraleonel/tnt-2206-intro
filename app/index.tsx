import { AppRoute, buildRoute, ROUTES } from "@/src/navigation/routes";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

const categorias: string[] = [
  "beverages",
  "dairies",
  "snacks",
  "breakfasts",
  "desserts",
  "chocolates",
  "biscuits-and-cakes",
  "cereals-and-potatoes",
  "meals",
  "plant-based-foods",
];

const marcas: string[] = [
  "nestle",
  "coca-cola",
  "pepsi",
  "danone",
  "kelloggs",
  "unilever",
  "mondelez",
  "mars",
  "ferrero",
  "lactalis",
];

const etiquetas: string[] = [
  "organic",
  "vegan",
  "vegetarian",
  "gluten-free",
  "no-added-sugar",
  "fair-trade",
  "lactose-free",
  "palm-oil-free",
  "high-fiber",
  "low-fat",
];

export default function IndexScreen() {
  const router = useRouter();

  const navToAlimento = () => {
    router.push(buildRoute(ROUTES.ALIMENTO));
  };

  const navToFormulario1 = () => {
    router.push(buildRoute(ROUTES.FORMULARIO_PASO_1));
  };

  const navToTabsDemo = () => {
    router.push(buildRoute(ROUTES.TABS));
  };

  // Vista
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.quickActions}>
        <Pressable
          onPress={navToAlimento}
          style={[styles.card, styles.greenCard]}
        >
          <Text style={styles.cardText}>ALIMENTO</Text>
        </Pressable>
        <Pressable
          onPress={navToFormulario1}
          style={[styles.card, styles.blueCard]}
        >
          <Text style={styles.cardText}>FORM</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(buildRoute(ROUTES.FICHA, { id: "123" }))}
          style={[styles.card, styles.blueCard]}
        >
          <Text style={styles.cardText}>ALI 123</Text>
        </Pressable>
        <Pressable
          onPress={navToTabsDemo}
          style={[styles.card, styles.orangeCard]}
        >
          <Text style={styles.cardText}>TABS</Text>
        </Pressable>
      </View>

      <SeccionList title="Categorias" items={categorias} type="categorias" />
      <SeccionList title="Marcas" items={marcas} type="marcas" />
      <SeccionList2
        title="Etiquetas"
        items={etiquetas}
        route={ROUTES.ETIQUETA}
      />
    </ScrollView>
  );
}

type SectionListProps = {
  title: string;
  items: string[];
  type: "categorias" | "marcas" | "etiquetas";
};
const SeccionList = ({ title, items, type }: SectionListProps) => {
  const router = useRouter();

  const navToListItem = (item: string) => {
    const pathname =
      type === "categorias"
        ? ROUTES.CATEGORIA
        : type === "marcas"
          ? ROUTES.MARCA
          : ROUTES.ETIQUETA;
    router.push(buildRoute(pathname, { nombre: item }));
  };

  return (
    <View style={styles.listBlock}>
      <Text style={styles.listTitle}>{title}</Text>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <Pressable
            key={item}
            onPress={() => navToListItem(item)}
            style={styles.itemButton}
          >
            <Text style={styles.itemText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

type SectionList2Props = {
  title: string;
  items: string[];
  route: AppRoute;
};
const SeccionList2 = ({ title, items, route }: SectionList2Props) => {
  const router = useRouter();

  const navToListItem = (item: string) => {
    router.push(buildRoute(route, { nombre: item }));
  };

  return (
    <View style={styles.listBlock}>
      <Text style={styles.listTitle}>{title}</Text>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <Pressable
            key={item}
            onPress={() => navToListItem(item)}
            style={styles.itemButton}
          >
            <Text style={styles.itemText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  quickActions: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  card: {
    width: 180,
    minHeight: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  greenCard: {
    backgroundColor: "green",
  },
  blueCard: {
    backgroundColor: "lightblue",
  },
  orangeCard: {
    backgroundColor: "#f59e0b",
  },
  cardText: {
    fontSize: 24,
    fontWeight: "700",
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
