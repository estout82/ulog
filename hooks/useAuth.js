
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function useAuth() {
    const auth = useContext(AuthContext);

    const isLoggedIn = () => {
        return auth.token != null;
    }

    const login = (secret, slug) => {
        return new Promise((resolve, reject) => {
            console.log(secret, ' ', slug);

            fetch(`http://localhost:3000/api/animations/${slug}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    secret: secret
                })
            })
            .then(res => {
                return res.json();
            })
            .then(json => {
                auth.token = json.token;
                resolve(true);
            })
            .catch(res => {
                reject(false);
            });
        });
    }

    const getToken = () => {
        return auth.token
    }

    return [
        isLoggedIn(),
        login,
        getToken
    ]
}