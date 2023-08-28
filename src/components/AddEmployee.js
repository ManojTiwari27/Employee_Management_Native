import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {setEmployees} from '../reduxtoolkit/employeeSlice';
import {useDispatch, useSelector} from 'react-redux';

const AddEmployee = ({navigation, route}) => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handlePress = async () => {
    if (!name || !email || !password || !department || !selectedProject) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    const employee = {
      name: name,
      email: email,
      password: password,
      project: selectedProject,
      department: department,
    };
    try {
      const response = await axios.post(
        'http://192.168.1.61:5001/employees',
        employee,
      );
      if (response.data.success) {
        // console.log({ ...employee, id: response.data.empId._id })
        dispatch(
          setEmployees([
            ...employees,
            {...employee, _id: response.data.empId._id},
          ]),
        );
        setName('');
        setEmail('');
        setPassword('');
        setSelectedProject('');
        setDepartment('');
      }
    } catch (error) {
      console.error('Axios Error:', error);
      Alert.alert('Error', 'An error occurred while adding the employee');
    }
  };

  useEffect(() => {
    if (route.params && route.params.selectedProject) {
      setSelectedProject(route.params.selectedProject);
    }
  }, [route.params]);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.heading}>Add Employee</Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name of Employee"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Mail of Employee"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter Password of Employee"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Employee Department"
          value={department}
          onChangeText={text => setDepartment(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Name of Project"
          value={selectedProject}
          onChangeText={text => setSelectedProject(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
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
    borderColor: '#000',
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

export default AddEmployee;
