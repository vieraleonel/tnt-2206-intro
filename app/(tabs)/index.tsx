import { categorias } from "@/src/data/categorias";
import { etiquetas } from "@/src/data/etiquetas";
import { marcas } from "@/src/data/marcas";
import { AppRoute, buildRoute, ROUTES } from "@/src/navigation/routes";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

async function llamarApi() {
  try {
    const respuesta = await fetch("http://localhost:8080/categorias.json");
    if (!respuesta.ok) {
      throw new Error("Error en la respuesta: " + respuesta.status);
    }
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
  } finally {
    console.warn("Llamada a la API finalizada");
  }

  // fetch("http://localhost:8080/categorias.json")
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Error en la respuesta: " + response.status);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => console.log("Datos procesados:", data))
  //   .catch((error) => console.log("Error:", error))
  //   .finally(() => console.log("Fetch finalizado"));

  // const promesa = fetch("http://localhost:8080/categorias.json");
  // promesa.then(function (response) {
  //   console.log("Respuesta recibida");

  //   if (!response.ok) {
  //     throw new Error("Error en la respuesta: " + response.status);
  //   }
  //   return response.json();
  // })
  // .then(function (data) {
  //   console.log("Datos procesados:", data);
  // })
  // .catch(function (error) {
  //   console.log("GENRAL Error:", error);
  // });
}

export default function IndexScreen() {
  const [data, setData] = useState("");

  // useEffect(() => {
  //   llamarApi().then((data) => {
  //     if (data) {
  //       setData(JSON.stringify(data));
  //     }
  //   });
  // }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SeccionList
        title="Categorias"
        items={categorias}
        route={ROUTES.CATEGORIA}
      />
      <Text>{data}</Text>
      <SeccionList title="Marcas" items={marcas} route={ROUTES.MARCA} />
      <SeccionList
        title="Etiquetas"
        items={etiquetas}
        route={ROUTES.ETIQUETA}
      />
    </ScrollView>
  );
}

type ListItem = {
  id: string;
  nombre: string;
};

type SectionListProps = {
  title: string;
  items: ListItem[];
  route: AppRoute;
};

const SeccionList = ({ title, items, route }: SectionListProps) => {
  const router = useRouter();

  const navToListItem = (item: ListItem) => {
    router.push(buildRoute(route, { nombre: item.id }));
  };

  return (
    <View style={styles.listBlock}>
      <Text style={styles.listTitle}>{title}</Text>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => navToListItem(item)}
            style={styles.itemButton}
          >
            <Text style={styles.itemText}>{item.nombre}</Text>
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
