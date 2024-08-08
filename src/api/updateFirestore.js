/*export async function getAnimes(type){
    const url="https://api.jikan.moe/v4/anime"
    const parameters={
        type: type,
        min_score: 6.0,
        order_by: "mal_id",
        sort: "asc",
        sfw: "true",
        limit: 25,
    }

    const queryParameters = new URLSearchParams({
        ...parameters,
        page: 1,
    })
    const response = await fetch(`${url}?${queryParameters}`)
    const responseJSON = await response.json()

    let totalOfPages = responseJSON.pagination.last_visible_page
    let index = 0
    await new Promise(r => setTimeout(r, 5000));

    for(let i=0; i < totalOfPages; i++){
        const queryParameters = new URLSearchParams({
            ...parameters,
            page: i+1,
        })
        const response = await fetch(`${url}?${queryParameters}`)
        const responseJSON = await response.json()
        responseJSON.data.forEach(anime => {
            index++
            const animeObject = getAnimeObject(anime)
            uploadToFirebase(animeObject, index)
        })
        if((i+1)%3 === 0){
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    
    return [{
        title: "Berserk",
        img: "https://cdn.myanimelist.net/images/anime/1384/119988l.jpg",
        rating: 8.59,
        genres: ['Action', 'Adventure'],
    }]
    
}*/

/*export async function uploadToFirebase(anime, index){
    //Add anime Doc to collection
    await setDoc(doc(db, "animes", index.toString()), anime);
}*/

/*
function getAnimeObject(anime){
    const title = anime.title_english? anime.title_english : anime.title
    const rating = anime.score
    const img = anime.images.jpg.large_image_url
    const genreList = anime.genres

    const malId = anime.mal_id
    const malURL = anime.url

    if(!title || !rating || !img || !genreList){
        return
    }

    const genres=genreList.map(genre => genre.name)

    return {
        title: title,
        genres: genres,
        img: img,
        rating: rating,
        malId: malId,
        malURL: malURL
    }
}
    */