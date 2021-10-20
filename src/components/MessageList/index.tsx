import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg'
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

type Message = {
    id: string;
    text: string;
    user: {
        name:string;
        avatar_url:string;
    }
}

export const MessageList = () => {
    const [messages,setMessages] = useState<Message[]>([]);

    useEffect(()=>{
        api.get<Message[]>('messages/last3').then(res =>{
            setMessages(res.data);
        })
    },[]);


    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021"  />

            <ul className={styles.messageList}>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/jeffersoncharlles.png" alt="Jefferson Charlles"  />
                        </div>
                        <span>Jefferson Charlles</span>
                    </div>
                </li>

            </ul>

        </div>
    )
}