import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "ALIMENTO",
        headerTintColor: "red",
        headerStyle: { backgroundColor: "lightgray" },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Inicio" }} />
    </Stack>
  );
}
