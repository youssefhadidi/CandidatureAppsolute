import { createStore, StoreProvider,persist, useStoreState, useStoreActions} from 'easy-peasy'
import IsHydrated from '../components/Layout/isHydrated';
import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
import model from '/model';


const store=createStore(persist(model))

function MyApp({ Component, pageProps }) {


  return(<><StoreProvider store={store}><IsHydrated><Layout/><div className='content'><Component {...pageProps} /></div></IsHydrated></StoreProvider></>)

}

export default MyApp
