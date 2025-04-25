import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <ImageBackground
      source={require("../assets/mundo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao Solidariza+</Text>
        <Text style={styles.subtitle}>
          Descubra iniciativas transformadoras e apoie projetos sociais ao redor
          do mundo. Conecte-se com causas que fazem a diferença, fortaleça
          comunidades e contribua para um futuro mais justo e solidário por meio
          da sua generosidade.
        </Text>

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
            <View style={styles.buttonContent}>
              <Icon
                name="search"
                size={20}
                color="#FFF"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.buttonText}>Buscar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2F855A",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#38A169",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
