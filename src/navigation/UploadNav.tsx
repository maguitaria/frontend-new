// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UploadPage } from "../pages/upload/UploadPage";

// internal imports

export function UploadNav({route} : any) {
	const appUserId: string = route.params.appUserId;
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator initialRouteName="Upload Home Screen">
            <Stack.Screen 
                name='Upload Home Screen' 
                component={UploadPage} 
                initialParams={{appUserId: appUserId}} 
                options={{
                   headerShown: false
                }} 
            />
        </Stack.Navigator>
    )
}