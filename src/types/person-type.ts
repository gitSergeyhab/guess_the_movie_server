import { OperationCategory } from "../const/admin-const"


export interface SimpleMovie {
        movieId: number,
        movieName: string,
        movieEnName?: string|null,
        moviePoster: string,
        movieYear: number
}

export interface SimpleMovieDict {
    [id: number]: SimpleMovie
}

export interface PersonWithMovies {
    personId: number,
    personName: string,
    personPhoto: string,
    personMovies: SimpleMovieDict,
    category: OperationCategory
}

export interface PersonWithMovieList {
    personId: number,
    personName: string,
    personPhoto: string,
    personMovies: SimpleMovie[],
    category: OperationCategory
}