import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ id: '', name: '', color: '' });
  const [content, setContent] = useState({ content: '' });
  const [ws, setWs] = useState(null); 

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.onmessage = processMessage;
    
    setWs(socket); 

    return () => {
      // Limpeza ao desmontar o componente
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []); 

  const login = (username) => {
    const newUser = {
      id: crypto.randomUUID(),
      name: username,
      color: getRandomColor(),
    };
    setUser(newUser);
  }

  const getRandomColor = () => {
    const colors = [
      "cadetblue",
      "darkgoldenrod",
      "cornflowerblue",
      "darkkhaki",
      "hotpink",
      "gold",
    ];
    const randomColor = Math.floor(Math.random() * colors.length);
    return colors[randomColor];
  };

  const processMessage = ({ data }) => {
    console.log(data);
  }

  const conteudoChat = (chat) => {
    const contentChat = {
      content: chat
    };
    
    setContent(contentChat);

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(contentChat.content)); 
    } else {
      console.error("WebSocket não está conectado");
    }
  }

  return (
    <UserContext.Provider value={{ user, login, conteudoChat, content }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);
