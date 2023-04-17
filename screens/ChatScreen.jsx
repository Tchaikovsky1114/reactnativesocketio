import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketProvider';

const socket = io('http://192.168.50.64:9000');

const ChatScreen = () => {
  const navigation = useNavigation()
  const {params:{namespaceId,roomTitle,history,numUser}} = useRoute();
  const [roomInfo,setRoomInfo] = useState({roomTitle: '',numUser:0,history:[]})
  const [newMessage,setNewMessage] = useState('');
  const namespacesSockets = useContext(SocketContext);

  useEffect(() => {
    setRoomInfo({
      roomTitle,
      numUser,
      history,
    })

    navigation.setOptions({
      headerTitle: `${roomTitle} ${numUser} `,
    })
  },[roomTitle])

  
  const sendMessageHandler = () => {
    namespacesSockets[namespaceId].emit('newMessageToRoom',{
      newMessage,
      date: Date.now(),
      avatar: 'https://via.placeholder.com/30',
      userName:'Test',
      selectedNsId: namespaceId
    })
  }

  console.log(namespacesSockets);
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})