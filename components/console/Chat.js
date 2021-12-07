
import React from 'react';
import styles from '../../styles/console/Chat.module.css';

function Chat({ body }) {
    return (
        <div className={ styles.line }>
            <div className={ styles.request }>
                <p className={ styles.prompt }>&gt;</p>
                <p className={ styles.code }>
                    { body }
                </p>
            </div>
        </div>
    );
}

export default Chat;