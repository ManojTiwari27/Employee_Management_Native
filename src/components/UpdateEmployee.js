import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateEmployee} from '../reduxtoolkit/employeeSlice';

const UpdateEmployee = props => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.isadmin.isAdmin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [leaves, setLeaves] = useState(0);
  const [department, setDepartment] = useState('');
  const {employeeId} = props.route.params;

  const handlePress = async () => {
    try {
      const updatedEmployee = {
        _id: employeeId,
        name: name,
        email: email,
        password: password,
        department: department,
        leaves: leaves,
        project: selectedProject,
      };
      const response = await axios.put(
        `http://192.168.1.61:5001/employees/${employeeId}`,
        updatedEmployee,
      );
      if (response.data.success) {
        Alert.alert('Data Updated Succesfully');
        dispatch(updateEmployee(updatedEmployee));
      } else {
        console.log('Failed to update values');
      }
    } catch (error) {
      console.error('Error updating values:', error);
    }
  };

  const handleBack = () => {
    props.navigation.navigate('Home');
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.61:5001/employees/${employeeId}`,
      );
      const employeeData = response.data.employeeData;
      setName(employeeData.name);
      setEmail(employeeData.email);
      setPassword(employeeData.password);
      setSelectedProject(employeeData.project);
      setDepartment(employeeData.department);
      setLeaves(employeeData.leaves.toString());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Update Employee</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name of Employee"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mail of Employee"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Enter Password of Employee"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Department:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Employee Department"
            value={department}
            editable={isAdmin ? true : false}
            onChangeText={text => setDepartment(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Leaves:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter number of leaves remaining"
            value={leaves}
            editable={isAdmin ? true : false}
            onChangeText={text => setLeaves(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Project:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name of Project"
            value={selectedProject}
            editable={isAdmin ? true : false}
            onChangeText={text => setSelectedProject(text)}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        {isAdmin ? (
          <TouchableOpacity style={styles.addButton} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        ) : null}
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
    borderColor: '#000',
    width: '70%',
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
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    width: '30%',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#333',
  },
});

export default UpdateEmployee;
