
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/new/Index.module.css'

export default function New() {
    const [animations, setAnimations] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/animations/`)
        .then(res => {
            return res.json();
        })
        .then(json => {
            setAnimations(json);
        })
        .catch(res => {
            console.error(res);
        })
    }, [])

    return (
        <>
            <h1 className={ styles.title }>Console Ulog</h1>
            <p className={ styles.subtitle }>Select a Ulog to get started</p>

            <div className={ styles.container }>
                {
                    animations.map((animation, index) => {
                        return (
                            <div className={ styles.animation } key={ index }>
                                <h3>{ animation.name }</h3>
                                <a href={ `/animation/${animation.slug}` }>
                                    View
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}