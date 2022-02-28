import { useStoreState } from 'easy-peasy';
import React from 'react'
import NewsItem from './NewsItem';

/**
 * permet l'affichage de tous les favoris
 */
function Favorites(props) {
    const { showDetailsHandler, isFavorite, handleAddToFav, handleRemoveFav } = props;
    const favoritesStore = useStoreState(state => state.favorites)
    return (
        <>
            <div className="flex m-4 md:justify-between">
                <h1 className=" font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600">Favoris</h1>
            </div>
            {favoritesStore.length !== 0 ? (
                favoritesStore.map(
                    (favorite, index) => (
                        <div key={index}>
                            <NewsItem
                                id={index}
                                article={favorite}
                                showDetailsHandler={showDetailsHandler}
                                isFavorite={isFavorite}
                                handleAddToFav={handleAddToFav}
                                handleRemoveFav={handleRemoveFav}
                            />
                        </div>
                    ))) : (<div className="m-4">pas de favoris pour le moment</div>)}
        </>
    )
}

export default Favorites