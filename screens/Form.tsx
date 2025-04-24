// screens/Form.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, Image } from 'react-native';
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
      <Image source={require('../assets/help_form.png')} style={styles.image} />
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Causa Social</Text>
      <TextInput style={styles.input} value={cause} onChangeText={setCause} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
});
