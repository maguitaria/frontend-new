// external imports
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// internal imports
import { UserPosts } from '../pages/profile/UserPosts';

export function UserNav({appUserId, userId}: any) {
    const ProfileTab = createMaterialTopTabNavigator();

    return (
        <ProfileTab.Navigator initialRouteName="Posts">
            <ProfileTab.Screen name="Posts" component={UserPosts} initialParams={{appUserId: appUserId, userId: userId}} />
        </ProfileTab.Navigator>
    )
}