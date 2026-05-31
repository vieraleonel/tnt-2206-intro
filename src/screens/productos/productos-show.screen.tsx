import { FAVORITOS_HOOK_KEY, useFavoritos } from "@/src/hooks/useFavoritos";
import {
  eliminarFavorito,
  guardarFavorito,
} from "@/src/services/favorites.service";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function ProductosShowScreen() {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();

  // useRefreshOnFocus(FAVORITOS_HOOK_KEY);
  const { data } = useFavoritos();

  const isFavorito = data?.some((favorito) => favorito.id === id) ?? false;

  async function toggleFavorito() {
    try {
      if (isFavorito) {
        console.log("Eliminando favorito");
        await eliminarFavorito(id);
      } else {
        console.log("Agregando favorito");
        await guardarFavorito({ id: id, nombre: `Producto ${id}` });
      }
      queryClient.invalidateQueries({ queryKey: FAVORITOS_HOOK_KEY });
    } catch (error) {
      console.error("Error al guardar/eliminar favorito", error);
      alert("Hubo un error. Por favor, intenta nuevamente.");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ProductosShowScreen {id}</Text>
      <Pressable onPressIn={toggleFavorito}>
        <Ionicons
          name={isFavorito ? "heart" : "heart-outline"}
          size={20}
          color="red"
        />
      </Pressable>
    </View>
  );
}
