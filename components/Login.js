

import React, { useRef, useContext } from 'react'
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';
import styles from '../styles/Login.module.css'
import useAuth from '../hooks/useAuth';

export default function Index({ returnUrl, slug, onLogin }) {
    const element = useRef(null);
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [isLoggedIn, login] = useAuth();

    function handleSubmit() {
        const secret = element.current.value;

        login(secret, slug)
        .then(() => {
            router.push(returnUrl);

            if (onLogin)
                onLogin();
        })
        .catch(() => {
            alert('incorrect secret')
        })
    }

    return (
        <div className={ styles.container }>
            <h1 className={ styles.title }>Login</h1>
            <div className={ styles.form }>
                <div className={ styles.control }>
                    <input ref={ element }></input>
                </div>
                <button onClick={ handleSubmit }>Submit</button>
            </div>
        </div>
    )
}
