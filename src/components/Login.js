import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native'
import axios from 'axios'
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  { setisAdmin } from '../reduxtoolkit/isadminSlice';

const Login = (props) => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [warning, setWarning] = useState('')
    const [rememberme, setRememberMe] = useState(false);

    useEffect(() => {
        keepData()
    }, [])

    const keepData = async () => {
        let username = await AsyncStorage.getItem('username')
        let passWord = await AsyncStorage.getItem('password')

        if (username && passWord) {
            setUserName(username)
            setPassword(passWord)
            setRememberMe(true)
        }

    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.1.93:5001/login', {
                email: userName,
                password: password,
            });
            console.log(response.data.matchingEmployees)
            if (response.data.success) {
                if (rememberme) {
                    await AsyncStorage.setItem('username', userName)
                    await AsyncStorage.setItem('password', password)
                } else {
                    await AsyncStorage.removeItem('username')
                    await AsyncStorage.removeItem('password')
                }

                if (response.data.isAdmin) {
                    props.navigation.navigate('HomeTabs');
                    setUserName('')
                    setPassword('')
                    keepData()
                    dispatch(setisAdmin(true))
                } else {
                    props.navigation.navigate('UserInfo', { employeeData: response.data.employeeData, matchingEmployees: response.data.matchingEmployees });
                    setUserName('')
                    setPassword('')
                    keepData()
                }
            } else {
                setWarning(response.data.message);
            }
        } catch (error) {
            console.log(error);
            setWarning('Error logging in');
        }
    };


    setTimeout(() => {
        setWarning('')
    }, 2000)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.heading}>Login Here</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter your username'
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter your password'
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                {warning ? <Text style={{ margin: 5, color: 'red' }}>{warning}</Text> : null}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        status={rememberme ? 'checked' : 'unchecked'}
                        onPress={() => setRememberMe(!rememberme)}
                    />
                    {console.log(rememberme)}
                    <Text style={styles.checkboxText}>Remember Me</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: windowWidth * 0.05,
        justifyContent: 'center',
        minHeight: windowHeight,
    },
    heading: {
        fontSize: windowWidth * 0.08,
        fontWeight: 'bold',
        marginBottom: windowWidth * 0.05,
        textAlign: 'center',
        color: '#333',
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: windowWidth * 0.05,
        padding: windowWidth * 0.05,
    },
    input: {
        marginVertical: windowWidth * 0.03,
        padding: windowWidth * 0.03,
        borderWidth: 1,
        borderRadius: windowWidth * 0.04,
        borderColor: '#ccc',
    },
    loginButton: {
        backgroundColor: 'red',
        borderRadius: windowWidth * 0.04,
        padding: windowWidth * 0.04,
        marginTop: windowWidth * 0.05,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: windowWidth * 0.04,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkboxText: {
        marginLeft: 10,
    },
})

export default Login
