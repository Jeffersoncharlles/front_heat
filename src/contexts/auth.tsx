import { createContext, ReactNode } from "react";

const AuthContext = createContext(null)


/*react node e qualquer coisa aceitavel pelo react tudo*/
type AuthProvider = {
    children: ReactNode
}


const AuthProvider = (props: AuthProvider)=>{
    return (
        <AuthContext.Provider value={null}>
            {props.children}
        </AuthContext.Provider>

    );
}

export { AuthProvider}