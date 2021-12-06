
import React, { useEffect, useRef } from 'react';
import styles from '../../styles/console/Prompt.module.css'

function Prompt({ onSubmit }) {
    const input = useRef();

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
        }
    });

    function handleKeyPress(event) {
        const ENTER_KEY_CODE = 13;

        if (event.keyCode == ENTER_KEY_CODE && 
            input.current == document.activeElement) {
            
                if (onSubmit && onSubmit instanceof Function) {
                    onSubmit(input.current.value);
                }

                input.current.value = '';
        }
    }

    return (
        <div>
            <div className={ styles.request }>
                <p className={ styles.prompt }>&gt;</p>
                <input ref={ input } className={ styles.input } />
            </div>
        </div>
    )
}

export default Prompt;