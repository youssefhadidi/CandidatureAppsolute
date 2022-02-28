import axios from "axios";


export default async(req,res)=>{
    const { page,language,q,source} = req.query;
    return new Promise((resolve, reject) => {
    axios.get(`https://newsapi.org/v2/top-headlines?language=${language}&q=${q}&apiKey=${process.env.REACT_APP_NEWSKEY}&sources=${source}&pageSize=10&page=${page}`)
        .then(resArticles => res.status(200).json(resArticles.data.articles))
        .catch((err) => {
            console.log(JSON.stringify(err));
            res.status(400)
        })}
        );
   
}