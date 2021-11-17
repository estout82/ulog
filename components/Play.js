
import React, { useState, useEffect } from 'react';
import styles from '../styles/Grid.module.css';

export default function Play(props) {
    const [animData, setAnimData] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch('/api/anim')
        .then(res => {
            if (res.status != 200)
            {
                console.error(res);
                return;
            }
            
            return res.json();
        })
        .then(json => {
            setAnimData(JSON.parse(json.data));
            setInterval(changePage, 200);
        })
        .catch(res => {
            console.error(res);
        })
    }, [])

    useEffect(() => {
        console.dir('render');
        return () => {
            console.dir('pre render');
        };
    });

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
                                onClick={ () => handleCellClick(index) } 
                                key={ index }
                            >
                                &#128293;
                            </p>
                        )
                    } else {
                        return (
                            <p 
                                className={ styles.cell } 
                                onClick={ () => handleCellClick(index) } 
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