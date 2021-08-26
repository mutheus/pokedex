import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'

type ActionsProps = {
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  text: string;
}

export function Actions({ leftIcon, rightIcon, text }: ActionsProps ) {
  const [position, setPosition] = useState(0)
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setPosition(window.pageYOffset)
    })
  })
  
  return (
    <div className={styles.actions} style={{boxShadow: position > 0 ? 'rgba(0, 0, 0, 0.16) 0px 6px 4px -6px' : 'none'}}>
      <Link href="/">
        {leftIcon}
      </Link>
      
      { position >= 80 && (<strong>{text}</strong>)}
      
      {rightIcon}
    </div>
  )
}