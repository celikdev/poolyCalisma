import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Home, User, UserRouteSelect, SelectPage} from './screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="UserRouteSelect" component={UserRouteSelect} />
        <Stack.Screen name="SelectPage" component={SelectPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
