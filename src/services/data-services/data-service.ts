// сервис получения данных с Кинопоиск Апи

import { Image } from "../../types/image-types";
import { Movie, Person } from "../../types/movie-types";

interface AllDataMovies {
    world: Movie[]
}

class DataService {
    movies: Movie[] = [];
    images: Image[] = [];
    // persons: PersonData

    GetData () {

    }
}