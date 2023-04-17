import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import io from 'socket.io-client';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import SocketProvider from "./context/SocketProvider";


navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
  return "react-native";
 });

//  const socket = io('http://192.168.50.64:9000')


const Stack = createNativeStackNavigator();


export default function App() {
  
  // useEffect(() => {
  //   socket.on('connect', (socket) => {
  //     console.log('client connected!');
  //   })
  // }, [])

  
  return (
    <RecoilRoot>
      <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SocketProvider>
    </RecoilRoot>
  );
}
