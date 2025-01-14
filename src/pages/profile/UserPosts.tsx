// external imports
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

// internal imports
import { Post } from '../../components/Post';
import { getPictureIdByUserId } from '../../middleware';
import { IPostIds } from '../../interfaces';

export function UserPosts({route, navigation}: any) {
    const userId: string = route.params.userId;
    const appUserId: string = route.params.appUserId;
    const [postIds, setPostIds] = useState<IPostIds>();
	const [refreshing, setRefreshing] = useState(false);

	const ref = React.useRef(null);
	useScrollToTop(ref);
    
    useEffect(() => {
        let mounted = true;
		loadPostIds(mounted);

		return function cleanup() {
			mounted = false;
		}
    }, []);

    function loadPostIds(mounted: boolean) {
        getPictureIdByUserId(userId)
        .then(res => {
            if (mounted) {
                setPostIds(res);
            }
        })
    }

    function renderItem({ item } : any) {
		return (
			<Post appUserId={appUserId} sunsetId={item._id} userId={userId} navigation={navigation} />
		);
	}

    function onRefresh() {
		setRefreshing(true);
		setTimeout(() => {
			loadPostIds(true);
			setRefreshing(false);
		}, 700)
	}

    return (
        <FlatList 
            style={styles.scroll}
            ref={ref}
			data={postIds?.data}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
            refreshing={refreshing}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
		/>
    );
}

const styles = StyleSheet.create({
	container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
	scroll: {
        backgroundColor: '#FFF',
        flex: 5,
        overflow: 'hidden'
    }
});