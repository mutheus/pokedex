import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { MdClear } from 'react-icons/md'
import { MdFavoriteBorder } from 'react-icons/md'
import { Actions } from '../../components/Actions'

import styles from './styles.module.scss'

const fetcher = url => axios.get(url).then(res => res.data)

export default function Pokemon({ pokemon }) {
  const router = useRouter()

  if (router.isFallback) return <div>Loading...</div>
  
  return (
    <>
      <Actions leftIcon={<MdClear size={30} />} rightIcon={<MdFavoriteBorder size={30} />} text={pokemon.name} />
        
      <div className={styles.pokeContainer}>
        <div className={styles.pokeProfile}>
          <h1>{pokemon.name}</h1>
          
          <Image 
            width={220}
            height={220}
            src={pokemon.image}
            alt={pokemon.name}
          />
        
          <div className={styles.pokeInfo}>
            <p><strong>Ability:</strong> {pokemon.ability}</p>
            <p><strong>Moves:</strong> {pokemon.moves}</p>
            <p><strong>Type:</strong> {pokemon.type}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetcher(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
  
  const paths = data.results.map((pokemon) => ({
    params: { 
      slug: pokemon.name
    }
  }))
  
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params
  const data = await fetcher(`https://pokeapi.co/api/v2/pokemon/${slug}`)
  
  const pokemon = {
    id: data.id,
    name: data.name,
    image: `https://cdn.traction.one/pokedex/pokemon/${data.id}.png`,
    ability: data.abilities.map(item => item.ability.name).join(', '),
    moves: data.moves.map(item => item.move.name).slice(0, 5).join(', '),
    type: data.types.map(item => item.type.name).join(', ')
  }
  
  return {
    props: {
      pokemon
    }
  }
}