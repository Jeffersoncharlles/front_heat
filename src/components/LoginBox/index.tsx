import styles from './styles.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';


export const LoginBox = () => {
    const {signInUrl, user} = useContext(AuthContext);
    const [] = useState();
    
    //console.log(user);

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>

            <a href={signInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted size={24} />
                Entrar com Github
            </a>

        </div>
    )
}