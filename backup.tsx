import "react-native-reanimated";

/*
CuadradoDos
function Cuadrado() {
  return <View style={styles.cuadrado} />;
}
*/
import { Cuadrado } from "@/src/components/cuadrado";
import { PropsWithChildren, ReactElement } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RootLayout() {
  // Logica/Controller
  const fondo = false;

  const pressIn = () => {
    alert("PRESS IN");
  };

  const press = () => {
    alert("PRESS");
  };

  const pressOUt = () => {
    alert("PRESS OUT");
  };

  // const pressConPosicion = (i: number) => {
  //   return () => {
  //     alert(`PRESS ${i}`);
  //   };
  // };

  // function pressConPosicion(i: number) {
  //   function pressReal() {
  //     alert(`PRESS ${i}`);
  //   }
  //   return pressReal;
  // }

  // function pressConPosicion(i: number) {
  //   return function pressReal() {
  //     alert(`PRESS ${i}`);
  //   }
  // }

  // function pressConPosicion(i: number) {
  //   return () => {
  //     alert(`PRESS ${i}`);
  //   };
  // }

  // const pressConPosicion = (i: number) => {
  //   return () => {
  //     alert(`PRESS ${i}`);
  //   };
  // };

  const pressConPosicion = (i: number) => () => alert(`PRESS ${i}`);

  // Vista
  return (
    <View style={[styles.container, fondo ? { backgroundColor: "red" } : null]}>
      <Pressable onPressIn={pressIn} onPress={press} onPressOut={pressOUt}>
        <View style={{ width: 100, height: 100, backgroundColor: "green" }}>
          <Text>Hola</Text>
        </View>
      </Pressable>

      <TouchableOpacity onPress={press}>
        <View style={{ width: 100, height: 100, backgroundColor: "green" }}>
          <Text>Hola</Text>
        </View>
      </TouchableOpacity>
      <Button title="BOTON NATIVO" onPress={() => alert("Hola")} />
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
      <SeccionScrolleable titulo="Rojos">
        {Array.from({ length: 10 }, (_, i) => (
          <Pressable key={i} onPress={pressConPosicion(i)}>
            <Cuadrado key={i} />
          </Pressable>
        ))}
      </SeccionScrolleable>
      <SeccionScrolleable titulo="Verdes" hideTitle>
        <Text>Verde 1</Text>
        <Text>Verde 2</Text>
        <Text>Verde 3</Text>
      </SeccionScrolleable>
    </View>
  );
}

type MyScrollViewProps = {
  titulo: string;
  hideTitle?: boolean;
};
const SeccionScrolleable = ({
  titulo,
  hideTitle = false,
  children,
}: PropsWithChildren<MyScrollViewProps>): ReactElement => {
  return (
    <View>
      <Text>{hideTitle ? "" : titulo}</Text>
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.ScrollViewContent}
      >
        {children}
      </ScrollView>
    </View>
  );
};

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
