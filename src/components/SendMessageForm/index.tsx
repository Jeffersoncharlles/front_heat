import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import styles from './styles.module.scss';

export const SendMessageForm = () => {
    const {user, signOut} = useContext(AuthContext);
    const [message, setMessage] = useState('');

    const handleSendMessage = async (event: FormEvent)=>{

        event.preventDefault();
        /*nao enviar usuario para nenhuma action*/

        if (!message.trim()) {
            return;
            /*se o texto tiver vazio mesmo 
            removendo o espaco nao fazer nada*/
        }

        await api.post('messages', {message});
        /*o token ja ta no navegador*/

        setMessage('');
        /*limpar o campo*/
    }
    

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size={32} />

            </button>

            <header className={styles.userInformation}>

                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>

                <strong className={styles.userName}>{user?.name}</strong>

                <span className={styles.userGithub}>
                    <VscGithubInverted  size={16}/>
                    {user?.login}
                </span>

            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                
                <textarea 
                    onChange={e=>setMessage(e.target.value)}/*pegando valor digitado e colocando no setMessage*/
                    name='message'
                    id='message'
                    placeholder='Qual sua expectativa para o evento?'
                    value={message}
                />

                <button type='submit'>Enviar mensagem</button>
            </form>

        </div>
    )
}