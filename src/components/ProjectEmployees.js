import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {updateEmployee} from '../reduxtoolkit/employeeSlice';

const ProjectEmployees = props => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees);
  const [selectedProject, setSelectedProject] = useState({});

  useEffect(() => {
    setSelectedProject(props.route.params);
  }, []);

  const handleDeleteEmployee = async emp => {
    try {
      const updatedEmployee = {
        _id: emp._id,
        name: emp.name,
        email: emp.email,
        password: emp.password,
        department: emp.department,
        leaves: emp.leaves,
        project: '',
      };
      const response = await axios.put(
        `http://192.168.1.61:5001/employees/${emp._id}`,
        updatedEmployee,
      );
      if (response.data.success) {
        Alert.alert('Employee deleted from project');
        dispatch(updateEmployee(updatedEmployee));
      } else {
        console.log('Failed to update values');
      }
    } catch (error) {
      console.error('Error updating values:', error);
    }
  };

  return (
    <View>
      <Modal transparent={true} animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalWrapperInner}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>
              {selectedProject?.selectedProject?.name}
            </Text>
            <Text style={{color: '#000'}}>Employees:</Text>
            {employees
              .filter(
                emp => emp.project === selectedProject?.selectedProject?.name,
              )
              .map((emp,idx) => (
                <View style={styles.employeeContainer} key={idx}>
                  <Text style={styles.employeeName}>{emp.name}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleDeleteEmployee(emp)}>
                    <Ionicons name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => props.navigation.navigate('Projects')}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    padding: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapperInner: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 40,
    margin: 20,
    elevation: 3,
  },
  employeeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  employeeName: {
    flexGrow: 1,
    marginRight: 8,
    color: '#000',
  },
});
export default ProjectEmployees;
