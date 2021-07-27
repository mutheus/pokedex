import { useState } from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'

export function Header() {
  const [height, setHeight] = useState(0)
  
  return (
    <header 
      className={styles.container} 
      ref={el => {
        if (!el) return;
        
        setHeight(el.getBoundingClientRect().height)
      }}
    >
      <h1 className={styles.logo}>
        <Link href="/">
          <a>Pokedex</a>
        </Link>
      </h1>
      
      <div className={styles.user}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600"
          alt="John"
        />
      </div>
    </header>
  )
}