
import React from 'react';
import styles from '../styles/Grid.module.css';
import Cell from './Cell';

const Row = ({ row }) => {
    return (
        <div className={styles.row}>
            {
                row.map((cell, index) => {
                    return <Cell data={ cell } key={ index } />
                })
            }
        </div>
    );
}

export default Row;