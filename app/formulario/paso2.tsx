import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FormularioPaso1Screen() {
  const router = useRouter();

  const navToIndex = () => {
    router.back();
  };

  // Vista
  return (
    <View style={styles.container}>
      <Pressable onPress={navToIndex}>
        <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
          <Text style={{ fontSize: 30 }}>2</Text>
        </View>
      </Pressable>
      <Link href="/">INDEX</Link>
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
