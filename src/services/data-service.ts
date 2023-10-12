import { OperationCategory, OperationContent } from "../const/admin-const";
import { ApiError } from "../middlewares/error-middleware";
import { AdminDataRequestQuery } from "../types/admin-types";
import { kinopoiskApiDataService } from "./kinopoisk-api-service";
import { mongoService } from "./mongo-service";
import { transformDataService } from "./transform-data-service";


//сервис записи/удаления данных
class DataService {
    async writeMoviesToDb (category: OperationCategory) {
        const movies = await kinopoiskApiDataService.readMovies(category);
        console.log(movies.length, 'movies.length');
        const adaptedMovies = transformDataService.addCategoryToMovies(movies, category);
        console.log(adaptedMovies.length, 'adaptedMovies.length');
        await mongoService.writeMovies(adaptedMovies);
    }

    async writeImagesToDb (category: OperationCategory) {
        const movies = await mongoService.readMovies(category);
        const indexes = movies.map((item) => item.id);
        const images = await kinopoiskApiDataService.readImageData(indexes);
        const movieImages = transformDataService.getMovieImagesList(movies, images);
        await mongoService.writeMovieImage(movieImages);
    }

    async writePersonsToDb (category: OperationCategory) {
        const movies = await mongoService.readMovies(category);
        const persons = transformDataService.convertMoviesToPersons({movies})
        await mongoService.writePersons(persons);
    }

    async writeDataToDb ({category, content}: AdminDataRequestQuery) {
        switch (content) {
            case OperationContent.Movies: return await this.writeMoviesToDb(category);
            case OperationContent.Images: return await this.writeImagesToDb(category);
            case OperationContent.Persons: return await this.writePersonsToDb(category);
            default: throw ApiError.BadRequest('DataService writToDb: content Error')
        }
    }

    async deleteMoviesFromDb  (category: OperationCategory) {
        await mongoService.deleteMovies(category);
    }

    async deleteImagesFromDb  (category: OperationCategory) {
        await mongoService.deleteMovieImages(category);
    }

    async deletePersonsFromDb  (category: OperationCategory) {
        await mongoService.deletePersons(category);
    }

    async deleteDataFromDb ({category, content}: AdminDataRequestQuery) {
        switch (content) {
            case OperationContent.Movies: return await this.deleteMoviesFromDb(category);
            case OperationContent.Images: return await this.deleteImagesFromDb(category);
            case OperationContent.Persons: return await this.deletePersonsFromDb(category);
            default: throw ApiError.BadRequest('DataService writToDb: content Error')
        }
    }


    async readDataFromDb ({category, content}: AdminDataRequestQuery) {
        switch (content) {
            case OperationContent.Movies: return await mongoService.readMovies(category);
            case OperationContent.Images: return await mongoService.readMovieImages(category);
            case OperationContent.Persons: return  await mongoService.readPersons(category);
            default: throw ApiError.BadRequest('DataService writToDb: content Error')
        }
    }
}

export const dataService = new DataService();