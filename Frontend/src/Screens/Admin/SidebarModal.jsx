import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SidebarModal = () => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();

  const openModal = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const openAddwarehouse = () => {
    closeModal();
    navigation.navigate("AddWarehouse");
  };

  const openWarehouseRegistration = () => {
    closeModal();
    navigation.navigate("WarehouseRegistration");
  };

  const openHistory = () => {
    closeModal();
    navigation.navigate("History");
  };

  const openOrderTracker = () => {
    closeModal();
    navigation.navigate("OrderTracker");
  };

  const openwarehousepersons = () => {
    closeModal();
    navigation.navigate("Warehousepersons");
  };

  const openservicepersons = () => {
    closeModal();
    navigation.navigate("Servicepersons");
  };

  const openrepirereject = () => {
    closeModal();
    navigation.navigate("Repirereject");
  };


  useEffect(() => {
    if (!visible) {
      slideAnim.setValue(-300);
    }
  }, [visible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.openButton}>
        <Text style={styles.buttonText}>Open Sidebar</Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="none" onRequestClose={closeModal}>
        <TouchableOpacity style={styles.overlay} onPress={closeModal} activeOpacity={1} />

        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.sidebarText}>Galo Inventory System</Text>

          <TouchableOpacity onPress={openAddwarehouse} style={styles.optionButton}>
            <Text style={styles.optionText}>Add Warehouse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openWarehouseRegistration} style={styles.optionButton}>
            <Text style={styles.optionText}>Warehouse Registration</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openHistory} style={styles.optionButton}>
            <Text style={styles.optionText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openOrderTracker} style={styles.optionButton}>
            <Text style={styles.optionText}>Order Tracker</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openwarehousepersons} style={styles.optionButton}>
            <Text style={styles.optionText}>Warehouse Persons</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openservicepersons} style={styles.optionButton}>
            <Text style={styles.optionText}>Service Persons</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openrepirereject} style={styles.optionButton}>
            <Text style={styles.optionText}>Repire & Reject</Text>
          </TouchableOpacity>

        </Animated.View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'flex-start',
    elevation: 5,
    backgroundColor: '#fbd33b'
  },
  sidebarText: {
    // backgroundColor: 'black',
    fontSize: 20,
    marginBottom: 25,
    color: 'black'
  },
  optionButton: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    color: 'black'
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default SidebarModal;
