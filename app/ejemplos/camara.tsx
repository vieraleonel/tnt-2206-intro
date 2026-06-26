import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, Linking, Text, View } from "react-native";

export default function EjemploCameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  console.log("### permission", permission);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted && permission.canAskAgain) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>🚨 We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Solicitar permisos" />
      </View>
    );
  }

  if (!permission.granted && !permission.canAskAgain) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>⚙️ Ir a ajustes de permisos</Text>
        <Button onPress={Linking.openSettings} title="Ir a ajustes" />
      </View>
    );
  }

  return (
    <View>
      <Text>✅ TENGO PERMISOS</Text>
      <CameraView
        style={{ width: "100%", height: 600, backgroundColor: "red" }}
        facing="front"
      />
    </View>
  );
}
