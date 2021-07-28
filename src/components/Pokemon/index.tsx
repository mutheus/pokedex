import { PokemonItem } from '../PokemonItem'
import styles from './styles.module.scss'

export function Pokemon({ data }) {
  if (!data) return <div className={styles.loadingMsg}><p>Loading...</p></div> 
 
  const result = data.results.map((item, index) => {
    const str = item.url,
      imgIndex = str.match(/\/[0-9]+/),
      imageURL = `https://pokeres.bastionbot.org/images/pokemon${imgIndex}.png`
    
    return {
      name: item.name,
      url: item.url,
      image: imageURL
    }
  })
  
  return (
    <div className={styles.pokeContainer}>
      { result.map((pokemon, index) => <PokemonItem key={index} pokemon={pokemon} />)}
    </div>
  )
}