import { useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import React from 'react'


function index(props) {
    const router = useRouter();
    const { id } = router.query
    const favoritesStore = useStoreState(state => state.favorites);
    const article = favoritesStore[id];

    return (<>

        <div className="max-w px-10 my-4 py-6 bg-white rounded-lg shadow-md">
            <div className="h-80 lg:max-w flex-none bg-cover rounded text-center overflow-hidden bg-center" style={{ backgroundImage: `url(${article.urlToImage})` }} title={article.title}>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-light text-gray-600">{article.publishedAt}</span>
            </div>
            <div className="mt-2">
                <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href={article.url}>{article.title}</a>
                <p className="mt-2 text-gray-600">{article.content}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <a className="text-blue-600 hover:underline" href={article.url} target="_blank">Read more</a>
            </div>
        </div>
    </>)
}

export default index