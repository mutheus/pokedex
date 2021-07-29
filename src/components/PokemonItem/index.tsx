import Image from 'next/image'
import Link from 'next/link'
import { Palette } from 'react-palette'

import styles from './styles.module.scss'

type Pokemon = {
  id: number;
  name: string;
  url: string;
  image: string;
}

type PokemonItemProps = {
  pokemon: Pokemon;
}

export function PokemonItem({ pokemon }: PokemonItemProps ) {
  return (
    <div className={styles.pokeItem}>
      <Palette src={pokemon.image}>
        {({ data }) => (
          <div className={styles.shape} style={{ backgroundColor: data.lightVibrant }}></div>
        )}
      </Palette>
      
      <Link href={`/pokemon/${pokemon.name}`}>
        <Image 
          src={pokemon.image}
          alt={pokemon.name}
          width={230}
          height={230}
        />
      </Link>
      
      <Link href={`/pokemon/${pokemon.name}`}>
        <h3>#{pokemon.id} {pokemon.name}</h3>
      </Link>
    </div>
  )
}