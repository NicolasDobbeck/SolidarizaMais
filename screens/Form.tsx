import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cause, setCause] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !cause || !description) {
      Alert.alert('Por favor, preencha todos os campos');
      return;
    }

    const newEntry = {
      name,
      email,
      cause,
      description,
      date: new Date().toISOString(),
    };

    try {
      const stored = await AsyncStorage.getItem('@form_suggestions');
      const parsed = stored ? JSON.parse(stored) : [];
      parsed.push(newEntry);
      await AsyncStorage.setItem('@form_suggestions', JSON.stringify(parsed));
      Alert.alert('Sugestão enviada com sucesso!');
      setName('');
      setEmail('');
      setCause('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao salvar sugestão:', error);
      Alert.alert('Erro ao salvar sugestão');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/form.png')} style={styles.logo} />

      <Text style={styles.title}>Envie sua sugestão</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Causa Social</Text>
      <TextInput style={styles.input} value={cause} onChangeText={setCause} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F0F4F8',
    flexGrow: 1,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F855A',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2F855A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2F855A',
    marginBottom: 24,
  },
});