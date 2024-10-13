import { useUser } from '../contextAPI/UserContextLogin';
import './style.css';
import { useState } from 'react';
import ChatWeb from '../chat/chat';

export default function Login() {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [isLogged, setIsLogged] = useState(false)

  const loginClick = (event) => {
    event.preventDefault(); 
    if (username) {
      login(username); 
      setIsLogged(true)      
    }
  };


  return (
    <>
    {isLogged ? (
      <ChatWeb />
    ) : (
      <section className="login">
      <h2>Login</h2>
      <form className="login__form" onSubmit={loginClick}>
        <input
          type="text"
          className="login__input"
          placeholder="Seu nome"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <button type="submit" className="login__button">
          Entrar
        </button>
      </form>
    </section>
    )}
    </>
    
    
  );
}
