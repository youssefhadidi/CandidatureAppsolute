import Image from 'next/image';
import heart_filled from '../public/assets/images/heart-filled.png'
import heart from '../public/assets/images/heart.png'


const NewsItem = (props) => {
  const { article } = props;
  const { isFavorite } = props;
  const { handleAddToFav } = props;
  const { handleRemoveFav } = props;
  const { showDetailsHandler } = props;
  const { id } = props;
  return (
    <>
      <div className="max-w-full lg:max-w-full lg:flex m-5">
        <div className={`lg:h-48 lg:h-auto lg:w-48 flex-none bg-cover ${article.urlToImage == null ? "md:h-0" : "h-48"} rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden`} style={{ backgroundImage: `url(${article.urlToImage})` }} title={article.title}>
        </div>
        <div className={`w-full border-r border-b border-l border-gray-400 ${article.urlToImage == null ? "" : "lg:border-l-0"} lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal`}>
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2 cursor-pointer" onClick={() => { showDetailsHandler(id) }}>{article.title} </div>
            <p className="text-gray-700 text-base">{article.description}</p>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">
              {/** on supprime les balises html qui pourraient apparaitre pour l'auteur */}
              <p className="text-gray-900 leading-none">{article.author !== null ? article.author.replace(/(<([^>]+)>)/ig, '') : "no author"}</p>
              <p className="text-gray-600">{article.publishedAt}</p>
            </div>
            <div>
              <div onClick={() => (handleAddToFav(article))} className={`cursor-pointer ${isFavorite(article) ? "hidden" : ""}`}><Image src={heart} width={"25px"} height={"25px"} /></div>
              <div onClick={() => (handleRemoveFav(article))} className={`cursor-pointer ${isFavorite(article) ? "" : "hidden"}`}><Image src={heart_filled} width={"25px"} height={"25px"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsItem