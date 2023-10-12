import { TEST_TYPE_MULTIPLIER } from "../const/tests";
import { MovieWithCategory } from "../types/movie-types";
import { ITest } from "../types/test-type";
import { getCurrentYear, getRandomItemFromList, getRandomItems, getRandomNumberByMax, shuffleArray } from "./utils";

export const getRandomUniqueArray = <T>(array: T[], length: number): T[] => {
    const newArray: {data: T, index: number}[] = [];

    const minLength = length > array.length ? array.length : length; // чтоб не уйти в бесконечный цикл

    let i = 0
    while (newArray.length < minLength) {
        if (i> minLength * 3) {
            throw new Error('Too many iterations in getRandomUniqueArray')
        }
        const index = getRandomNumberByMax(array.length);
        const newItem = {index, data: array[index]}
        if (!newArray.map(({index}) => index).includes(index)) {
            newArray.push(newItem)
        }
        i++;
    }
    return newArray.map(({data}) => data);
};

export const getRandomUniqueArrayFromArray = <T>(array: T[], idName: string, length: number): T[] => {
    const newArray: T[] = [];

    const minLength = length > array.length ? array.length : length; // чтоб не уйти в бесконечный цикл

    let i = 0
    while (newArray.length < minLength) {
        if (i> minLength * 3) {
            throw new Error('Too many iterations in getRandomUniqueMovieYears')
        }
        const indexes: (string|number)[] = newArray.map((item) => item[idName]);
        const randomItem = getRandomItemFromList(array);
        if (!indexes.includes(randomItem[idName])) {
            newArray.push(randomItem)
        }
        i++;
    }
    return newArray;
};

export const getYearVariant =  ({id, category, enName, name, poster}: MovieWithCategory) => ({id, category, enName, name, imageUrl: poster.url})
export const getSloganVariant =  ({id, category, enName, name, poster, year}: MovieWithCategory) => ({id, category, enName, name, year, imageUrl: poster.url })


export const getAnswerAndVariants =  <T>(array: T[], idName: string, length: number) => {
    const preVariants = getRandomUniqueArrayFromArray(array, idName, length);
    if (preVariants.length < length-1) {
        throw new Error('слишком мало вариантов для теста')
    }
    const answer = preVariants[getRandomNumberByMax(preVariants.length)];
    

    return {preVariants, answer}
}


export const getTestList = (createTestFn: () => ITest, ratio: number) => 
    ratio ? new Array(ratio * 2).fill(null).map(createTestFn) : [];


const YEAR_RANGE = 5;    
export const getRandomYears = (year: number, count: number) => {
    const before = new Array(YEAR_RANGE).fill(0).map((_, i) => i + year - YEAR_RANGE);
    const after = new Array(YEAR_RANGE).fill(0).map((_, i) => i + year + 1).filter((y) => y < getCurrentYear());
    const items =  getRandomItems([...after, ...before], count - 1);
    return shuffleArray([year, ...items]);
}

const RUS_TEXT_PATTERN = /[еаоэяиюёу]/i;
export const filterMoviesWithSlogan = (movies: MovieWithCategory[]) => 
    movies.filter(({slogan}) => slogan && RUS_TEXT_PATTERN.test(slogan))


    // $  /  ₽
export const filterMoviesWithBudget = (movies: MovieWithCategory[], currency: string) => 
    movies.filter(({budget}) => budget && budget.value && budget.currency === currency)
    
export const sortMoviesByBudget = (movies: MovieWithCategory[]) => 
    [...movies].sort((a, b) => b.budget?.value - a.budget?.value)


export const getAnswerAndVariantsForBudget = (movies: MovieWithCategory[], currency: string) => {
    const filteredMovies = filterMoviesWithBudget(movies, currency);
    if (filteredMovies.length < 7) {
        throw new Error('слишком мало вариантов для теста')
    }
    const randomMovies =  getRandomItems(filteredMovies, 4);
    const sortedMovies = sortMoviesByBudget(randomMovies);

    const answer =  sortedMovies[0];

    return {preVariants: shuffleArray(sortedMovies), answer}

}