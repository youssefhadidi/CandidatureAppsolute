import { action } from "easy-peasy"

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