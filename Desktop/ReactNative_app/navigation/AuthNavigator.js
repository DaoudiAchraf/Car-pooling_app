import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Register" component={Home} />
        <Stack.Screen name="Login" component={Notifications} />
      </Stack.Navigator>
    )
}

export default AuthNavigator
