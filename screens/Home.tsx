import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/ajuda-humanitaria.jpg")}
        style={styles.banner}
        resizeMode="cover"
      />
      <Text style={styles.title}>Bem-vindo ao Solidariza+</Text>
      <Text style={styles.subtitle}>
        Encontre e apoie projetos sociais de todo o mundo!
      </Text>

      <Image
        source={require("../assets/organizacoes_de_ajuda_humanitaria.jpg")}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Projetos")}
        >
          <Text style={styles.buttonText}>Ver Projetos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Buscar")}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  banner: { width: "100%", height: 150, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  image: { width: 200, height: 200, marginBottom: 30 },
  buttonsContainer: { flexDirection: "row", gap: 10 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
