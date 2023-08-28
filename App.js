import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './src/components/HomeTabs';
import Login from './src/components/Login';
import UpdateEmployee from './src/components/UpdateEmployee';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import UserInfo from './src/components/UserInfo';
import ProjectEmployees from './src/components/ProjectEmployees';
import EmployeeLeaveApplication from './src/components/EmployeeLeaveApplication';

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'lightgrey',
            },
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UpdateEmployee"
            component={UpdateEmployee}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UserInfo"
            component={UserInfo}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProjectEmployees"
            component={ProjectEmployees}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EmployeeLeaveApplication"
            component={EmployeeLeaveApplication}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
