import { AnswerType, QuestionType } from "../../const/tests";
import { rusMovies } from "../../data/rus/rus-movies";
import { PersonWithMovieList } from "../../types/person-type";
import { ITest, IVariant } from "../../types/test-type";
import { shuffleArray } from "../../utils/utils";

const getRandomItemFromList = <T>(items: T[]) =>  items[Math.floor(Math.random() * items.length)];
const getRandomNumberByMax = (max: number) => Math.floor(Math.random() * max);




export class PersonQuestionService {
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
    _getPersonsNotSomeFilmEqual (personCount: number) {
        const firstRandomPerson = getRandomItemFromList(this.persons);
        const movie = firstRandomPerson.personMovies[getRandomNumberByMax(3)]
        const movieId = movie.movieId; // movieId 0/1/2 фильма у персоны
        const result = [firstRandomPerson];
        while (result.length < personCount) {
            const randomPerson = getRandomItemFromList(this.persons);
            const personMovieIdList = randomPerson.personMovies.map((item) => item.movieId)
            if (!personMovieIdList.includes(movieId)) {
                result.push(randomPerson)
            }
        }
        return {
            result: shuffleArray(result),
            answer: firstRandomPerson.personId,
            movie
        }
    }



    adaptPersonWithMoviesToPersonWithImages(person: PersonWithMovieList): IVariant {
        return {
            id: person.personId,
            imageUrl: person.personPhoto,
            name: person.personName
        }
    } 

    getTestGuessPersonByMovie(personCount: number): ITest {
        const {answer, movie, result} = this._getPersonsNotSomeFilmEqual(personCount);
        const variants = result.map(this.adaptPersonWithMoviesToPersonWithImages);
        const {movieId, movieName, moviePoster, movieYear, movieEnName} = movie
        const question = {
            id: movieId, 
            imageUrl: moviePoster, 
            name: movieName, 
            year: movieYear, 
            enName: movieEnName
        }
  
        return {
            answer,
            question,
            questionText: 'Кто из них имеет отношение к этому фильму',
            questionType: QuestionType.OneMovieWithImage,
            variantsType: AnswerType.OnePersonWitImage,
            variants
        }
    }

    getTestsGuessPersonByMovie(questCount: number, personCount: number) {
        return new Array(questCount).fill(0).map(() => this.getTestGuessPersonByMovie(personCount))
    }
}


