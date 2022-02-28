import axios from "axios";


export default async(req,res)=>{
    const { page,language,q,source} = req.query;
    axios.get(`https://newsapi.org/v2/top-headlines?language=${language}&q=${q}&apiKey=${process.env.development.local.REACT_APP_NEWSKEY}&sources=${source}&pageSize=10&page=${page}`)
        .then(resArticles => res.status(200).json(resArticles.data.articles))
        .catch((err) => {
            console.log(JSON.stringify(err));
            res.status(400)
        })
   console.log(source)
}