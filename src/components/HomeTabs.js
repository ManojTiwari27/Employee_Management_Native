import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import HomeScreen from './HomeScreen';
import AddEmployee from './AddEmployee';
import Projects from './Projects';

const HomeTabs = (props) => {
    const Tab = createBottomTabNavigator();

    const handleLogout = () => {
        props.navigation.navigate('Login')
    }

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                headerRight: () => <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}><Text style={{ color: 'white' }}>Logout</Text></TouchableOpacity>, headerShown: true, headerTitle: 'EMS'

            }} />
            <Tab.Screen name='AddEmployee' component={AddEmployee} />
            <Tab.Screen name='Projects' component={Projects} />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10,
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 5,
    }
})

export default HomeTabs
