import { Link, Stack, useRouter } from "expo-router";
import { Fragment } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AlimentoScreen() {
  const router = useRouter();

  const navToIndex = () => {
    router.back();
  };

  // Vista
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTintColor: "red",
          headerStyle: { backgroundColor: "black" },
        }}
      />
      <View style={styles.container}>
        <Pressable onPress={navToIndex}>
          <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
            <Text>Alimento Screen</Text>
          </View>
        </Pressable>
        <Link href="/">INDEX</Link>
      </View>
    </Fragment>
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
