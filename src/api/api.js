export async function getAnimes(type){
    const url="https://api.jikan.moe/v4/anime"
    const parameters={
        type: type,
        min_score: 6.0,
        order_by: "score",
        sort: "desc",
        sfw: "true",
        page: 1
    }
    const queryParameters = new URLSearchParams(parameters)
    let response = await fetch(`${url}?${queryParameters}`)
    let responseJSON = await response.json()

    const animes = responseJSON.data.map(anime => {
        const title = anime.title_english
        const rating = anime.score
        const img = anime.images.jpg.large_image_url
        const genreList=anime.genres

        if(!title || !rating || !img || !genreList){
            return
        }

        const genres=genreList.map(genre => genre.name)
    
        return {
            title: title,
            genres: genres,
            img: img,
            rating: rating
        }
        
    })
    
    return animes
}