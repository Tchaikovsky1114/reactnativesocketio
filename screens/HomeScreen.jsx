import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketProvider';

const HomeScreen = () => {
  const [namespaces,namespacesSockets] = useContext(SocketContext);

  
  const navigation = useNavigation();

  
  const joinRoomHandler = async ({roomTitle,namespaceId}) => {
    console.log(roomTitle,namespaceId);
    const ackResp = await namespacesSockets[namespaceId].emitWithAck('joinRoom',{roomTitle,namespaceId});
    

    navigation.navigate('Chat',{
      // namespacesSockets,
      namespaceId,
      roomTitle,
      numUser:ackResp.numUsers,
      history:ackResp.thisRoomHistory
    })
  }
  
  return (
    <ScrollView>
      {
        namespaces.map((item) => (
          <View
            
            key={item.name}
            >
            <Text style={{fontSize:24, fontWeight:'bold'}}>{item.name}</Text>
            <View style={{paddingHorizontal:24,paddingTop:24}}>
            {
              item.rooms.map((room,index) => (
                <TouchableOpacity
                  style={{height:56,}}
                  key={`${room.roomTitle}${index}`}
                  onPress={() => joinRoomHandler({
                    roomTitle : room.roomTitle, 
                    namespaceId : room.namespaceId
                    })
                  }
                  >
                <Text>{room.roomTitle}</Text>
                </TouchableOpacity>
              ))
            }
            </View>
          </View>
        ))
      }
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})