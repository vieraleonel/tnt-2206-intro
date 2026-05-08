import { categorias } from "@/src/data/categorias";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function InputFilter() {
  // function agregarA() {
  //   setTexto(texto + " A");
  // }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CategoriasFiltrables />
    </View>
  );
}

function CategoriasFiltrables() {
  const [texto, setTexto] = useState("");

  return (
    <>
      <TextInput
        style={{ height: 60, width: 300, backgroundColor: "lightgray" }}
        onChangeText={setTexto}
        returnKeyType="next"
      />
      <CategoriasList filtro={texto} />
    </>
  );
}

function CategoriasList({ filtro }: { filtro: string }) {
  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(filtro.toLowerCase()),
  );

  return (
    <FlatList
      data={categoriasFiltradas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text style={{ fontSize: 18, padding: 10 }}>{item.nombre}</Text>
      )}
      ListEmptyComponent={<Text>No se encontraron categorías</Text>}
    />
  );
}
