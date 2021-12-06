
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '../../../context/index';
import styles from '../../../styles/Admin.module.css'
import useAuth from '../../../hooks/useAuth';
import Login from '../../../components/Login'

function generateBlankGridData() {
  let data = [];

  for (let i = 0; i < 50 * 30; i++) {
      data[i] = 0;
  }

  return data;
}

export default function Admin({ slug }) {
    const [page, setPage] = useState(1);
    const [format, setFormat] = useState(0);
    const [gridData, setGridData] = useState([0]);
    const [isLoggedIn, _, getToken] = useAuth();

    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/animations/${slug}/frames/${page}`, {
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            setGridData(JSON.parse(json.data.data));
        })
        .catch(res => {
            console.error(res);
        })
    }, [page, slug]);

    const handleLogin = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/animations/${slug}/frames/${page}`, {
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            setGridData(JSON.parse(json.data.data));
        })
        .catch(res => {
            console.error(res);
        })
    }

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
            frame: {
                data: JSON.stringify(gridData)
            }
        }

        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/animations/${slug}/frames/${page}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
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

        // TODO: create a new page with POST request
    }

    return (
        <>
            { 
                isLoggedIn ?
                <>
                    <h1 className={ styles.title }>Admin</h1>
                    <p className={ styles.subtitle }>Use this page to edit the animation</p>

                    <div className={ styles.container }>
                        <div className={ styles.controls }>
                        <button onClick={ handlePrevPageClick }>-</button>
                            <p>{ page }</p>
                            <button onClick={ handleNextPageClick }>+</button>
                            <button onClick={ handleSave }>Save</button>
                            <button onClick={ handleCopyPageClick }>Copy</button>
                        </div>
                        <div className={styles.grid}>
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
                </>
                : <Login onLogin={ handleLogin } slug={ slug } returnUrl={ `/animation/${slug}/admin` } />
            }
        </>
    );
}

export const getServerSideProps = async ({ query }) => {
    return {
        props: {
            slug: query.slug
        }
    }
}