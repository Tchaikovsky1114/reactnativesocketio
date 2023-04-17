import io from 'socket.io-client';
import React from 'react'
import { createContext,useEffect,useState } from 'react';
export const socket = io('http://192.168.50.64:9000');
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [namespaces,setNamespaces] = useState([]);
  const [namespacesSockets,setNamespaceSockets] = useState([]);

  useEffect(() => {
    socket.on('nsList',(nsData) => {
      setNamespaces(nsData);
      nsData.forEach((ns) => {
        if(!namespacesSockets[ns.id]){
          setNamespaceSockets((prev) => [...prev,io(`http://192.168.50.64:9000${ns.endpoint}`)])
        }
      })
    });
  },[])
  const value = [namespaces,namespacesSockets]
  
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export default SocketProvider