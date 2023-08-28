import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {increment} from '../reduxtoolkit/leavesCountSlice';

const EmployeeLeaveApplication = props => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');
  const [days, setDays] = useState('');
  const [leavesData, setLeavesData] = useState([]);
  const {employeeData} = props.route.params;
  const employeeId = employeeData._id;

  useEffect(() => {
    fetchLeavesData();
  }, []);

  const fetchLeavesData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.61:5001/leaves/${employeeId}`,
      );
      setLeavesData(response.data);
    } catch (error) {
      console.error('Error fetching leaves data:', error);
    }
  };

  const handleSubmit = async () => {
    if (!reason || !days) {
      Alert.alert('Please fill all feilds');
      return;
    }
    const response = await axios.post('http://192.168.1.61:5001/leaves', {
      employeeId: employeeData._id,
      name: employeeData.name,
      reason,
      days,
    });
    if (response.data.success) {
      setReason('');
      setDays('');
      fetchLeavesData();
      dispatch(increment());
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter leave Reason"
        onChangeText={text => setReason(text)}
        value={reason}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="How many Days you want a Leave?"
        onChangeText={text => setDays(text)}
        value={days}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={{color: '#fff'}}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        {leavesData.length > 0 ? (
          <Text style={styles.heading}>Your Leave Application Status</Text>
        ) : null}
        {leavesData.map((leave, index) => (
          <View style={styles.leaveCard} key={index}>
            <Text style={styles.cardText}>Name: {leave.name}</Text>
            <Text style={styles.cardText}>Reason: {leave.reason}</Text>
            <Text style={styles.cardText}>Status: {leave.status}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  leaveCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
});
export default EmployeeLeaveApplication;
