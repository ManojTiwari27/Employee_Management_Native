import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserInfo = props => {
  const {employeeData} = props.route.params;
  const {matchingEmployees} = props.route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              props.navigation.navigate('EmployeeLeaveApplication', {
                employeeData: employeeData,
              })
            }>
            <Text style={styles.buttonText}>Leaves</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.heading}>Your Info</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'black',
              width: '70%',
              marginBottom: 10,
            }}
          />
          <Text style={styles.userText}>Name: {employeeData.name}</Text>
          <Text style={styles.userText}>Email: {employeeData.email}</Text>
          <Text style={styles.userText}>Project: {employeeData.project}</Text>
          <Text style={styles.userText}>Password: {employeeData.password}</Text>
          <Text style={styles.userText}>
            Department: {employeeData.department}
          </Text>
          <Text style={styles.userText}>
            Leaves remaining: {employeeData.leaves}
          </Text>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() =>
              props.navigation.navigate('UpdateEmployee', {
                employeeId: employeeData._id,
              })
            }>
            <Ionicons name="md-create" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.matchingEmployeeWrapper}>
          <Text
            style={{
              margin: 10,
              fontSize: 20,
              color: 'black',
            }}>
            Your Team Members
          </Text>
          {matchingEmployees.length > 0 ? (
            matchingEmployees.map((employee, index) => (
              <View style={styles.infoContainer} key={index}>
                <Text style={styles.infoText}>{index + 1}.</Text>
                <View style={styles.infoDetails}>
                  <Text style={styles.name}>{employee.name}</Text>
                  <Text style={styles.email}>{employee.email}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>You are alone working in this Project..</Text>
          )}
        </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  userInfoWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 3,
  },
  userText: {
    fontSize: 15,
    color: '#333',
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  matchingEmployeeWrapper: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fff',

    elevation: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoText: {
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  infoDetails: {
    flex: 1,
    color: 'black',
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  email: {
    color: 'black',
  },
  updateButton: {
    width: '40%',
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginTop: 10,
    margin: 5,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserInfo;
