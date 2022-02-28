import { createStore, StoreProvider, persist} from 'easy-peasy'
import Head from 'next/head';
import IsHydrated from '../components/Layout/isHydrated';
import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
import model from '/model';


const store = createStore(persist(model))

function MyApp({ Component, pageProps }) {


  return (<>
  <Head>
  <title>Appsolute News</title>
  </Head>
    <StoreProvider store={store}>
      <IsHydrated>
        <Layout />
        <div className='content'>
          <Component {...pageProps} />
        </div>
      </IsHydrated>
    </StoreProvider>
  </>)

}

export default MyApp
