import { ROUTES } from "@/src/navigation/routes";
import { getProduct } from "@/src/services/productos.service";
import { theme } from "@/src/theme/global";
import { Ionicons } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CamaraScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  // Barcode scan state
  const [scanState, setScanState] = useState<
    "idle" | "loading" | "found" | "not_found"
  >("idle");
  const [scannedProductId, setScannedProductId] = useState<string | null>(null);

  const [permission, requestPermission] = useCameraPermissions();
  console.log(permission);

  const handleOpenModal = () => {
    setScanState("idle");
    setScannedProductId(null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleRetry = () => {
    setScanState("idle");
    setScannedProductId(null);
  };

  const handleBarcodeScan = async (result: BarcodeScanningResult) => {
    console.log("Barcode scanned:", result);
    setScanState("loading");

    setScannedProductId(result.data);
    try {
      await getProduct(result.data);
      setScanState("found");
    } catch {
      setScanState("not_found");
    }
  };

  const handleGoToProduct = () => {
    if (!scannedProductId) {
      return;
    }
    handleCloseModal();
    router.push({
      pathname: ROUTES.PRODUCTO,
      params: { id: scannedProductId },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Buscar productos" }} />

      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Buscar productos</Text>

        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#a1a1aa"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Ej: jugos, orgánico, ferrero..."
              placeholderTextColor="#a1a1aa"
              returnKeyType="search"
            />
          </View>

          {/* Barcode scan button */}
          <Pressable
            style={({ pressed }) => [
              styles.scanButton,
              pressed && styles.scanButtonPressed,
            ]}
            onPress={handleOpenModal}
          >
            <Ionicons name="barcode-outline" size={26} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Barcode scanner modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
        transparent
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          {/* Modal header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Escanear código de barras</Text>
            <Pressable onPress={handleCloseModal} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#191c1d" />
            </Pressable>
          </View>

          {/* Camera area */}
          {!permission ? (
            <View style={styles.permissionContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : !permission.granted && permission.canAskAgain ? (
            <View style={styles.permissionContainer}>
              <Ionicons name="camera-outline" size={64} color="#d4d4d8" />
              <Text style={styles.permissionText}>
                Necesitamos permiso para usar la cámara
              </Text>
              <Pressable
                style={styles.permissionButton}
                onPress={requestPermission}
              >
                <Text style={styles.permissionButtonText}>
                  Solicitar permiso
                </Text>
              </Pressable>
            </View>
          ) : !permission.granted && !permission.canAskAgain ? (
            <View style={styles.permissionContainer}>
              <Ionicons name="settings-outline" size={64} color="#d4d4d8" />
              <Text style={styles.permissionText}>
                El permiso de cámara fue denegado.{"\n"}Habilitalo desde
                Ajustes.
              </Text>
              <Pressable
                style={styles.permissionButton}
                onPress={Linking.openSettings}
              >
                <Text style={styles.permissionButtonText}>Ir a Ajustes</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.cameraWrapper}>
              <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={
                  scanState === "idle" ? handleBarcodeScan : undefined
                }
                barcodeScannerSettings={{
                  barcodeTypes: [
                    "aztec",
                    "ean13",
                    "ean8",
                    "qr",
                    "pdf417",
                    "upc_e",
                    "datamatrix",
                    "code39",
                    "code93",
                    "itf14",
                    "codabar",
                    "code128",
                    "upc_a",
                  ],
                }}
              />
            </View>
          )}

          {(scanState === "found" || scanState === "not_found") && (
            <View
              style={[
                styles.resultCard,
                scanState === "not_found" && styles.resultCardError,
              ]}
            >
              {scanState === "found" ? (
                <>
                  <Ionicons name="checkmark-circle" size={36} color="#16a34a" />
                  <Text style={styles.resultTitle}>Producto encontrado</Text>
                  <Text style={styles.resultName} numberOfLines={2}>
                    {scannedProductId}
                  </Text>
                  <View style={styles.resultActions}>
                    <Pressable
                      style={styles.verProductoButton}
                      onPress={handleGoToProduct}
                    >
                      <Text style={styles.verProductoButtonText}>
                        Ver producto
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={18}
                        color="#ffffff"
                      />
                    </Pressable>
                    <Pressable style={styles.retryButton} onPress={handleRetry}>
                      <Text style={styles.retryButtonText}>
                        Volver a escanear
                      </Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <Ionicons name="warning-outline" size={36} color="#ef4444" />
                  <Text style={[styles.resultTitle, { color: "#ef4444" }]}>
                    Producto no encontrado
                  </Text>
                  <Text style={styles.resultName} numberOfLines={2}>
                    {scannedProductId}
                  </Text>
                  <Text style={styles.resultSubtitle}>
                    Este producto no está en la base de datos
                  </Text>
                  <Pressable style={styles.retryButton} onPress={handleRetry}>
                    <Text style={styles.retryButtonText}>
                      Volver a escanear
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#191c1d",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: "#71717a",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    height: 56,
    position: "relative",
    justifyContent: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  searchInput: {
    height: 56,
    backgroundColor: "#f3f4f5",
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 48,
    fontSize: 15,
    fontWeight: "500",
    color: "#191c1d",
  },
  searchSpinner: {
    position: "absolute",
    right: 16,
  },
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonPressed: {
    opacity: 0.8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#a1a1aa",
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#a1a1aa",
    textAlign: "center",
    lineHeight: 22,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  productCardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f3f4f5",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191c1d",
    lineHeight: 20,
  },
  brandName: {
    fontSize: 11,
    color: "#71717a",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  badgesContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.3,
  },
  badgeEco: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
    backgroundColor: "#c6e9be",
  },
  badgeEcoText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#4c6a48",
    letterSpacing: 0.3,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: "#f8f9fa",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#191c1d",
  },
  closeButton: {
    padding: 4,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 40,
  },
  permissionText: {
    fontSize: 16,
    color: "#71717a",
    textAlign: "center",
    lineHeight: 24,
  },
  permissionButton: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  cameraWrapper: {
    flex: 1,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  scanFrame: {
    width: 240,
    height: 160,
    borderWidth: 3,
    borderColor: "#ffffff",
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  scanHint: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  resultOverlayText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultCard: {
    margin: 20,
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  resultCardError: {
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#191c1d",
    marginTop: 4,
  },
  resultName: {
    fontSize: 14,
    color: "#71717a",
    textAlign: "center",
    lineHeight: 20,
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#71717a",
    textAlign: "center",
  },
  resultActions: {
    width: "100%",
    gap: 8,
    marginTop: 8,
  },
  verProductoButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  verProductoButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  retryButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  retryButtonText: {
    color: theme.colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
});
