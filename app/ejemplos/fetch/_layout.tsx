import { Stack } from "expo-router";

export default function FetchExamplesLayout() {
  return (
    <Stack screenOptions={{ headerTransparent: true, headerTitle: "" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="clasico" />
      <Stack.Screen name="moderno" />
      <Stack.Screen name="tanstack" />
    </Stack>
  );
}
