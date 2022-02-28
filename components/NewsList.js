import axios from 'axios';
import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import NewsItem from './NewsItem'

/**
 * permet l'affichage de la liste infinie des derniers articles
 * @param {*} props les props qu'on recupere de l'accueil
 */
function NewsList(props) {
    const { showDetailsHandler, isFavorite, handleAddToFav, handleRemoveFav, hasMore, searchCountryQuery, searchQuery, searchsourceQuery } = props;
    const articlesStore = useStoreState(state => state.articles)
    const [page, setPage] = useState(2);
    const { addArticles } = useStoreActions(actions => ({ addArticles: actions.addArticles }))

   /**
   * access the favorites
   */
    const getMoreArticles = async () => {
        axios.get(`/api/articles?language=${searchCountryQuery}&q=${searchQuery}&source=${searchsourceQuery}&page=${page}`)
            .then(res => {
                addArticles(res.data);
                setPage(page + 1);
                if (res.data.length == 0) setHasMore(false);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (<>
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
    </>
    )
}

export default NewsList