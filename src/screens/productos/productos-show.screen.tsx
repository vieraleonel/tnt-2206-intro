import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const guardarFavoritos = async (id: string) => {
  await AsyncStorage.setItem("productosFavoritos", id);
  return true;
};

const eliminarFavoritos = async () => {
  await AsyncStorage.removeItem("productosFavoritos");
  return true;
};

const obtenerFavoritos = async (): Promise<string | null> => {
  const favoritos = await AsyncStorage.getItem("productosFavoritos");
  return favoritos;
};

export function ProductosShowScreen() {
  const { id } = useLocalSearchParams();
  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    obtenerFavoritos().then((favorito) => {
      console.log("Favorito obtenido:", favorito);
      if (favorito === id) {
        setIsFavorito(true);
      }
    });
  }, [id]);

  async function toggleFavorito() {
    try {
      if (isFavorito) {
        console.log("Eliminando favorito");
        await eliminarFavoritos();
        setIsFavorito(false);
      } else {
        console.log("Agregando favorito");
        await guardarFavoritos(id);
        setIsFavorito(true);
      }
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
