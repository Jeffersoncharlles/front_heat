import { createContext, ReactNode,useEffect, useState } from "react";
import { api } from "../services/api";


type User = {
    id: string;
    name: string;
    login: string;
    avatar_url:string;
}

/*usuario ou e do tipo user ou null*/
/*se nao tiver logado vai ta null*/
type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: ()=> void;
}

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url:string;
        name:string;
        login: string;
    }
}

const AuthContext = createContext({} as AuthContextData);


/*react node e qualquer coisa aceitavel pelo react tudo*/
type AuthProvider = {
    children: ReactNode
}


const AuthProvider = (props: AuthProvider)=>{
    /*se eu tiver logado user se nao null <User | null>*/
    const [user, setUser] = useState<User | null>(null);

    const signInUrl =`https://github.com/login/oauth/authorize?scope=user&client_id=fc0ab1a4cf7ccb0991c2`;

    const signIn = async (githubCode :string)=>{
       const response = await api.post<AuthResponse>('authenticate',{
            code:githubCode,
        })

        const {token, user} = response.data;

        /*token salvar no storage do navegador*/
        localStorage.setItem('@dowhile2021:token', token);

        // console.log(user);
        setUser(user);
    }

    const signOut = async ()=>{
        setUser(null)
        localStorage.removeItem('@dowhile2021:token');

    }

    const getProfile =async ()=>{
       await api.get<User>('profile').then(res =>{
            //console.log(res.data);
            setUser(res.data);
        })
    }

    useEffect(()=>{
        const token = localStorage.getItem('@dowhile2021:token');
        
        if (token) {
            /*mandar token no headers*/
            api.defaults.headers.common.authorization = `Bearer ${token}`;
            getProfile();       
        }
    },[]);


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
        <AuthContext.Provider value={ { signInUrl,  user, signOut} }>
            {props.children}
        </AuthContext.Provider>

    );
}

export { AuthProvider, AuthContext} ;