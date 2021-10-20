import styles from './styles.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url:string;
        name:string;
        login: string;
    }
}


export const LoginBox = () => {
    const [] = useState();
    const signInUrl =`https://github.com/login/oauth/authorize?scope=user&client_id=fc0ab1a4cf7ccb0991c2`;

    const signIn = async (githubCode :string)=>{
       const response = await api.post<AuthResponse>('authenticate',{
            code:githubCode,
        })

        const {token, user} = response.data;

        /*token salvar no storage do navegador*/
        localStorage.setItem('@dowhile2021:token', token);

        // console.log(user);
    }


    useEffect(()=>{
        /*buscar url da app*/
        const url = window.location.href;
        /*verificar se inclui code*/
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=');

            /*limpar url usuario*/ /*assim usuario nao ve o code*/
            window.history.pushState({},'',urlWithoutCode);

            signIn(githubCode);
        }
    },[]);


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