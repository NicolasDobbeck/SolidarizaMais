import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { getProjects, Project } from "../services/globalGivingApi";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUrl =
            item.image.imagelink[item.image.imagelink.length - 1]?.url ||
            "https://via.placeholder.com/600x400.png?text=Sem+Imagem";

          return (
            <View style={styles.card}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.summary} numberOfLines={3}>
                {item.summary}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(item.projectLink)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Ver mais</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  list: {
    padding: 16,
    paddingTop: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F855A",
    marginBottom: 6,
  },
  summary: {
    fontSize: 14,
    color: "#4A5568",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#38A169",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});