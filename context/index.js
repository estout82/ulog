
import React from 'react';
import AuthProvider, { AuthContext } from "./auth";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            { children }
        </AuthProvider>
    )
}

export const Auth = AuthContext;

export default Providers;