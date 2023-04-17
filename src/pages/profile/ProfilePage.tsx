// external imports
import React, { useState, useEffect, Fragment } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

// internal imports
import { UserNav } from '../../navigation/UserNav';
import { UserInfo } from './UserInfo';

export function ProfilePage({route, navigation}: any) {
    const userId: string = route.params.userId;
    const appUserId: string = route.params.appUserId;
    
	return (
        <View style={styles.scroll}>
            <UserInfo appUserId={appUserId} userId={userId} route={route} navigation={navigation} />
            <UserNav appUserId={appUserId} userId={userId} navigation={navigation} />
        </View>
	);
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
        flex: 1
    },
    wrapBox: {
        justifyContent: 'flex-start'
    }
});