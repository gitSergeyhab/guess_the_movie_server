export const enum StatusCode {
    Ok = 200,
    Added = 201,
    Deleted = 204,
    NotFound = 404,
    BadRequest = 400,
    ServerError = 500,
}

export const SALT = 5;

export const NO_SECRET_KEY = 'ы';

export const BASE_KINOPOISK_URL = 'https://api.kinopoisk.dev';

export const enum MovieType {
    Movie = 'movie',
    Series = 'tv-series',
    Cartoon = 'cartoon',
    Anime = 'anime',
    AnimatedSeries = 'animated-series'
}
export const KINOPOISK_REQUEST_DATA_LIMIT = 250;

// const dataCount = {
//     movie: {
//         world: 1000,
//         rus: 250,
//         ussr: 250,
//         series: 500,
//     },
// }

export const SELECTED_MOVIES_FIELDS = [
    'votes.kp', 
    'movieLength', 
    'id', 
    'name','enName',
    'slogan',
    'year', 
    'budget.value', 'budget.currency',
    'poster.url', 'poster.previewUrl',
    'genres.name', 
    'countries.name', 
    'persons.id', 'persons.photo', 'persons.name',
];

export const enum Countries {
    USSR = 'СССР',
    RUS = 'Россия'
}
