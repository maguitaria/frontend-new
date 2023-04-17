// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilePage } from "../pages/profile/ProfilePage";
import { SearchPage } from "../pages/search";


// internal imports

export function SearchNav({route} : any) {
	const appUserId: string = route.params.appUserId;
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home Page' 
                component={SearchPage} 
                initialParams={{appUserId: appUserId}} 
                options={{headerShown: false}} 
            />
            <Stack.Screen 
                name='Profile Page' 
                component={ProfilePage} 
                initialParams={{userId: appUserId, appUserId: appUserId}} 
                options={{
                    headerTitle: '', 
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }} 
            />
        </Stack.Navigator>
    )
}