import { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem"
import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";


function index(props) {

  /**
   * articlesStore sert a l'état du manager redux (easy-peasy) des articles
   * favoritesStore sert a l'état du manager redux (easy-peasy) des favoris
   * replace et addArticles sont les fonctions pour changer l'état
   */
  const articlesStore = useStoreState(state => state.articles)
  const favoritesStore = useStoreState(state => state.favorites)
  const { replace,replaceFav, addArticles,addFav } = useStoreActions(actions => ({ replace: actions.replace, replaceFav: actions.replaceFav, addArticles: actions.addArticles,addFav: actions.addFav }))

  const [searchCountryQuery,setSearchCountryQuery] = useState("fr");
  const [searchsourceQuery,setSearchSourceQuery] = useState("");
  const [searchQuery,setSearchQuery] = useState("");

  // Infos necessaires pour scroll infini
  /**
   * page est le numero de page de l'api a consulter
   * hasMore est un booleen qui dit si il y a encore des articles a récuperer dans la base de donnée
   */
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  // sert a la gesion de l'onglet actuellement ouvert
  const [tabOpen,setTabOpen] = useState(1);

  /**
   * on setup le router pour naviguer sur les pages
   */
  const router = useRouter();
  /**
   * dans ce hook on reconcilie le localStorage avec l'état favorites easypeasy
   */
  useEffect(() => {
    const stored_data = JSON.parse(localStorage.getItem("favorites"));
    if (stored_data != null) replaceFav(stored_data);
    else localStorage.setItem("favorites", JSON.stringify([]));
    axios.get(`/api/articles?language=${searchCountryQuery}&q=${searchQuery}&source=${searchsourceQuery}&page=1`)
      .then(res => {
        replace(res.data);
      })
      .catch(err => {
        console.log(JSON.stringify(err))
      })
      console.log(`/api/articles?language=${searchCountryQuery}&q=${searchQuery}&source=${searchsourceQuery}&page=1`)

  }, [])


  function submitSearch(){
    axios.get(`/api/articles?language=${searchCountryQuery}&q=${searchQuery}&source=${searchsourceQuery}&page=1`)
      .then(res => {
        replace(res.data);
        setPage(2);
        setTabOpen(1);
      })
      .catch(err => {
        console.log(JSON.stringify(err))
      })
  }



/**
 * access the latest news
 */
  const showDetailsHandler = (id)=>{
    router.push('/'+id);
  }

  const showDetailsHandlerFav = (id)=>{
    router.push('/fav/'+id);
  }

  /**
   * access the favorites
   */
  const getMoreArticles = async () => {
    axios.get(`/api/articles?language=${searchCountryQuery}&q=${searchQuery}&source=${searchsourceQuery}&page=${page}`)
      .then(res => {
        addArticles(res.data);
        setPage(page + 1);
        if(res.data.length == 0) setHasMore(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err))
      })
  }


    /**
   * ajoute un article aux favoris
   * @param {*} article l'article à ajouter aux favoris
   */
     function handleAddToFav(article) {
      const oldStorage = JSON.parse(localStorage.getItem("favorites"))
      if (!oldStorage.some(el => el.title === article.title)) {
        oldStorage.push(article)
        localStorage.setItem("favorites", JSON.stringify(oldStorage))
        addFav(article);
        console.log("added!")
      }
    }
  
    /**
     * ici on supprime un favoris du localstorage et du store easypeasy simultanement
     * @param {*} article 
     */
    function handleRemoveFav(article){
      const oldStorage = JSON.parse(localStorage.getItem("favorites"))
      console.log(oldStorage)
      var filtered = oldStorage.filter(function(value, index, arr){ 
        return value.title!==article.title;
      });
    localStorage.setItem("favorites", JSON.stringify(filtered))
    replaceFav(filtered)
    }

    /**
     * revoi si un article est un favoris
     * @param {*} article l'article dont on veut verifier s'il fait parti des favoris
     * @returns true si l'article est un favoris
     */
    function isFavorite(article){
        if (favoritesStore.some(el => el.title === article.title)) { 
          return true;
        }
        else return false;
      }



  return (
    <>
    <div className="m-5">
      <ul className="flex flex-wrap">
        <li className="mr-2">
            <a  className={`${tabOpen===1?"inline-block py-4 px-4 text-sm font-medium text-center text-gray-600 rounded-t-lg bg-white":"inline-block py-4 px-4 text-sm font-medium text-center hover:text-gray-600 text-blue-300 bg-gray-100 rounded-t-lg active cursor-pointer"}`}  onClick={()=>{setTabOpen(1)}}>Dernières News</a>
        </li>
        <li className="mr-2">
            <a  className={`${tabOpen===2?"inline-block py-4 px-4 text-sm font-medium text-center text-gray-600 rounded-t-lg bg-white":"inline-block py-4 px-4 text-sm font-medium text-center hover:text-gray-600 text-blue-400 bg-gray-100 rounded-t-lg active cursor-pointer"}` }  onClick={()=>{setTabOpen(2)}}>Mes Favoris<span className=" ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{favoritesStore.length}</span></a>
        </li>
      </ul>
    <div className="bg-white rounded-lg">
    <select className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none m-2" onChange={(event)=>{setSearchCountryQuery(event.target.value)}}>
      <option value="fr">francais</option>
      <option value="en">anglais</option>
      <option value="it">italien</option>
      <option value="de">allemand</option>
      <option value="es">espagnol</option>
    </select>
    <input type="text" className="border h-10 pl-5 pr-10 border-gray-300 rounded-md m-2" placeholder="titre..." onChange={(event)=>{setSearchQuery(event.target.value)}}/>
    <input type="text" className="border h-10 pl-5 pr-10 border-gray-300 rounded-md m-2" placeholder="source..." onChange={(event)=>{setSearchSourceQuery(event.target.value)}}/>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md m-2" onClick={()=>(submitSearch())}>
      chercher
    </button>

      <div className={`tab ${tabOpen===1?"hidden":""}`} >
        <div className="flex m-4 md:justify-between">
          <h1 className=" font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600">Favoris</h1>
        </div>
        {favoritesStore.length!==0?(
          favoritesStore.map(
          (favorite, index) => (
          <div key={index}>
            <NewsItem
              id={index}
              article={favorite}
              showDetailsHandler={showDetailsHandlerFav}
              isFavorite={isFavorite}
              handleAddToFav={handleAddToFav}
              handleRemoveFav={handleRemoveFav}
            />
          </div>
          ))):(<div className="m-4">pas de favoris pour le moment</div>)}
      </div>
      <div className={`tab m-4 ${tabOpen===2?"hidden":""}`}>
      <h1 className=" font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600">Actualités du jour</h1>
      <div >
      <InfiniteScroll
        dataLength={articlesStore}
        next={getMoreArticles}
        hasMore={hasMore}
        loader={<h3>chargement...</h3>}
        endMessage={""}>
        {articlesStore.map(
          (newItem, index) => (
          <div key={index}>
            <NewsItem 
              id={index}
              article={newItem}
              isFavorite={isFavorite}
              showDetailsHandler={showDetailsHandler}
              handleAddToFav={handleAddToFav}
              handleRemoveFav={handleRemoveFav}
            />
          </div>
          ))}
      </InfiniteScroll>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export async function getStaticProps() {
  const articles = await axios.get(`https://newsapi.org/v2/top-headlines?country=fr&apiKey=${process.env.REACT_APP_NEWSKEY}&pageSize=10&page=1`);
  return {
    props: {
      news: articles.data.articles
    },
    revalidate: 60*10
  }
}


export default index