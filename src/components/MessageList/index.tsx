import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { api } from '../../services/api';

type Message = {
    id: string;
    text: string;
    user: {
        name:string;
        avatar_url:string;
    }
}

const messagesQueue: Message[] = [];

const socket = io('http://localhost:4000');



socket.on('new_message', (newMessage: Message) =>{
    messagesQueue.push(newMessage);
})

export const MessageList = () => {
    const [messages,setMessages] = useState<Message[]>([]);

    useEffect(()=>{
        const timer = setInterval(()=>{
            /*verificar se o tamanho da fica e > 0*/
            if (messagesQueue.length > 0) {
                /*messagesQueue[0] mais antiga*/
                setMessages([
                    messagesQueue[0],
                    messages[0],
                    messages[1],
                ].filter(Boolean))
                /*filter boolean vai remover valores falses null vazio etc...*/
            }
        },3000);
        /*vai ficar verificando a cada 3 segundos*/
    },[]);

    useEffect(()=>{
        api.get<Message[]>('messages/last3').then(res =>{
            setMessages(res.data);
        })
    },[]);


    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021"  />

            <ul className={styles.messageList}>
                { messages.map(message =>{
                    return (

                        <li key={message.id} className={styles.message}>
                            <p className={styles.messageContent}>{message.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={message.user.avatar_url} alt={message.user.name}  />
                                </div>
                                <span>{message.user.name}</span>
                            </div>
                        </li>

                    );

                })}

            </ul>
        </div>
    )
}