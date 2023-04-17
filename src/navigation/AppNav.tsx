// external imports
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

// internal imports

import { UploadNav } from './UploadNav';
import { SearchNav } from './SearchNav';
import { ProfileNav } from './ProfileNav';

export function AppNav({route}: any) {
    const appUserId: string = route.params.appUserId;
	const Tab = createBottomTabNavigator(); 
    
    return (
        <Tab.Navigator initialRouteName='Search'>
                <Tab.Screen
                name='Search'
                component={SearchNav}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <Ionicons name="search-sharp" size={size} />
                    })
                }}
                initialParams={{appUserId: appUserId}}
            />
         
            <Tab.Screen 
                name='Upload' 
                component={UploadNav}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <MaterialIcons name="add-circle" size={size} />
                    })
                }}
                initialParams={{appUserId: appUserId}}
            />
          
            <Tab.Screen 
                name='Profile' 
                component={ProfileNav}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <FontAwesome name="user" size={size} />
                    })
                }}
                initialParams={{appUserId: appUserId}}
            />
        </Tab.Navigator>
    )
}