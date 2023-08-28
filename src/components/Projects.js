import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setProjects} from '../reduxtoolkit/projectSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Projects = props => {
  const dispatch = useDispatch();
  const [addproject, setAddProject] = useState('');
  const projects = useSelector(state => state.project.projects);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get('http://192.168.1.61:5001/projects');
    dispatch(setProjects(response.data));
  };

  const handlePress = async () => {
    if (!addproject) {
      Alert.alert('Validation Error', 'Please fill project name');
      return;
    }
    const addprojects = {
      name: addproject,
    };

    try {
      const response = await axios.post(
        'http://192.168.1.61:5001/projects',
        addprojects,
      );
      if (response.data.success) {
        setAddProject('');
        fetchProjects();
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'An error occurred while adding the project');
    }
  };

  const handleDelete = async id => {
    await axios.delete(`http://192.168.1.61:5001/projects/${id}`);
    Alert.alert('Project Deleted Succesfully');
    fetchProjects();
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Add Project</Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Project Name"
          value={addproject}
          onChangeText={text => setAddProject(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.projectContainer}>
        {projects ? (
          <FlatList
            data={projects}
            renderItem={({item}) => (
              <View key={item.id} style={styles.projectContainer}>
                <Text style={styles.projectText}>{item.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      props.navigation.navigate('ProjectEmployees', {
                        selectedProject: item,
                      })
                    }>
                    <Ionicons name="eye-outline" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleDelete(item._id)}>
                    <Ionicons name="trash" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      props.navigation.navigate('AddEmployee', {
                        selectedProject: item.name,
                      })
                    }>
                    <Ionicons name="add" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text>Hang on Loading Data....</Text>
        )}
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.05,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.05,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: windowWidth * 0.05,
    width: '100%',
    maxWidth: 400,
  },
  input: {
    marginVertical: windowWidth * 0.04,
    padding: windowWidth * 0.04,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
  },
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
  projectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    padding: windowWidth * 0.03,
    width: '100%',
    maxWidth: 400,
  },
  projectText: {
    padding: windowWidth * 0.01,
    borderRadius: 8,
    color: '#000',
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

export default Projects;
