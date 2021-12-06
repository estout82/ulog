
import React from 'react';
import styles from '../../styles/console/Line.module.css';

function Line({ request }) {
    return (
        <div className={ styles.line }>
            <div className={ styles.request }>
                <p className={ styles.prompt }>&gt;</p>
                <p className={ styles.code }>
                    { request }
                </p>
            </div>
            <div className={ styles.response }>
                <p className={ styles.prompt }>&lt;</p>
                <p className={ styles.code }>Response</p>
            </div>
        </div>
    );
}

export default Line;