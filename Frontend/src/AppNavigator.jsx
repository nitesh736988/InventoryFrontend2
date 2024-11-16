import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from './Screens/Login&Register/LoginPage';
import Navigation from './Screens/Navigation';
import SidebarModal from './Screens/Admin/SidebarModal';
import AddWareHouse from './Screens/Admin/AddWareHouse';
import WarehouseRegistration from './Screens/Admin/WarehouseRegistration';
import Warehousepersons from './Screens/Admin/Warehousepersons';
import Servicepersons from './Screens/Admin/Servicepersons';
import Repirereject from './Screens/Admin/Repirereject';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{title: 'LoginPage', headerShown: false}}
        />

        <Stack.Screen
          name="Navigation"
          component={Navigation}
          options={{title: 'Navigation', headerShown: false}}
        />

        <Stack.Screen
          name="SidebarModal"
          component={SidebarModal}
          options={{title: 'SidebarModal', headerShown: false}}
        />

        <Stack.Screen
          name="AddWareHouse"
          component={AddWareHouse}
          options={{title: 'AddWareHouse', headerShown: false}}
        />

        <Stack.Screen
          name="WarehouseRegistration"
          component={WarehouseRegistration}
          options={{title: 'WarehouseRegistration', headerShown: false}}
        />

        <Stack.Screen
          name="Warehousepersons"
          component={Warehousepersons}
          options={{title: 'Warehousepersons', headerShown: false}}
        />

        <Stack.Screen
          name="Servicepersons"
          component={Servicepersons}
          options={{title: 'Servicepersons', headerShown: false}}
        />

        <Stack.Screen
          name="Repirereject"
          component={Repirereject}
          options={{title: 'Repire&Reject', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
