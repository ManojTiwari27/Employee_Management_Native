import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import AddEmployee from './AddEmployee';
import Projects from './Projects';
import {useSelector} from 'react-redux';
import AdminLeaves from './AdminLeaves';

const HomeTabs = props => {
  const isAdmin = useSelector(state => state.isadmin.isAdmin);
  const leaveCount = useSelector(state => state.leaveCount.count);
  const Tab = createBottomTabNavigator();

  const handleLogout = () => {
    props.navigation.navigate('Login');
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#333',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
        tabBarBadge:
          route.name === 'AdminLeaves' && leaveCount > 0 ? leaveCount : null,
        tabBarActiveTintColor: 'lightcoral',
        tabBarInactiveTintColor: 'grey',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleLogout}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: 'EMS',
        }}
      />
      <Tab.Screen
        name="AddEmployee"
        component={AddEmployee}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-add" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleLogout}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
        initialParams={{selectedProject: ''}}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="briefcase" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleLogout}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="AdminLeaves"
        component={AdminLeaves}
        options={{
          tabBarLabel: 'Leaves',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="business-outline" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleLogout}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});

export default HomeTabs;
