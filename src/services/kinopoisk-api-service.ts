import axios, { AxiosInstance } from "axios";
import { Movie, MovieData } from "../types/movie-types";
import { Image, ImageData } from "../types/image-types";
import { BASE_KINOPOISK_URL, Countries, KINOPOISK_REQUEST_DATA_LIMIT, MovieType, SELECTED_IMAGES_FIELDS, SELECTED_MOVIES_FIELDS } from "../const";
import { getFieldsEqualString, shuffleArray, splitIndexesToLists } from "../utils/utils";
import { OperationCategory, OperationContent } from "../const/admin-const";
import { ApiError } from "../middlewares/error-middleware";
import { AdminDataRequestQuery } from "../types/admin-types";
import { mongoService } from "./mongo-service";


const API_KEY: string = process.env.KINOPOISK_API_KEY || '';
const COUNT_INDEXES_IN_IMAGE_REQUEST = 8;

export const DataCount = {
    WorldMovies: 1500,
    RusMovies: 250,
    UssrMovies: 500,
}

class KinopoiskApiDataService {

    _createApi () {
        if (!API_KEY) {
            throw new Error('отсутствуе KINOPOISK_API_KEY в переменной окружения');
        }
        const api = axios.create({
            baseURL: BASE_KINOPOISK_URL,
            timeout: 60_000,
            headers: {
                "X-API-KEY": API_KEY,
                "accept": "application/json"
            }
        }) 
        return api;
    }

    async _readPartialMovieData (part: number, api: AxiosInstance,  country?: Countries ) {
        console.log('_readPartialMovieData: ', 'часть ',  part, {country}, ' - старт');
        const apiVersion = 'v1.3';
        const rootUrl = 'movie';
        const countryFilter = country ? `countries.name=${country}` : ''
        const selectedFieldString = getFieldsEqualString(SELECTED_MOVIES_FIELDS, 'selectFields');
        const sortFieldValue = country ? 'votes.kp' : 'votes.imdb' ;
        const rating = 'rating.imdb=6-10';
        const sortFields = `sortField=${sortFieldValue}&sortType=-1`;
        const type = `type=${MovieType.Movie}&type=${MovieType.Series}`
        const {data} = await api.get<MovieData>(
            `/${apiVersion}/${rootUrl}?${selectedFieldString}&${sortFields}&page=${part}&limit=${KINOPOISK_REQUEST_DATA_LIMIT}&${type}&${countryFilter}&${rating}`
        )
        console.log('_readPartialMovieData: ', 'часть ',  part, ' прочитана');
        return data;
    }

    async _readMovieDataByParams(count: number,  country?: Countries) {
        try {
            const api = this._createApi();
            const movies: Movie[] = [];
            const partialsCount = Math.ceil(count / KINOPOISK_REQUEST_DATA_LIMIT);
            const partArray = new Array(partialsCount).fill(0).map((_, i) => i+1);
            console.log('KinopoiskApiDataService: _readMovieDataByParams стартовал. Считанывается ', movies.length, ' фильмов')

            for (const part of (partArray)) {//грузить п частям, т.к. лимит = 250
               const data = await this._readPartialMovieData(part, api, country);
               movies.push(...data.docs);
            }
            console.log('KinopoiskApiDataService: _readMovieDataByParams завершен. Считано ', movies.length, ' фильмов')
            return movies;
        } catch (err) {
            console.error('Error: ', {err});
            throw new Error('KinopoiskApiDataService: _readMovieDataByParams Error');
        }
    }

    async _readPartialImageData ( api: AxiosInstance, movieIndexes: number[] ) {
        console.log('_readPartialImageData: ', 'индексы:  ',  movieIndexes.join(', '), ' - старт');
        const movieIdEqualList = movieIndexes.map((item) => `movieId=${item}`).join('&');
        const apiVersion = 'v1';
        const rootUrl = 'image';
        const selectFields = getFieldsEqualString(SELECTED_IMAGES_FIELDS, 'selectFields');
        const sortField = 'sortField=still';
        const page = 'page=1';
        const type = 'type=still'
        const url = `/${apiVersion}/${rootUrl}?${selectFields}&${sortField}&limit=${KINOPOISK_REQUEST_DATA_LIMIT}&${page}&${movieIdEqualList}&${type}`
        const {data} = await api.get<ImageData>(url);
        console.log('_readPartialImageData: ', 'индексы:  ',  movieIndexes.join(','), ' - прочитаны')
        return data;
    }

    async readImageData ( movieIndexes: number[]) {
        const splittedIndexes = splitIndexesToLists(shuffleArray(movieIndexes), COUNT_INDEXES_IN_IMAGE_REQUEST);
        try {
            const api = this._createApi();
            const images: Image[] = [];
            console.log('KinopoiskApiDataService: readImageData завершен. Считываются изображения к ', movieIndexes.length, ' фильмам')
            for (const part of splittedIndexes) {
                // нужно делить запрос начасти, иначе получаем ошибку сдишком длинного запроса
                const data = await this._readPartialImageData(api, part);
                images.push(...data.docs);
            }
            console.log('KinopoiskApiDataService: readImageData завершен. Считано ', images.length, ' изображений')
            return images;
        } catch (err) {
            console.error('Error: ', {err});
            throw new Error('KinopoiskApiDataService: readImageData Error');
        }
    }

    async readRusMovies () {
        return await this._readMovieDataByParams(DataCount.RusMovies, Countries.RUS);
    }

    async readUssrMovies () {
        return await this._readMovieDataByParams(DataCount.UssrMovies,  Countries.USSR);
    }

    async readWorldMovies () {
        return await this._readMovieDataByParams(DataCount.WorldMovies);
    }

    async readMovies(category: OperationCategory) {
        switch (category) {
            case OperationCategory.Rus: return await this.readRusMovies();
            case OperationCategory.Ussr: return await this.readUssrMovies();
            case OperationCategory.World: return await this.readWorldMovies();
            default: throw ApiError.BadRequest('KinopoiskApiDataService readMoviesData: Error category')
        }
    }

    async getData ({category, content}: AdminDataRequestQuery) {
        switch (content) {
            case OperationContent.Movies: return await this.readMovies(category);
            case OperationContent.Images: {
                const movies = await mongoService.readMovies(category);
                console.log(movies.map((i) => i.name), 'movies____!')
                const indexes = movies.map((item) => item.id)
                return await this.readImageData(indexes);
            }
            default: throw ApiError.BadRequest('KinopoiskApiDataService getData: Error content')
        }
    }
}


export const kinopoiskApiDataService = new KinopoiskApiDataService();