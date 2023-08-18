import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Alert, FlatList, Dimensions, Modal } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../reduxtoolkit/projectSlice';

const Projects = () => {
    const dispatch = useDispatch();
    const [addproject, setAddProject] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = useSelector(state => state.project.projects);
    const employees = useSelector(state => state.employee.employees);

    useEffect(() => {
        fetchProjects();
    }, []);

    const handlePress = async () => {
        const addprojects = {
            name: addproject,
        };

        try {
            const response = await axios.post('http://192.168.1.93:5001/projects', addprojects)
            if (response.data.success) {
                setAddProject('')
            }
        } catch (err) {
            console.log(err)
            Alert.alert('Error', 'An error occurred while adding the project');
        }

    }

    const fetchProjects = async () => {
        const response = await axios.get('http://192.168.1.93:5001/projects');
        dispatch(setProjects(response.data));
    };

    const openModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Project</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Project Name'
                    value={addproject}
                    onChangeText={(text) => setAddProject(text)}
                />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.addButton} onPress={handlePress}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {projects ? <FlatList
                data={projects}
                renderItem={({ item }) => (
                    <View style={styles.projectContainer}>
                        <Text key={item.id} style={styles.projectText}>{item.name}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => openModal(item)}>
                            <Text style={styles.buttonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                )}
            /> : <Text>Hang on Loading Data....</Text>}
            {showModal && selectedProject && (
                <Modal transparent={true} animationType="slide">
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalWrapperInner}>
                            <Text>{selectedProject.name}</Text>
                            <Text>Employees:</Text>
                            {employees
                                .filter((emp) => emp.project === selectedProject.name)
                                .map((emp) => (
                                    <Text key={emp.id}>{emp.name}</Text>
                                ))}
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={styles.addButton} onPress={closeModal}>
                                    <Text style={styles.buttonText}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: windowWidth * 0.05,

    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: windowWidth * 0.05,
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
        borderColor: '#ccc',
    },
    addButton: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 6,
        marginTop: 20,
        alignItems: 'center',
        width: '60%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    projectContainer: {
        backgroundColor: '#fff',
        marginVertical: 10,
        borderRadius: 10,
        padding: windowWidth * 0.05,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center'
    },
    projectText: {
        padding: windowWidth * 0.01,
        borderRadius: 8,
        color: '#000'
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalWrapperInner: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 40
    }
});

export default Projects;










// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Alert, FlatList, Dimensions, Modal } from 'react-native';
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux';
// import { setProjects } from '../reduxtoolkit/projectSlice';

// const Projects = () => {
//     const dispatch = useDispatch();
//     const [addproject, setAddProject] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const projects = useSelector(state => state.project.projects)

//     useEffect(() => {
//         fetchProjects();
//     }, [])

//     const fetchProjects = async () => {
//         const response = await axios.get('http://192.168.1.93:5001/getprojects')
//         dispatch(setProjects(response.data));
//     }

//     const handlePress = async () => {
//         const addprojects = {
//             name: addproject,
//         };

//         try {
//             const response = await axios.post('http://192.168.1.93:5001/addproject', addprojects)
//             if (response.data.success) {
//                 setAddProject('')
//             }
//         } catch (err) {
//             console.log(err)
//             Alert.alert('Error', 'An error occurred while adding the project');
//         }

//     }

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.heading}>Add Project</Text>
//             <View style={styles.inputContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Enter Project Name'
//                     value={addproject}
//                     onChangeText={(text) => setAddProject(text)}
//                 />
//             </View>
//             <TouchableOpacity style={styles.addButton} onPress={handlePress}>
//                 <Text style={styles.buttonText}>Add</Text>
//             </TouchableOpacity>
//             <FlatList
//                 data={projects}
//                 renderItem={({ item }) => (
//                     <View style={styles.projectContainer}>
//                         <Text style={styles.projectText}>{item.name}</Text>
//                         <TouchableOpacity style={styles.addButton} onPress={() => (setShowModal(true))}>
//                             <Text style={styles.buttonText}>View</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             />
//             {showModal && <Modal transparent={true}>
//                 <View style={styles.modalWrapper}>
//                     <View style={styles.modalWrapperInner}>
//                         <Text>Hellow</Text>
//                         <TouchableOpacity style={styles.addButton} onPress={() => (setShowModal(false))}>
//                             <Text style={styles.buttonText}>Close</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>}
//         </ScrollView>
//     );
// };

// const windowWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0',
//         padding: windowWidth * 0.05,
//     },
//     heading: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: windowWidth * 0.05,
//         textAlign: 'center',
//         color: '#333',
//     },
//     inputContainer: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: windowWidth * 0.05,
//         width: '100%',
//         maxWidth: 400,
//     },
//     input: {
//         marginVertical: windowWidth * 0.04,
//         padding: windowWidth * 0.04,
//         borderWidth: 1,
//         borderRadius: 8,
//         borderColor: '#ccc',
//     },
//     addButton: {
//         backgroundColor: 'red',
//         borderRadius: 8,
//         padding: 12,
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     projectContainer: {
//         backgroundColor: '#fff',
//         marginVertical: 10,
//         borderRadius: 10,
//         padding: windowWidth * 0.05,
//         width: '100%',
//         maxWidth: 400,
//     },
//     projectText: {
//         marginVertical: windowWidth * 0.02,
//         padding: windowWidth * 0.02,
//         borderRadius: 8,
//     },
//     modalWrapper: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     modalWrapperInner: {
//         backgroundColor: 'white',
//         borderRadius:20,
//         padding: 80
//     }
// });

// export default Projects;
