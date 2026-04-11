import { FC } from "react";
import { StyleSheet, View } from "react-native";

type CuadradoProps = {
  color?: string;
};
export const Cuadrado: FC<CuadradoProps> = ({ color = "red" }) => {
  return <View style={[styles.cuadrado, { backgroundColor: color }]} />;
};

// export function Cuadrado({ color = "red" }: CuadradoProps) {
//   const { color = "red" } = props;
//   return <View style={[styles.cuadrado, { backgroundColor: color }]} />;
// }

// export const Cuadrado  = ({ color = "red" }: CuadradoProps) => {
//   return <View style={[styles.cuadrado, { backgroundColor: color }]} />;
// };

// const Cuadrado = () => <View style={[styles.cuadrado, { backgroundColor: color }]} />;

const styles = StyleSheet.create({
  cuadrado: {
    width: 75,
    height: 75,
    backgroundColor: "red",
  },
});
