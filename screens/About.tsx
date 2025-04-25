import React from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking 
} from "react-native";

const members = [
  {
    name: "Nicolas Dobbeck",
    image: require("../assets/nicolas.jpg"),
    github: "https://github.com/NicolasDobbeck",
  },
  {
    name: "José Bezerra",
    image: require("../assets/jose.jpg"),
    github: "https://github.com/jjosebastos",
  },
  {
    name: "Thiago Henry",
    image: require("../assets/thiago.png"),
    github: "https://github.com/lavithiluan",
  },
];

export default function Team() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Integrantes</Text>
      {members.map((member, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card} 
          onPress={() => Linking.openURL(member.github)}
        >
          <Image source={member.image} style={styles.image} />
          <Text style={styles.name}>{member.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#2F855A",
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});