import "react-native-reanimated";

/*
CuadradoDos
function Cuadrado() {
  return <View style={styles.cuadrado} />;
}
*/
import { Cuadrado } from "@/src/components/cuadrado";
import { ScrollView, StyleSheet, View } from "react-native";

export default function RootLayout() {
  // Logica/Controller
  const fondo = false;

  // Vista
  return (
    <View style={[styles.container, fondo ? { backgroundColor: "red" } : null]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Cuadrado color="red" />
        <View style={{ flex: 1, backgroundColor: "pink", height: 100 }}></View>
        <View style={{ gap: 5, backgroundColor: "cyan" }}>
          <Cuadrado color="blue" />
          <Cuadrado color="yellow" />
        </View>
        <Cuadrado />
      </View>
      <MyScrollView />
    </View>
  );
}

function MyScrollView() {
  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      contentContainerStyle={styles.ScrollViewContent}
    >
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
      <Cuadrado />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  cuadrado: {
    width: 75,
    height: 75,
    backgroundColor: "red",
  },
  scrollView: { backgroundColor: "pink", maxHeight: 100 },
  ScrollViewContent: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
