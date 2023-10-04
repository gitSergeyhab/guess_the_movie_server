// import axios from "axios";
// import { Movie, Person } from "../types/movie-types";
// import { rusMovies } from "../data/rus/rus-movies";
// import { ussrMovies } from "../data/ussr/ussr-movies";
// import { moviesKpVotes } from "../data/movies-kp-votes/movies-kp-votes";
// import { rusCriticsMovies } from "../data/movie-critics/rus-critics-movies";
// import { worldCriticsMovies } from "../data/movie-critics/world-critics-movies";
// import { getUniqueIndexes } from "../utils/utils";
// import {  imagesData } from "../data/images/images-data";
// import { Image } from "../types/image-types";

// const imagesDataList = []

// const criticsMovies = [...rusCriticsMovies.docs, ...worldCriticsMovies.docs]
// export const allMovies = [...rusMovies.docs, ...ussrMovies.docs, ...moviesKpVotes, ...criticsMovies];


// export const allIndexes = getUniqueIndexes(allMovies);

// export const partialsIndexes20 = allIndexes.reduce((acc, item, i) => {

//     const lastIndex = acc.length - 1; 
//     if (i % 20) {
//         acc[lastIndex].push(item);
//     } else {
//         acc.push([item])
//     }
//     return acc
// }, [] as number[][]);




// const getImageUrls = (movieIndexes: number[]) => {
//     const movieIdEqualList = movieIndexes.map((item) => `movieId=${item}`).join('&')
//     return `https://api.kinopoisk.dev/v1/image?sortField=width&sortType=1&page=1&limit=250&${movieIdEqualList}&type=still`
// }

// const getFullUrl = getImageUrls(allIndexes.slice(0, 20));

// export const getUniqueMovieIndexes = () => {
//     return getFullUrl
// }


// export const pushData = async(ids: number[]) => {
//     try {

//         const partUrl = getImageUrls(ids);
//         const {data} = await axios.get(partUrl, {
//             headers: {
//                 "X-API-KEY": "M1RFG5Y-8T7MA2C-GRKGTZ2-MDBVHJV",
//                 "accept": "application/json"
//             }
//         })
//        imagesDataList.push(...data.docs)
//     } catch (err) {
//         console.log({err}, 'pushData: ', {ids})
//     }
// }


// export const pushAllData = async() => {
//     console.log({imagesDataList}, '__1')
//     for (const part of partialsIndexes20) {
//         await pushData(part)
//     }
//     console.log({imagesDataList}, '__2')
//     return imagesDataList;
// }


// export const imagesByMovieData = imagesData.reduce((acc, item) => {
//     const {movieId} = item;
//     if (acc[movieId]) {
//         acc[movieId].push(item);
//     } else {
//         acc[movieId] = [item];
//     }
//     return acc;

// }, {} as {[movieID: number]: Image[]})


// export const imagesByMovieDataStats = Object.entries(imagesByMovieData)
//     .map((item) => ({id: item[0], length: item[1].length}))


// const getPersonLists = (movies: Movie[]) =>  movies.map((item) => item.persons.slice(0,7)) ;

// const getRestActorsList = (movies: Movie[]) => getPersonLists(movies).reduce((acc, item) => ([...acc, ...item]) ,[]);

// export const ussrActors = getRestActorsList(ussrMovies.docs)
// export const worldActors = getRestActorsList(moviesKpVotes)

// export const getRestActorsDict = (persons: Person[]) => 
//     persons.reduce((acc, item) => {
//         const {id} = item;
//         if (acc[id]) {
//             acc[id].length = acc[id].length + 1
//         } else {
//             acc[id] = { length: 1, data: item }
//         }
//         return acc
//     }, {} as {[id: number]: {length: number, data: Person}})

// export const getActorSortList =  (persons: Person[]) => 
//     Object.values(getRestActorsDict(persons)).sort((a,b) => a.length - b.length) 

// export const ussrActorSortList = getActorSortList(ussrActors);
// export const wordActorSortList = getActorSortList(worldActors);

