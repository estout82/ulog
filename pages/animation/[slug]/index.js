
import { useState, useEffect } from 'react';
import Line from '../../../components/console/Line';
import Prompt from '../../../components/console/Prompt'
import Play from '../../../components/Play'
import styles from '../../../styles/new/animation/Index.module.css'

export default function New({ slug }) {
    const [animation, setAnimation] = useState({});
    const [frames, setFrames] = useState([]);
    const [format, setFormat] = useState(0);
    const [lines, setLines] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/animations/${slug}`)
        .then(res => {
            return res.json();
        })
        .then(json => {
            setAnimation(json);
        })
        .catch(res => {
            console.error(res);
        })
    }, [])

    function handleLineSubmit(line) {
        setLines(c => {
            c.push(line);
            return c;
        });

        setFormat(c => c + 1);
    }

    return (
        <>
            <h1 className={ styles.title }>{ animation.name }</h1>
            <p className={ styles.subtitle }>Start typing for an interactive experience</p>

            <div className={ styles.container }>

            <div className={ styles.header }>
                <div className={ styles.nav }>
                    <p>Elements</p>
                    <a href='https://github.com/estout82/ulog' rel='noreferrer' target='_blank'>Sources</a>
                    <p className={ styles.selected }>Console</p>
                </div>
            </div>

            <div className={ styles.line }>
                <div className={ styles.request }>
                    <p className={ styles.prompt }>&gt;</p>
                    <p className={ styles.code }>
                        console.<span className={ styles.yellow }>ignite</span>()
                    </p>
                </div>
                <div className={ styles.response }>
                    <p className={ styles.prompt }>&lt;</p>
                    <Play slug={ slug } />
                </div>
            </div>

            {
                lines.map((line, index) => {
                    return <Line request={ line } key={ index } />
                })
            }

            <Prompt onSubmit={ handleLineSubmit } />
                
            </div>
        </>
    )
}

export const getServerSideProps = async ({ query }) => {
    return {
        props: {
            slug: query.slug
        }
    }
}