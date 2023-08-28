import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setEmployees, deleteEmployee} from '../reduxtoolkit/employeeSlice';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees);
  // const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  const fetchEmployeesData = async () => {
    try {
      const response = await axios.get('http://192.168.1.61:5001/employees');
      dispatch(setEmployees(response.data));
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async id => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this employee?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.1.61:5001/employees/${id}`);
              // Alert.alert('Employee Deleted Successfully');
              dispatch(deleteEmployee(id));
            } catch (error) {
              console.error('Error deleting employee:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderEmployeeItem = ({item}) => (
    <View style={styles.employeeContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.employeeName}>Name: {item.name}</Text>
          <Text style={styles.employeeEmail}>Email: {item.email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() =>
              props.navigation.navigate('UpdateEmployee', {
                employeeId: item._id,
              })
            }>
            <Ionicons name="md-create" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleDelete(item?._id)}>
            <Ionicons name="md-trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {employees.length > 0 ? (
        <FlatList
          data={employees}
          renderItem={renderEmployeeItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text>Hang on Loading Data....</Text>
      )}
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
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  employeeEmail: {
    fontSize: 14,
    color: '#000',
  },

  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  employeeContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  updateButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginHorizontal: 5,
  },
});

export default HomeScreen;
