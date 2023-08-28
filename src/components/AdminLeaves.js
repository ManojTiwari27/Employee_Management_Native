import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setCount} from '../reduxtoolkit/leavesCountSlice';

const AdminLeaves = () => {
  const [leavesData, setLeavesData] = useState([]);
  const dispatch = useDispatch();
  const leaveCount = useSelector(state => state.leaveCount.count);

  useEffect(() => {
    fetchLeavesData();
    if (leaveCount > 0) {
      dispatch(setCount(0));
    }
  }, [leaveCount]);

  const fetchLeavesData = async () => {
    try {
      const response = await axios.get('http://192.168.1.61:5001/leaves');
      setLeavesData(response.data);
    } catch (error) {
      console.error('Error fetching leaves data:', error);
    }
  };

  const handleAccept = async id => {
    try {
      const response = await axios.put(
        `http://192.168.1.61:5001/leaves/${id}`,
        {status: 'accepted'},
      );
      if (response.data.success) {
        setLeavesData(prevLeaves =>
          prevLeaves.map(leave =>
            leave._id === id ? {...leave, status: 'accept'} : leave,
          ),
        );
      }
    } catch (error) {
      console.error('Error accepting leave:', error);
    }
  };

  const handleReject = async id => {
    try {
      const response = await axios.put(
        `http://192.168.1.61:5001/leaves/${id}`,
        {status: 'rejected'},
      );
      if (response.data.success) {
        setLeavesData(prevLeaves =>
          prevLeaves.map(leave =>
            leave._id === id ? {...leave, status: 'reject'} : leave,
          ),
        );
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {leavesData.length <= 0 ? (
          <Text>No one Has Requsted for leave</Text>
        ) : (
          leavesData.map(leave => (
            <View key={leave._id} style={styles.card}>
              <Text style={{color: '#000'}}>Name: {leave.name}</Text>
              <Text style={{color: '#000'}}>Days: {leave.days}</Text>
              <Text style={{color: '#000'}}>Reason: {leave.reason}</Text>
              <Text style={{color: '#000'}}>Status: {leave.status}</Text>
              {leave.status === 'pending' && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.acceptButton]}
                    onPress={() => handleAccept(leave._id)}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.rejectButton]}
                    onPress={() => handleReject(leave._id)}>
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: 'green',
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: 'red',
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminLeaves;
