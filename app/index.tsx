import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

export default function IndexScreen() {
  const router = useRouter();

  const navToAlimento = () => {
    router.push("/alimento");
  };

  const navToFormulario1 = () => {
    router.push("/formulario/paso1");
  };

  // Vista
  return (
    <View style={styles.container}>
      <Pressable onPress={navToAlimento}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30 }}>ALIMENTO</Text>
        </View>
      </Pressable>
      <Pressable onPress={navToFormulario1}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "lightblue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30 }}>FORM </Text>
        </View>
      </Pressable>
      <Link href="/alimento">ALIMENTO</Link>
    </View>
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
});
