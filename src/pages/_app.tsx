import { useState } from 'react'
import { Header } from '../components/Header'

import '../styles.scss'

function MyApp({ Component, pageProps }) {
  const [pagination, setPagination] = useState(0)
  
  return (
    <>
      <Header />
      <Component 
        {...pageProps} 
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  )
}

export default MyApp
