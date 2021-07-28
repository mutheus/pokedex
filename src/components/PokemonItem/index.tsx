import Image from 'next/image'
import { Palette } from 'react-palette'

import styles from './styles.module.scss'

export function PokemonItem({ pokemon }) {
  return (
    <div className={styles.pokeItem}>
      <Palette src={pokemon.image}>
        {({ data }) => (
          <div className={styles.shape} style={{ backgroundColor: data.lightVibrant }}></div>
        )}
      </Palette>
      
      <Image 
        src={pokemon.image}
        alt={pokemon.name}
        width={230}
        height={230}
      />
      <h3>{pokemon.name}</h3>
    </div>
  )
}