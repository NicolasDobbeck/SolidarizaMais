import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { getProjects, Project } from "../services/globalGivingApi";
import Icon from "react-native-vector-icons/Feather";

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
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(text.toLowerCase()) ||
        project.summary.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Buscar Projetos</Text>

      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#A0AEC0"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite palavras-chave..."
          placeholderTextColor="#A0AEC0"
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {filteredProjects.length === 0 ? (
          <Text style={styles.noResultsText}>
            Nenhum projeto encontrado para "{query}".
          </Text>
        ) : (
          filteredProjects.map((project) => (
            <View key={project.id} style={styles.card}>
              <Image
                source={{ uri: project.image.imagelink[3]?.url }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.cardTitle}>{project.title}</Text>
              <Text style={styles.cardSummary} numberOfLines={3}>
                {project.summary}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(project.projectLink)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Ver mais</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60, // espaçamento maior no topo
    backgroundColor: "#F7FAFC",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F855A",
    marginBottom: 16,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2D3748",
  },
  scroll: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#2F855A",
  },
  cardSummary: {
    fontSize: 14,
    color: "#4A5568",
    marginTop: 4,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#38A169",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  noResultsText: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginTop: 40,
  },
});

export default Search;
