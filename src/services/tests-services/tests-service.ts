import { OperationCategory, OperationContent } from "../../const/admin-const"
import {  MovieWithCategory, MovieWithImageList } from "../../types/movie-types";
import { PersonWithMovieList } from "../../types/person-type";
import { mongoService } from "../mongo-service";
import { FrameMovieTestService } from "./frame-movie-test-service";
import { MoviesTestService } from "./movies-test-service";
import { PersonTestService } from "./person-test-service";



interface CreateTests {
    category: OperationCategory;
    movies: MovieWithCategory[];
    persons: PersonWithMovieList[];
    movieImages: MovieWithImageList[]; 
    
}

class TestService {


    async createTests({category, movieImages, movies, persons}: CreateTests) {

        const moviesLength = movies.length;
        const personsLength = persons.length;
        const movieImagesLength = movieImages.length;
        if (moviesLength < 10 || personsLength < 10 || movieImagesLength < 10) {
            throw new Error (`too little data: ${JSON.stringify({moviesLength, personsLength, movieImagesLength})} for tests creating`)
        } 
        
        const moviesTestService = new MoviesTestService(movies);
        const personTestService = new PersonTestService(persons);
        const frameMovieTestService = new FrameMovieTestService(movieImages);
        return [
            ...moviesTestService.createAllTests(category),
            ...personTestService.createAllTests(category),
            ...frameMovieTestService.createAllTests(category)
            ]
    }

}

export const testService = new TestService()
