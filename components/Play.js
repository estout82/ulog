
import React, { useState, useEffect } from 'react';
import styles from '../styles/Play.module.css';

export default function Play({ slug }) {
    const [animData, setAnimData] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3000/api/animations/${slug}/frames`)
        .then(res => {
            return res.json();
        })
        .then(json => {
            let newAnimData = {};

            json.data.forEach((elem) => {
                let parsed = JSON.parse(elem.data)
                newAnimData[elem.position] = parsed;
            });

            setAnimData(newAnimData);
            setInterval(changePage, 200);
        })
        .catch(res => {
            console.error(res);
        })
    }, []);

    function changePage() {
        setPage(current => {
            if (current == 5)
                return 1;
            else
                return current + 1;
        })
    }

    return (
        <div className={ styles.container }>
            {
                animData[1] ? animData[page].map((cell, index) => {
                    if (cell == 0) {
                        return (
                            <p 
                                className={ styles.cell } 
                                key={ index }
                            >
                                &#128293;
                            </p>
                        )
                    } else {
                        return (
                            <p 
                                className={ styles.cell }
                                key={ index }
                            >
                                
                            </p>
                        )
                    }
                }) :
                <p>Error</p>
            }
        </div>
    )
}