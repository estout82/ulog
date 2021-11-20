
import React, { useRef, useState, useContext } from 'react'
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';

export default function Index() {
    const [isValid, setIsValid] = useState();
    const element = useRef(null);
    const authContext = useContext(AuthContext);
    const router = useRouter();

    function handleSubmit() {
        const secret = element.current.value;

        if (secret) {
            fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    creds: secret
                })
            })
            .then(res => {
                if (res.status == 200) {
                    return res.json();
                } else if (res.status == 401) {
                    alert('incorrect secret')
                }
            })
            .then(json => {
                const token = json.token;
                authContext.token = token;

                router.push('/admin');
            })
            .catch(res => {
                alert('server error');
            })
        } else {
            alert('incorrect secret')
        }
    }

    return (
        <div>
            <h3>Login</h3>
            <div>
                <span>Secret: </span>
                <input ref={ element }></input>
            </div>
            <div>
                <button onClick={ handleSubmit }>Submit</button>
            </div>
        </div>
    )
}
