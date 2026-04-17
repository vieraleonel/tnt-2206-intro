import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FormularioPaso1Screen() {
  const router = useRouter();

  const navToPaso2 = () => {
    router.replace("/formulario/paso2");
  };

  // Vista
  return (
    <View style={styles.container}>
      <Pressable onPress={navToPaso2}>
        <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
          <Text style={{ fontSize: 30 }}>1</Text>
        </View>
      </Pressable>
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
