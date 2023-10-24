import { OperationCategory } from "../const/admin-const";
import { MovieModel } from "../models/movie";
import { MovieImageModel } from "../models/movie-with-images";
import { PersonModel } from "../models/person";
import { TestModel } from "../models/tests";

const mongoQueryForDataCountByCategory = {$group: { _id:  "$category", count: { $sum: 1 }}}

const mongoQueryForTestCountByCategoryAndType = {$group: 
    { _id:  {category: "$category", testType: "$testType"}, count: { $sum: 1 }}
}
export interface StatsCategoryCount {
    _id: OperationCategory, count: number
}


export interface ID {
    category: OperationCategory;
    testType: string;
}


export interface StatsTestCount {
    _id:   ID;
    count: number;
}


class StatsService {
    async getMoviesStats() {
        return await MovieModel.aggregate([mongoQueryForDataCountByCategory]);
    }

    async getPersonsStats() {
        return await PersonModel.aggregate([mongoQueryForDataCountByCategory]);
    }

    async getMovieImagesStats() {
        return await MovieImageModel.aggregate([mongoQueryForDataCountByCategory]);
    }

    async getDataStats() {
        const movies: StatsCategoryCount[] = await this.getMoviesStats();
        const persons: StatsCategoryCount[] = await this.getPersonsStats();
        const images: StatsCategoryCount[] = await this.getMovieImagesStats();
        return {movies, persons, images}
    }

    async getTestStats():Promise<StatsTestCount[]> {
        return await TestModel.aggregate([mongoQueryForTestCountByCategoryAndType])
    }
}


export const statsService = new StatsService()