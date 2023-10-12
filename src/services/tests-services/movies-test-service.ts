import { OperationCategory } from "../../const/admin-const";
import { TEST_TYPE_MULTIPLIER, TEST_VARIANTS_COUNT, TestRatio, TestText, TestType } from "../../const/tests";
import { MovieWithCategory } from "../../types/movie-types";
import { ITest, ITestWithCategory } from "../../types/test-type";
import { filterMoviesWithSlogan, getAnswerAndVariants, getAnswerAndVariantsForBudget, getRandomYears, getSloganVariant, getTestList, getYearVariant } from "../../utils/test-utils";
import { getRandomItemFromList, getRandomNumberByMax, shuffleArray } from "../../utils/utils";






export class MoviesTestService {
    readonly movies: MovieWithCategory[];
    constructor(movies: MovieWithCategory[]) {
        this.movies = movies;
    }

    getGuessMovieByYearTest = (): ITest => {
        const {answer, preVariants} = getAnswerAndVariants(this.movies, 'year', 4);
        return {
            answer: answer.id,
            question: { year: answer.year },
            questionText: TestText[TestType.MovieByYear],
            variants: preVariants.map(({ id, enName, name, poster }) => 
                ({ id, enName, name, imageUrl: poster.previewUrl })),
            testType: TestType.MovieByYear
        }
    }

    getGuessYearByMovieTest = (): ITest => {
        const randomMovie = getRandomItemFromList(this.movies);
        const year = randomMovie.year;
        const randomYears = getRandomYears(year, 4)
        return {
            answer: year,
            question: getYearVariant(randomMovie),
            questionText: TestText[TestType.YearByMovie],
            variants: randomYears.map((year) =>({ year, id: year })),
            testType: TestType.YearByMovie
        }
    }

    getGuessMovieBySloganTest = (): ITest => {
        const {answer, preVariants} = getAnswerAndVariants(filterMoviesWithSlogan(this.movies), 'slogan', 4);
        return {
            answer: answer.id,
            question: { slogan: answer.slogan },
            questionText: TestText[TestType.MovieBySlogan],
            variants: preVariants.map(({ id, enName, name, poster, year }) => ({ enName, imageUrl: poster.previewUrl, name, year, id })),
            testType: TestType.MovieBySlogan
        }
    }

    getGuessSloganByMovieTest = (): ITest => {
        const {answer, preVariants} = getAnswerAndVariants(filterMoviesWithSlogan(this.movies), 'slogan', 4);
        const { enName, name, year, poster} = answer;
        return {
            answer: answer.slogan,
            question: { enName, imageUrl: poster.url, name, year },
            questionText: TestText[TestType.SloganByMovie],
            variants: preVariants.map(({slogan}) => ({slogan, id: slogan})),
            testType: TestType.SloganByMovie
        }
    }


    getGuessMovieByBudgetTest = (category: OperationCategory): ITest => {
        const currency = category === OperationCategory.World ? '$'  :  '₽';
        const {answer, preVariants} = getAnswerAndVariantsForBudget(filterMoviesWithSlogan(this.movies), currency);
        return {
            answer: answer.id,
            question: { },
            questionText: TestText[TestType.MovieByBudget],
            variants: preVariants.map(({ id, enName, name, poster, year }) => ({ enName, imageUrl: poster.previewUrl, name, year, id })),
            testType: TestType.MovieByBudget
        }
    }


    getGuessMovieByPersonTest = (): ITest => {

        const movies = this.movies.filter(({persons}) => persons.length > 3)
        const firstRandomMovie =  movies[getRandomNumberByMax(movies.length)]
        const randomPerson = firstRandomMovie.persons[getRandomNumberByMax(4)];
        const randomMovies = [firstRandomMovie];

        let count = 0
        while (randomMovies.length < TEST_VARIANTS_COUNT) {
            if (count > TEST_VARIANTS_COUNT * 10) {
                throw new Error('PersonTestService._getPersonsNotSomeFilmEqual: too many iterations')
            }

            const randomMovie = movies[getRandomNumberByMax(movies.length)];
            const personList = randomMovie.persons.map((item) => item.id);
            if (!personList.includes(randomPerson.id)) {
                randomMovies.push(randomMovie)
            }
            count++;
        }

    
        return {
            answer: firstRandomMovie.id,
            question: { imageUrl: randomPerson.photo, name: randomPerson.name },
            questionText: TestText[TestType.MovieByPerson],
            variants: shuffleArray(randomMovies.map(({ id, enName, name, poster, year }) => 
                ({ enName, imageUrl: poster.url, name, year, id }))) ,
            testType: TestType.MovieByPerson
        }
    }



    createAllTests = (category: OperationCategory) => {
        const movieByYearTests = getTestList(this.getGuessMovieByYearTest, TestRatio[category][TestType.MovieByYear], category);
        const yearByMovieTests = getTestList(this.getGuessYearByMovieTest, TestRatio[category][TestType.YearByMovie], category);
        const movieBySloganTests = getTestList(this.getGuessMovieBySloganTest, TestRatio[category][TestType.MovieBySlogan], category);
        const sloganByMovieTests = getTestList(this.getGuessSloganByMovieTest, TestRatio[category][TestType.SloganByMovie], category);
        const movieByBudgetTests = getTestList(() => this.getGuessMovieByBudgetTest(category), TestRatio[category][TestType.SloganByMovie], category);
        const movieByPersonTests = getTestList(this.getGuessMovieByPersonTest, TestRatio[category][TestType.MovieByPerson], category);
        return [
            ...movieByPersonTests, 
            ...movieByYearTests, 
            ...yearByMovieTests, 
            ...movieBySloganTests, 
            ...sloganByMovieTests, 
            ...movieByBudgetTests
        ];
    }
}