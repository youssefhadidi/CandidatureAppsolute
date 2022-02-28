import axios from "axios";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/router";
import Favorites from "../components/Favorites";
import NewsList from "../components/NewsList";


function index(props) {

  /**
   * favoritesStore sert a l'état du manager redux (easy-peasy) des favoris
   * replace et addArticles sont les fonctions pour changer l'état
   */
  const favoritesStore = useStoreState(state => state.favorites)
  const { replace, replaceFav, addFav } = useStoreActions(actions => ({ replace: actions.replace, replaceFav: actions.replaceFav, addFav: actions.addFav }))

  /**
   * searchQuery contient l'information que l'on cherchera dans le titre, la description ou le contenu
   * searchsourceQuery contient les sources que l'on veut afficher
   * searchCountryQuery contient la langue dans laquelle on filtrera
   */
  const [searchCountryQuery, setSearchCountryQuery] = useState("fr");
  const [searchsourceQuery, setSearchSourceQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(2);

    // hasMore est un booleen qui dit si il y a encore des articles a récuperer dans la base de donnée
    const [hasMore, setHasMore] = useState(true);

  // sert a la gesion de l'onglet actuellement ouvert
  const [tabOpen, setTabOpen] = useState(1);

  // on setup le router pour naviguer sur les pages
  const router = useRouter();

  /**
   * Dans ce hook on reconcilie le localStorage avec l'état favorites easypeasy au lancement de l'appli
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
        console.log(err)
      })
  }, [])


  /**
   * permet de charger les nouveaux articles répondant aux nouveaux critères de recherche
   */
  function submitSearch() {
    axios.get(`/api/articles?language=${searchCountryQuery}&q=${searchQuery}&source=${searchsourceQuery}&page=1`)
      .then(res => {
        replace(res.data);
        setPage(2);
        setTabOpen(1);
        if (res.data.length == 0) {setHasMore(false);console.log(res.data.length)}
      })
      .catch(err => {
        console.log(err)
      })
  }



  /**
   * permet d'accéder aux details d'un article
   * @param {Number} id l'identifiant de l'article
   */
  const showDetailsHandler = (id) => {
    router.push('/' + id);
  }

  /**
   * permet d'acceder aux details des favoris
   * @param {Number} id l'identifiant du favoris
   */
  const showDetailsHandlerFav = (id) => {
    router.push('/fav/' + id);
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
    }
  }

  /**
   * ici on supprime un favoris du localstorage et du store easypeasy simultanement un favoris
   * @param {*} article 
   */
  function handleRemoveFav(article) {
    const oldStorage = JSON.parse(localStorage.getItem("favorites"))
    var filtered = oldStorage.filter(function (value, index, arr) {
      return value.title !== article.title;
    });
    localStorage.setItem("favorites", JSON.stringify(filtered))
    replaceFav(filtered)
  }

  /**
   * revoi si un article est un favoris
   * @param {*} article l'article dont on veut verifier s'il fait parti des favoris
   * @returns true si l'article est un favoris
   */
  function isFavorite(article) {
    if (favoritesStore.some(el => el.title === article.title)) {
      return true;
    }
    else return false;
  }

  return (
    <>
      <div className="m-5">
        <ul className="flex flex-wrap">
          <li className="mr-2 border-t rounded-md">
            <a className={`${tabOpen === 1 ? "inline-block py-4 px-4 text-sm font-medium text-center text-gray-600 rounded-t-lg bg-white" : "inline-block py-4 px-4 text-sm font-medium text-center hover:text-gray-600 text-blue-300 bg-gray-100 rounded-t-lg active cursor-pointer"}`} onClick={() => { setTabOpen(1) }}>Dernières News</a>
          </li>
          <li className="mr-2">
            <a className={`${tabOpen === 2 ? "inline-block py-4 px-4 text-sm font-medium text-center text-gray-600 rounded-t-lg bg-white" : "inline-block py-4 px-4 text-sm font-medium text-center hover:text-gray-600 text-blue-400 bg-gray-100 rounded-t-lg active cursor-pointer"}`} onClick={() => { setTabOpen(2) }}>Mes Favoris<span className=" ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{favoritesStore.length}</span></a>
          </li>
        </ul>
        <div className="bg-white rounded-b-lg shadow-md">
          <select className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none m-2" onChange={(event) => { setSearchCountryQuery(event.target.value) }}>
            <option value="fr">francais</option>
            <option value="en">anglais</option>
            <option value="it">italien</option>
            <option value="de">allemand</option>
            <option value="es">espagnol</option>
          </select>
          <input type="text" className="border h-10 pl-5 pr-10 border-gray-300 rounded-md m-2" placeholder="titre..." onChange={(event) => { setSearchQuery(event.target.value) }} />
          <input type="text" className="border h-10 pl-5 pr-10 border-gray-300 rounded-md m-2" placeholder="source..." onChange={(event) => { setSearchSourceQuery(event.target.value) }} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md m-2" onClick={() => (submitSearch())}>
            chercher
          </button>

          <div className={`m-4 ${tabOpen === 1 ? "hidden" : ""}`} >
            <Favorites showDetailsHandler={showDetailsHandlerFav} isFavorite={isFavorite} handleAddToFav={handleAddToFav} handleRemoveFav={handleRemoveFav} />
          </div>
          <div className={`m-4 ${tabOpen === 2 ? "hidden" : ""}`}>
            <NewsList setHasMore={hasMore} hasMore={hasMore} searchCountryQuery={searchCountryQuery} page={page} setPage={setPage} searchQuery={searchQuery} searchsourceQuery={searchsourceQuery} showDetailsHandler={showDetailsHandler} isFavorite={isFavorite} handleAddToFav={handleAddToFav} handleRemoveFav={handleRemoveFav} />
          </div>
        </div>
      </div>
    </>
  )
}

export default index