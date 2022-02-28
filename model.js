import { action } from "easy-peasy"

/**
 * model redux qui contient les articles et les favoris et les actions associées à leur gestion
 */
export default {
    articles :[],
    favorites :[],
    replace:action((state,newArticles)=>{
        state.articles=newArticles
    }),
    replaceFav:action((state,newArticles)=>{
        state.favorites=newArticles
    }),
    addArticles:action((state,payload)=>{
        state.articles=[...state.articles,...payload]
    }),
    addFav:action((state,payload)=>{
        state.favorites.push(payload)
    })
}