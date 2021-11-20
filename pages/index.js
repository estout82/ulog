
import Play from '../components/Play'
import styles from '../styles/Home.module.css'

export default function Index() {
  return (
    <div className={ styles.container }>

      <div className={ styles.header }>
        <div className={ styles.nav }>
          <p>Elements</p>
          <p>Sources</p>
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
          <Play />
        </div>
      </div>

      <div>
        <div className={ styles.request }>
          <p className={ styles.newPrompt }>&gt;</p>
          <input className={ styles.input }></input>
        </div>
      </div>

    </div>
  )
}
