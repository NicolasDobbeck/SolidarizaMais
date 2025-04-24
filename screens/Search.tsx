import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Image, StyleSheet } from "react-native";
import { getProjects, Project } from "../services/globalGivingApi";

const Search = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getProjects();
        setProjects(allProjects);
        setFilteredProjects(allProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(text.toLowerCase()) ||
      project.summary.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Projetos</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite palavras-chave..."
        value={query}
        onChangeText={handleSearch}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        {filteredProjects.map((project) => (
          <View key={project.id} style={styles.card}>
            <Image
              source={{ uri: project.image.imagelink[0].url }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle}>{project.title}</Text>
            <Text style={styles.cardSummary}>{project.summary}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  scroll: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  cardSummary: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default Search;
