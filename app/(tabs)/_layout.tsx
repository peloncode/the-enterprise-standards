import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F172A",
          borderTopColor: "#1E293B",
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#38BDF8",
        tabBarInactiveTintColor: "#64748B",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tareas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
