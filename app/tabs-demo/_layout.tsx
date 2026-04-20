import { Tabs } from "expo-router";

export default function TabsDemoLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#d97706",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Tabs Demo",
          tabBarLabel: "Home",
          tabBarActiveTintColor: "red",
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          headerTitle: "Favoritos",
          tabBarLabel: "Favoritos",
          tabBarActiveTintColor: "red",
        }}
      />
    </Tabs>
  );
}
