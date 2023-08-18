import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../reduxtoolkit/employeeSlice';


const UpdateEmployee = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [leaves, setLeaves] = useState(0);
    const [department, setDepartment] = useState('');
    const { employeeId } = props.route.params

    
    const handlePress = async () => {
        try {
            const updatedEmployee = {
                _id: employeeId,
                name: name,
                email: email,
                password: password,
                department:department,
                leaves: leaves,
                project: selectedProject,
            };
            const response = await axios.put(`http://192.168.1.93:5001/employees/${employeeId}`, updatedEmployee);
            if (response.data.success) {
                Alert.alert("Data Updated Succesfully")
                // console.log("Values Updated Successfully");
                dispatch(updateEmployee(updatedEmployee));
            } else {
                console.log("Failed to update values");
            }
        } catch (error) {
            console.error("Error updating values:", error);
        }
    };

    useEffect(() => {
        fetchEmployee()
    }, [])

    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`http://192.168.1.93:5001/employees/${employeeId}`)
            const employeeData = response.data.employeeData
            setName(employeeData.name)
            setEmail(employeeData.email)
            setPassword(employeeData.password)
            setSelectedProject(employeeData.project)
            setDepartment(employeeData.department)
            setLeaves(employeeData.leaves.toString())
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Update Employee</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Name of Employee'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter Mail of Employee'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder='Enter Password of Employee'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter Employee Department'
                    value={department}
                    onChangeText={(text) => setDepartment(text)}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Enter number of leaves remaining'
                    value={leaves}
                    onChangeText={(text) => setLeaves(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter Name of Project'
                    value={selectedProject}
                    onChangeText={(text) => setSelectedProject(text)}
                />

                <TouchableOpacity style={styles.addButton} onPress={handlePress}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    input: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
    },
    addButton: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 6,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UpdateEmployee;
