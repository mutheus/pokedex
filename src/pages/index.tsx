import Head from 'next/head'
import styles from './styles.module.scss'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokemon App</title>
        <meta name="description" content="1ts Generation Pokémon List" />
      </Head>

      <main>
        <h1>Hello, World!</h1>
      </main>
    </div>
  )
}
