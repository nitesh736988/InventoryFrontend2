import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';

const Warehousepersons = () => {
  const [warehousePersons, setWarehousePersons] = useState([]);

  const fetchWarehousePersons = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/all-warehouse-persons`, { timeout: 2000 });
      console.log(response.data);
      const result = response.data.allWarehousePersons;
      setWarehousePersons(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch warehouse persons');
      console.log('Error fetching data:', error);
    }
  };

  const deleteWarehousePerson = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/remove-warehouse-person?id=${id}`);
      Alert.alert('Success', 'Warehouse person deleted successfully');
      setWarehousePersons((prev) => prev.filter((person) => person._id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete warehouse person');
      console.log('Error deleting data:', error);
    }
  };

  useEffect(() => {
    fetchWarehousePersons();
  }, []);

  const renderWarehousePerson = ({ item }) => (
    <View style={styles.personContainer}>
      <Text style={styles.label}>
        Name: <Text style={styles.value}>{item.name}</Text>
      </Text>
      <Text style={styles.label}>
        Email: <Text style={styles.value}>{item.email}</Text>
      </Text>
      <Text style={styles.label}>
        Warehouse: <Text style={styles.value}>{item.warehouse.warehouseName}</Text>
      </Text>
      <Text style={styles.label}>
        Contact: <Text style={styles.value}>{item.contact}</Text>
      </Text>
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
      <Text style={styles.label}>Total Warehouse Persons: {warehousePersons.length}</Text>
      <FlatList
        data={warehousePersons}
        keyExtractor={(item) => item._id}
        renderItem={renderWarehousePerson}
        ListEmptyComponent={<Text>No warehouse persons found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  personContainer: {
    backgroundColor: '#fbd33b',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    borderColor: '#070604',
    borderWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    color: '#070604',
  },
  value: {
    fontWeight: 'normal',
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


export default Warehousepersons;
