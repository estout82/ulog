
import React, { useState, useEffect } from 'react';
import Row from './Row';
import styles from '../styles/Grid.module.css';

function generateBlankGridData() {
    let data = [];

    for (let i = 0; i < 50 * 30; i++) {
        data[i] = 0;
    }

    return data;
}

const Grid = (props) => {
    const [page, setPage] = useState(1);
    const [format, setFormat] = useState(0);
    const [gridData, setGridData] = useState([0]);

    useEffect(() => {
        fetch(`/api/grid?page=${page}`)
        .then(res => {
            if (res.status == 200) {
                return res.json();
            } else {
                console.error(res);
            }
        })
        .then(data => {
            setGridData(JSON.parse(data.data));
        })
        .catch(res => {
            console.error(res);
        })
    }, [page])

    const handleCellClick = (index) => {
        let newGridData = gridData;

        if (gridData[index] == 0)
            newGridData[index] = 1;
        else
            newGridData[index] = 0;

        setGridData(newGridData);

        // force a re-render ... yikes
        setFormat(c => c + 1);
    }

    const handleNextPageClick = () => {
        setPage(c => c + 1);
    }

    const handlePrevPageClick = () => {
        setPage(c => c - 1);
    }

    const handleSave = () => {
        const postData = {
            page: page,
            data: gridData
        }

        fetch('/api/grid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => {
            if (res.status == 200) {
                // OK
                alert('ok');
            } else {
                console.error(res);
            }
        })
        .catch(res => {
            console.error(res);
        });
    }

    const handleCopyPageClick = () => {
        setPage(c => c + 1);
    }

    return (
        <div>
            <div>
                <h3>Page: { page }</h3>
                <button onClick={ handleSave }>Save</button>
                <button onClick={ handleNextPageClick }>+</button>
                <button onClick={ handlePrevPageClick }>-</button>
                <button onClick={ handleCopyPageClick }>Copy</button>
            </div>
            <div className={styles.container}>
                {
                    gridData.map((cell, index) => {
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
                    })
                }
            </div>
        </div>
    );
}

export default Grid;