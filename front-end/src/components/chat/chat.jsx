import { useState } from 'react';
import './style.css'
import { useUser } from '../contextAPI/UserContextLogin';


export default function ChatWeb() {

  const { conteudoChat } = useUser();
  const [chat, setChat] = useState('')


    const sendMessage = (event) => {
        event.preventDefault()
          if(chat) {
            conteudoChat(chat)
          }
    }

  return (
    <>
    <section className="chat">
            <div className="chat__messages">
                <div className="message--self">Hello, World!</div>
                <div className="message--other">
                    <span className="message--sender">Manual do Dev</span>
                    Olá, Mundo!
                </div>
            </div>
        </section>
        <form className="chat__form" onSubmit={sendMessage}>
                <input type="text"
                 className="chat__input" 
                 placeholder="Digite uma mensagem" 
                 value={chat}
                 onChange={(event) => setChat(event.target.value)}
                 required />
                <button type="submit" className="chat__button">
                    <span className="material-symbols-outlined">send</span>
                </button>
            </form>
    </>
  );
}
