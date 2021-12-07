
import { useState, useEffect, useRef } from 'react';
import Chat from '../../../components/console/Chat';
import Prompt from '../../../components/console/Prompt'
import Play from '../../../components/Play'
import styles from '../../../styles/new/animation/Index.module.css'

export default function New({ slug }) {
    const [animation, setAnimation] = useState({});
    const [_, setFormat] = useState(0);
    const [chats, setChats] = useState([]);

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
    }, []);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/animations/${slug}/chats`)
        .then(res => {
            return res.json();
        })
        .then(json => {
            setChats(json);
        })
        .catch(res => {
            console.error(res);
        })
    }, []);

    function handleLineSubmit(body) {
        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/animations/${slug}/chats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chat: { body: body } })
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            
        })
        .catch(res => {
            console.error(res);
        });
    }

    useEffect(() => {
        (async () => {
            const { createConsumer } = await import('@rails/actioncable');
            const consumer = createConsumer(`${process.env.NEXT_PUBLIC_WS_PATH}`)

            consumer.subscriptions.create(
                { channel: 'ChatChannel' },
                { 
                    received: (chat) => {
                        console.dir(chats)

                        setChats(c => {
                            c.push({ body: chat });
                            return c;
                        });
            
                        setFormat(c => c + 1);
                    }
                }
            )
        })()
    }, []);



    return (
        <>
            <h1 className={ styles.title }>{ animation.name }</h1>
            <p className={ styles.subtitle }>Start typing for an interactive experience</p>

            <div className={ styles.container }>

            <div className={ styles.header }>
                <div className={ styles.nav }>
                    <a href={ `/animation/${slug}/admin` }>Elements</a>
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
                chats.map((chat, index) => {
                    return <Chat body={ chat.body } key={ index } />
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