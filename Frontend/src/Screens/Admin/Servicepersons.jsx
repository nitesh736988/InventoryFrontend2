import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';

const Servicepersons = () => {
  const [servicepersons, setServicepersons] = useState([]);

  const fetchServicepersons = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/all-service-persons`, { timeout: 2000 });
      console.log(response.data);
      const result = response.data.allServicePersons;
      setServicepersons(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch service persons');
      console.log('Error fetching data:', error);
    }
  };

  const deleteWarehousePerson = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/remove-service-person?id=${id}`);
      Alert.alert('Success', 'Service person deleted successfully');
      setServicepersons((prev) => prev.filter((person) => person._id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete warehouse person');
      console.log('Error deleting data:', error);
    }
  };

  useEffect(() => {
    fetchServicepersons();
  }, []);

  const renderServicepersons = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Name: <Text style={styles.value}>{item.name}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{item.email}</Text></Text>
      <Text style={styles.label}>Contact: <Text style={styles.value}>{item.contact}</Text></Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete ${item.name}?`,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => deleteWarehousePerson(item._id) },
            ]
          )
        }
      >
        <Icon name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
       <Text style={styles.label}>Total Service Persons: {servicepersons.length}</Text>
      <FlatList
        data={servicepersons}
        keyExtractor={(item) => item._id}
        renderItem={renderServicepersons}
        ListEmptyComponent={<Text style={styles.emptyText}>No service persons found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    padding: 20,
  },
  card: {
    backgroundColor: '#fbd33b',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, 
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },

  deleteButton: {
    marginTop: 10,
    width: 40, 
    height: 40, 
    backgroundColor: '#f46d62', 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    top: 10, 
    right: 10, 
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Servicepersons;
