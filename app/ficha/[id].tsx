import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

type FichaScreenParams = {
  id: string;
};
export default function FichaScreen() {
  const { id } = useLocalSearchParams<FichaScreenParams>();

  // Vista
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: id }} />
      <Text style={{ fontSize: 30 }}>FICHA {id}</Text>
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
