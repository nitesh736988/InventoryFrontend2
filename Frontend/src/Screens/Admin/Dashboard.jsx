import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_URL } from '@env';

const Dashboard = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isRefreshClicked, setIsRefreshClicked] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('Total Items');
  const [warehouses, setWarehouses] = useState([]);     

  const [allWarehouses, setAllWarehouses] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedWarehouse);
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/admin/dashboard?option=${selectedWarehouse}`);
        const responseData = await response.data.data;

        setWarehouses(responseData || []);
        // setData(responseData.items || []); 
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data');
        console.log('Error fetching data:', error.response);
      } finally {
        setLoading(false);
        setIsRefreshClicked(false);
      }
    
    };
    fetchData();
}, [selectedWarehouse]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/all-warehouses`);
        console.log('API Response:', response.data);

        if (response.data.success) {
          setAllWarehouses(response.data.allWarehouses);
        } else {
          console.log('No warehouse data found:', response.data);
          setAllWarehouses([]);
        }
      } catch (error) {
        console.log('Failed to fetch warehouse names:', error.response);
        setAllWarehouses([]);
      }
    };

    fetchWarehouses();
  }, []);


  useEffect(() => {
    if (isRefreshClicked) {
      fetchData();
    }
  }, [isRefreshClicked]);

  const filterDataByWarehouse = () => {
    if (selectedWarehouse === 'Total Items') {
      return data;
    }
    return data.filter((item) => item.warehouseName === selectedWarehouse);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>

        <Picker
          selectedValue={selectedWarehouse}
          style={styles.picker}
          onValueChange={(value) => setSelectedWarehouse(value)}
        >
          <Picker.Item label="Total Items" value="Total Items" />
          {allWarehouses.map((warehouse) => (
            <Picker.Item
              key={warehouse._id}
              label={warehouse.warehouseName}
              value={warehouse.warehouseName}
            />
          ))}
        </Picker>

        <TouchableOpacity
          style={styles.refreshIcon}
          onPress={() => setIsRefreshClicked(true)}
        >
          <Icon style={{ textAlign: 'right' }} name="refresh" size={30} color="black" />
        </TouchableOpacity>

        {filterDataByWarehouse().length > 0 ? (
          filterDataByWarehouse().map(
            ({ _id, itemName, quantity, defective, repaired, rejected }) => (
              <View key={_id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{itemName}</Text>
                  <Text style={styles.cardDetails}>Quantity: {quantity}</Text>
                  <Text style={styles.cardDetails}>Defective: {defective}</Text>
                  <Text style={styles.cardDetails}>Repaired: {repaired}</Text>
                  <Text style={styles.cardDetails}>Rejected: {rejected}</Text>
                </View>
              </View>
            )
          )
        ) : (
          <Text style={styles.noDataText}>No items found for the selected warehouse.</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fbd33b',
  },
  refreshIcon: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#070604',
  },
  cardDetails: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginVertical: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
});

export default Dashboard;
