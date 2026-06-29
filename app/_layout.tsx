import { theme } from "@/src/theme/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: "Digital Epicurean",
            headerTitleStyle: {
              color: theme.colors.primary,
            },
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
