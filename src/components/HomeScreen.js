import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees, deleteEmployee } from '../reduxtoolkit/employeeSlice';

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employee.employees)
    // const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployeesData();
    }, []);

    const fetchEmployeesData = async () => {
        try {
            const response = await axios.get('http://192.168.1.93:5001/employees');
            dispatch(setEmployees(response.data));
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://192.168.1.93:5001/employees/${id}`)
        Alert.alert('Employee Deleted Succesfully')
        dispatch(deleteEmployee(id));
    }

    const renderEmployeeItem = ({ item }) => (
        <View style={styles.employeeContainer}>
            <Text style={styles.employeeName}>Name: {item.name}</Text>
            <Text style={styles.employeeEmail}>Email: {item.email}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={() => props.navigation.navigate('UpdateEmployee', { employeeId: item._id })}>
                    <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.updateButton} onPress={() => (handleDelete(item?._id))}>
                    <Text style={styles.updateButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (

        <SafeAreaView style={styles.container}>
            {employees.length > 0 ? <FlatList
                data={employees}
                renderItem={renderEmployeeItem}
                contentContainerStyle={styles.listContent}
            /> : <Text>Hang on Loading Data....</Text>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
        paddingHorizontal: 15,

    },
    listContent: {
        paddingBottom: 20,
    },
    employeeContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
        alignItems: 'center'
    },
    employeeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    employeeEmail: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    updateButton: {
        width: '33%',
        backgroundColor: 'red',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginTop: 10,
        margin: 5
    },
    updateButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
