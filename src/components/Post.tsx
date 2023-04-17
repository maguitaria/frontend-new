// external imports
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useToast, Modal, VStack, HStack, Button } from 'native-base';

// internal imports

import { IPicture } from '../interfaces';
import { deletePicture, getPictureById, getUserName, updatePictureCaption } from '../middleware';

export function Post({appUserId, pictureId, navigation}: any) {
    const [picture, setPicture] = useState<IPicture>();
    const [pictureCaption, setPictureCaption] = useState<string>('');
    const [timeElapsed, setTimeElapsed] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [showOptionsModal, setShowOptionsModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    function handleEditButton() {
        updatePictureCaption(pictureId, pictureCaption)
        .then(res => {
            setPicture(prev => {
                if (!prev) {
                    return picture;
                }
                prev.data.description = pictureCaption;
                return prev;
            })
        }).catch(err => {

        });
        
        setShowOptionsModal(false);
        setShowEditModal(false);
    }

    function handleDeleteButton() {
        deletePicture(pictureId)
        .then(res => {
        
        }).catch(err => {

        });

        setShowOptionsModal(false);
        setShowDeleteModal(false);
    }

    useEffect(() => {
        let mounted: boolean = true;
        
		getPictureById(pictureId)
        .then(res => {
            if (mounted) {
                setPicture(res);
                setPictureCaption(res.data.description);
                setLoaded(true);
            }

            getUserName(res.data.userId)
            .then(res => {
                if (mounted) {
                    setUsername(res.data.username);
                }
            })
        })


		return function cleanup() {
			mounted = false;
		}
    }, []);

    return (
        <View style={styles.post}>
            <View style={styles.postHeader}>
                <UserTag userId={picture?.data.userId} username={username} navigation={navigation} />
                <TouchableOpacity style={styles.postInfoButton} onPress={() => setShowOptionsModal(true)}>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.postImage}>
            {
                (loaded) ?
                <Image style={styles.image} source={{uri: picture?.data.pictureImage}}/>
                :
                <AsyncLoad />
            }

            </View>
            <View style={styles.postContent}>
                <Text style={styles.caption}>{picture?.data.description}</Text>
                <Text style={styles.date}>{timeElapsed}</Text>
            </View>

            <Modal isOpen={showOptionsModal} onClose={() => setShowOptionsModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Header>Options</Modal.Header>
                    
                    {
                        (appUserId == picture?.data.userId)?
                        <Modal.Body>
                            <VStack space={3}>
                                <Button style={{backgroundColor: 'lightblue'}} flex="1" onPress={() => setShowEditModal(true)}>
                                    Edit caption
                                </Button>
                                <Button style={{backgroundColor: 'red'}} flex="1" onPress={() => setShowDeleteModal(true)}>
                                    Delete post
                                </Button>
                            </VStack>
                        </Modal.Body>
                        :
                        <Modal.Body></Modal.Body>
                    }
                        
                </Modal.Content>
            </Modal>

            <Modal isOpen={showEditModal} size="lg" onClose={() => {
                setShowEditModal(false);
                if (picture) {
                    setPictureCaption(picture.data.description);
                }
            }}>
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Header>Edit Caption</Modal.Header>
                    
                    <Modal.Body>
                        <VStack space={3} style={styles.editCaption}>
                            <TextInput
                                style={styles.TextInput}
                                value={pictureCaption}
                                maxLength={50}
                                onChangeText={(caption) => setPictureCaption(caption)}
                            />
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{backgroundColor: 'green'}} flex="1" onPress={handleEditButton}>
                            Update caption
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Header>Delete Post</Modal.Header>
                    <Modal.Body>
                        <VStack space={3}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text>Are you sure you want to delete your post?</Text>
                            </HStack>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{backgroundColor: 'red'}} flex="1" onPress={handleDeleteButton}>
                            Delete post
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        justifyContent: 'center',
        paddingBottom: 15,
        // borderBottomWidth: 0.25,
        // borderBottomColor: 'grey'
    },
    postImage: {
        alignItems: 'center'
    },
    postAvatar: {
        marginRight: 16
    },
    image: {
        width: '100%',
        height: 300
    },
    postHeader: {
        justifyContent: 'center',
    },
    postContent: {
        paddingTop: 10,
        // paddingBottom: 10
    },
    postInfoButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
        paddingRight: 10,
        position: 'absolute'
    },
    caption: {
        paddingLeft: 10
    },
    date: {
        paddingTop: 5,
        fontStyle: 'italic',
        color: 'gray',
        paddingLeft: 10
    },
    TextInput: {
        height: 50,
        flex: 1,
        width: "100%",
        marginLeft: 20,
        marginRight: 20,
        fontStyle: 'italic'
    },
    editCaption: {
        backgroundColor: 'lightgrey'
    }
});