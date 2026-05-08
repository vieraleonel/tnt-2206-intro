import { Fragment, useState } from "react";
import { Button, Text, View } from "react-native";

const props = {
  title: "Calcular",
  namespace: "calcular",
  age: 30,
};

const arreglo = [1, 200];

export default function SimpleStateScreen() {
  //console.log("STATE: ", state);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 36 }}>3x4 =</Text>
      <Calcular />
    </View>
  );
}

function Calcular() {
  const [resultado, setResultado] = useState<number>(0);
  return (
    <Fragment>
      <Button
        title="Calcular"
        onPress={() => {
          setResultado(3 * 4);
        }}
      />
      <Text style={{ fontSize: 25 }}>Resultado: {resultado}</Text>
    </Fragment>
  );
}
