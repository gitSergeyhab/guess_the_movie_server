import axios, { AxiosInstance } from "axios";
import { Movie, MovieData } from "../../types/movie-types";
import { Image, ImageData } from "../../types/image-types";
import { BASE_KINOPOISK_URL, Countries, KINOPOISK_REQUEST_DATA_LIMIT, MovieType, SELECTED_MOVIES_FIELDS } from "../../const";
import { getFieldsEqualString, splitIndexesToLists } from "../../utils/utils";


class ReadDataService {

    readonly API_KEY: string = process.env.KINOPOISK_API_KEY || '';

    _createApi () {
        if (!this.API_KEY) {
            throw new Error('отсутствуе KINOPOISK_API_KEY в переменной окружения');
        }
        const api = axios.create({
            baseURL: BASE_KINOPOISK_URL,
            timeout: 60_000,
            headers: {
                "X-API-KEY": this.API_KEY,
                "accept": "application/json"
            }
        }) 
        return api;
    }

    async _readPartialMovieData (part: number, api: AxiosInstance, movieType: MovieType, country?: Countries ) {
        console.log('_readPartialMovieData: ', 'часть ',  part, ' - старт');
        const countryFilter = country ? `&countries.name=${country}` : ''
        const selectedFieldString = getFieldsEqualString(SELECTED_MOVIES_FIELDS, 'selectFields');
        const sortFieldValue = country ? 'votes.kp' : 'votes.imdb' ;
        const sortFields = `sortField=${sortFieldValue}&sortType=-1`;
        const {data} = await api.get<MovieData>(
            `/v1.3/movie?${selectedFieldString}&${sortFields}&page=${part}&limit=${KINOPOISK_REQUEST_DATA_LIMIT}&type=${movieType}${countryFilter}`
        )
        console.log('_readPartialMovieData: ', 'часть ',  part, ' прочитана');
        return data;
    }

    async readMovieData(count: number, movieType: MovieType, country?: Countries) {
        try {
            const api = this._createApi();
            const movies: Movie[] = [];
            const partialsCount = Math.ceil(count / KINOPOISK_REQUEST_DATA_LIMIT);
            const partArray = new Array(partialsCount).fill(0).map((_, i) => i+1);
    
            for (const part of (partArray)) {//грузить п частям, т.к. лимит = 250
               const data = await this._readPartialMovieData(part, api, movieType, country);
               movies.push(...data.docs);
            }
            console.log('ReadDataService: readMovieData завершен. Считано ', movies.length, ' фильмов')
            return movies;
        } catch (err) {
            console.error('Error: ', {err});
            throw new Error('ReadDataService: readMovieData Error');
        }
    }

    async _readPartialImageData ( api: AxiosInstance, movieIndexes: number[] ) {
        console.log('_readPartialImageData: ', 'индексы:  ',  movieIndexes, ' - старт')
        const movieIdEqualList = movieIndexes.map((item) => `movieId=${item}`).join('&')
        const url= `/v1/image?sortField=width&sortType=1&page=1&limit=250&${movieIdEqualList}&type=still`
        const {data} = await api.get<ImageData>(url);
        console.log('_readPartialImageData: ', 'индексы:  ',  movieIndexes, ' - прочитаны')
        return data;
    }

    async readImageData ( movieIndexes: number[]) {
        const splittedIndexes = splitIndexesToLists(movieIndexes, 20);
        try {
            const api = this._createApi();
            const images: Image[] = [];
            for (const part of splittedIndexes) {
                // нужно делить запрос начасти, иначе получаем ошибку сдишком длинного запроса
                const data = await this._readPartialImageData(api, part);
                images.push(...data.docs);
            }
            console.log('ReadDataService: readImageData завершен. Считано ', images.length, ' изображений')
            return images;
        } catch (err) {
            console.error('Error: ', {err});
            throw new Error('ReadDataService: readImageData Error');
        }
    }
}

export const readDataService = new ReadDataService()