import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const AddWareHouse = () => {
  const [warehouseName, setWarehouseName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!warehouseName) {
      Alert.alert('Error', 'Please enter a warehouse name.');
      return;
    }

    const warehouseData = { warehouseName };
    console.log('Sending data:', warehouseData); // Log the payload for debugging

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/admin/add-warehouse`, warehouseData);
      console.log('Response:', response.data); // Log the response for debugging
      Alert.alert('Success', 'Warehouse added successfully!');
      setWarehouseName(''); // Clear input on success
    } catch (error) {
      console.log('Error adding warehouse:', error); // Log error for debugging
      const errorMessage = error.response?.data?.message || 'Warehouse already exists or there was an error.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add Warehouse:</Text>
      <TextInput
        style={styles.input}
        placeholder="Warehouse Name"
        value={warehouseName}
        onChangeText={setWarehouseName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Add Warehouse</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbd33b',
  },
  label: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#070604',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#070604',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default AddWareHouse;