// export const getPopularActorList = (persons: Person[]) => 
//     getActorSortList(persons)
//     .filter((item) => item.length > 1)
//     .map((item) => item.data);


// export const ussrPopularPersons = getPopularActorList(ussrActors);
// export const worldPopularPersons = getPopularActorList(worldActors);


// const getUniqueMovies = (): Movie[] => {
//     const dict = allMovies.reduce((acc, item) => {
//         if (!acc[item.id]) {
//             acc[item.id] = item
//         }
//         return acc
//     }, {});

//     return Object.values(dict);
// }

// interface SimpleMovieData {
//     name: string;
//     enName?: null | string;
//     url: string;
//     previewUrl: string;
//     year: number;
//     movieId: number;
// }
// interface SimpleMovie {
//     movieData: SimpleMovieData
//     movieId: number;
//     actorIDS: number[];
// }

// export const uniqueMovies = getUniqueMovies()

// export const simpleUniqueMovies: SimpleMovie[] = uniqueMovies.map((item) => ({
//     movieId: item.id,
//     movieData: {
//         movieId: item.id,
//         name: item.name,
//         enName: item.enName,
//         previewUrl: item.poster.previewUrl,
//         url: item.poster.url,
//         year: item.year
//     },
//     actorIDS: item.persons.map((person) => person.id)
// }))

// export const getPopPersonsWithMoviesId = (persons: Person[]) => {
//     return persons.map((person) => {
//         const moviesId = simpleUniqueMovies
//             .filter((movie) => movie.actorIDS.includes(person.id))
//             .map((movie) => movie.movieId)
//         return {...person, moviesId}
//     })
// }


// export const worldPersonWithMoviesId = getPopPersonsWithMoviesId(worldPopularPersons);

// const getRandomImage = (imagesData: Image[]) => {
//     const length = imagesData.length;
//     console.log({length}, 'getRandomImage')
//     return imagesData[Math.floor(Math.random() * length)];
// }

// const getRandomImages = (count: number, imagesData: Image[]) => {
//     return new Array(count).fill(0).map(() => getRandomImage(imagesData))
// }


// export const getUniqueMovieIdImages = (imagesData: Image[]): Image[] => {
//     const dict = imagesData.reduce((acc, item) => {
//         if (!acc[item.movieId]) {
//             acc[item.movieId] = item
//         }
//         return acc;
//     }, {});

//     return Object.values(dict);
// }


// export const getDifferentMovieImages = (count: number) => {
//     const imageList = getRandomImages(count * 2, imagesData);
//     console.log({imageList})
//     return getUniqueMovieIdImages(imageList).slice(0, count);
// }


// export const different4MovieImages1 = getDifferentMovieImages(4);
// export const different4MovieImages2 = getDifferentMovieImages(4)

// export const different3MovieImages1 = getDifferentMovieImages(3)
// export const different3MovieImages2 = getDifferentMovieImages(3)

// export const different5MovieImages1 = getDifferentMovieImages(5)
// export const different5MovieImages2 = getDifferentMovieImages(5)


// export const guessTheMovieByFrame = (frameCount: number, movies: Movie[]) => {
//     const images = getDifferentMovieImages(frameCount);
//     const movie = movies.find((item) => item.id === images[0].movieId);

// }

// export const findFrameFromMovie = (frameCount: number, movies: Movie[]) => {
//     const images = getDifferentMovieImages(frameCount);
//     const correctImage = images[0]
//     const movie = movies.find((item) => item.id === correctImage.movieId);
//     const {name, enName, year} = movie;
//     const variants = images.map(({id, previewUrl, url}) => ({id, previewUrl, url}))

//     return {
//         variants,
//         answer: variants[0],
//         question: {
//             text: 'Найдите кадр из фильма',
//             image: null,
//             name, enName, year
//         } 
//     }
// }


// export const frameFromTheMovie5Question = new Array(5).fill(0).map(() => findFrameFromMovie(4, allMovies))