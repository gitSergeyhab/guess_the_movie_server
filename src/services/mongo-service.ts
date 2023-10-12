import { OperationCategory } from "../const/admin-const";
import { MovieModel } from "../models/movie";
import { MovieImageModel } from "../models/movie-with-images";
import { PersonModel } from "../models/person";
import { TestModel } from "../models/tests";
import { MovieWithCategory, MovieWithImageList } from "../types/movie-types";
import { PersonWithMovieList } from "../types/person-type";
import { ITestFromMongo, ITestWithCategory } from "../types/test-type";



class MongoService {
    async readMovies(category: OperationCategory) {
        return await MovieModel.find({category}).exec() as MovieWithCategory[];
        // return await MovieModel.aggregate([{$match: {category}}, {$sample: {size: 10}}])
    }

    async readMovieImages(category: OperationCategory) {
        return await MovieImageModel.find({category}).exec() as MovieWithImageList[];
    }

    async readPersons(category: OperationCategory) {
        return await PersonModel.find({category}).exec() as PersonWithMovieList[];
    }


    async readTests(category: OperationCategory) {
        return await TestModel.find({category}).exec() as ITestFromMongo[];
    }

    async readRandomTests(category: OperationCategory, count: number) {
        return await TestModel.aggregate([{$match: {category}}, {$sample: {size: count}}])
    }


    async writeMovies(movies: MovieWithCategory[]) {
        await MovieModel.insertMany(movies);
    }

    async writeMovieImage(movies: MovieWithImageList[]) {
        await MovieImageModel.insertMany(movies);
    }

    async writePersons(persons: PersonWithMovieList[]) {
        await PersonModel.insertMany(persons);
    }

    async writeTests(tests: ITestWithCategory[]) {
        await TestModel.insertMany(tests);
    }




    async deleteMovies(category: OperationCategory) {
        await MovieModel.deleteMany({category});
    }

    async deleteMovieImages(category: OperationCategory) {
        await MovieImageModel.deleteMany({category});
    }

    async deletePersons(category: OperationCategory) {
        await PersonModel.deleteMany({category});
    }

}


export const mongoService = new MongoService();