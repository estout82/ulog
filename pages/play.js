import Head from 'next/head'
import Image from 'next/image'
import Play from '../components/Play'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Play />
    </div>
  )
}
