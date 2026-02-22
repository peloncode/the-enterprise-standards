import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  // Asegura que al recargar, la app sepa que la ruta inicial es el tabs
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return (
    // Forzamos el DarkTheme para que combine con nuestro diseño Pro
    <ThemeProvider value={DarkTheme}>
      <Stack>
        {/* Solo dejamos la ruta de los tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
