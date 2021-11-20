
import React, { createContext } from 'react';

const DEFAULT_VALUE = {
    token: null
}

export const AuthContext = createContext(DEFAULT_VALUE);

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={ DEFAULT_VALUE }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;