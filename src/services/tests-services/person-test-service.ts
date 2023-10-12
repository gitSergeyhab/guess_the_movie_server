import { OperationCategory } from "../../const/admin-const";
import { TEST_VARIANTS_COUNT, TestRatio, TestText, TestType } from "../../const/tests";
import { PersonWithMovieList } from "../../types/person-type";
import { ITest, IVariant } from "../../types/test-type";
import { getRandomUniqueArray, getRandomUniqueArrayFromArray, getTestList } from "../../utils/test-utils";
import { getRandomItemFromList, getRandomNumberByMax, shuffleArray } from "../../utils/utils";




export class PersonTestService {
    readonly persons: PersonWithMovieList[] = [];

    constructor(persons: PersonWithMovieList[]) {
        this.persons = persons;
    }

    /**
     * берет любую персону и любой фильм у нее (0/1/2)
     * добавляет персоны без этого фильма
     * возвращает список персон, правильную персону и фильм 
     * @param personCount 
     */
    _getPersonsNotSomeFilmEqual = () => {
        const firstRandomPerson = getRandomItemFromList(this.persons);
        const movie = firstRandomPerson.personMovies[getRandomNumberByMax(3)]
        const movieId = movie.movieId; // movieId 0/1/2 фильма у персоны
        const result = [firstRandomPerson];
        let count = 0
        while (result.length < TEST_VARIANTS_COUNT) {
            if (count > TEST_VARIANTS_COUNT * 10) {
                throw new Error('PersonTestService._getPersonsNotSomeFilmEqual: too many iterations')
            }
            const randomPerson = getRandomItemFromList(this.persons);
            const personMovieIdList = randomPerson.personMovies.map((item) => item.movieId)
            if (!personMovieIdList.includes(movieId)) {
                result.push(randomPerson)
            }
            count++;
        }
        return {
            result: shuffleArray(result),
            answer: firstRandomPerson.personId,
            movie
        }
    }

    createGuessPersonByMovieTest = (): ITest => {
        const {answer, movie, result} = this._getPersonsNotSomeFilmEqual();
        const variants = result.map(({personId, personPhoto, personName}) => ({id: personId, imageUrl: personPhoto, name: personName}));
        const {movieName, moviePoster, movieYear, movieEnName} = movie
        const question = {
            // id: String(movieId), 
            imageUrl: moviePoster, 
            name: movieName, 
            year: movieYear, 
            enName: movieEnName
        }
  
        return {
            answer,
            question,
            questionText: TestText[TestType.PersonByMovie],
            variants,
            testType: TestType.PersonByMovie
        }
    }


    createGuessPersonByPhotoTest = (): ITest => {
        const persons = getRandomUniqueArray(this.persons, TEST_VARIANTS_COUNT)
        const answerPerson = persons[getRandomNumberByMax(persons.length)]
        return {
            answer: answerPerson.personId,
            question: { imageUrl: answerPerson.personPhoto },
            questionText: TestText[TestType.PersonByPhoto],
            variants: persons.map(({personId, personName}) => ({id: personId, name: personName})) ,
            testType: TestType.PersonByPhoto
        }
    }
    
    createGuessPhotoByPersonTest = (): ITest => {
        const persons = getRandomUniqueArray(this.persons, TEST_VARIANTS_COUNT)
        const answerPerson = persons[getRandomNumberByMax(persons.length)]
        return {
            answer: answerPerson.personId,
            question: { name: answerPerson.personName },
            questionText: 'на каком фото изображен',
            variants: persons.map(({personId, personPhoto}) => ({id: personId, imageUrl: personPhoto})) ,
            testType: TestType.PhotoByPerson
        }
    }

    createAllTests = (category: OperationCategory) => {
        const personByMovieTests = getTestList(this.createGuessPersonByMovieTest, TestRatio[category][TestType.PersonByMovie], category);
        const personByPhotoTests = getTestList(this.createGuessPersonByPhotoTest, TestRatio[category][TestType.PersonByPhoto], category);
        const photoByPersonTests = getTestList(this.createGuessPhotoByPersonTest, TestRatio[category][TestType.PhotoByPerson], category);
        return [...personByMovieTests,  ...personByPhotoTests, ...photoByPersonTests
        ]
    }
}


