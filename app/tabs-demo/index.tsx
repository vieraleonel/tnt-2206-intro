import { StyleSheet, Text, View } from "react-native";

export default function TabsDemoHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.description}>
        Esta pantalla ejemplifica el primer tab dentro de Expo Router.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
    backgroundColor: "#fff7ed",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#9a3412",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#7c2d12",
  },
});
