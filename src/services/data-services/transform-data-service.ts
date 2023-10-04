import { Movie, Person } from "../../types/movie-types";
import { PersonWithMovieList, PersonWithMovies } from "../../types/person-type";


const getSimpleMovieData = (movie: Movie) => ({
    movieId: movie.id,
    movieName: movie.name,
    moviePoster: movie.poster.previewUrl,
    movieYear: movie.year,
    movieEnName: movie.enName
})

const extractPersonFromMovie = (movie: Movie, person: Person): PersonWithMovies => ({
    personId: person.id,
    personName: person.name,
    personPhoto: person.photo,
    personMovies: {[movie.id]: getSimpleMovieData(movie)}
    
})

const getPersonWithMovieList = (person: PersonWithMovies): PersonWithMovieList => ({
    personId: person.personId,
    personName: person.personName,
    personPhoto: person.personPhoto,
    personMovies: Object.values(person.personMovies)
}) 

class TransformDataService {
    /**
     * 
     * @param movies 
     * @param slicePersonCount // нужен, чтобы отсечь персон внизу списка - эпизоды, дубляж и тп
     * @param sliceMovieCount // нужен, чтобы отсечь персон , которые ржко встречаются
     * @returns 
     */
    getPersonsFromMovies (movies: Movie[], slicePersonCount?: number, sliceMovieCount?: number) {
        const personDict = movies.reduce((acc, movie) => {
            movie.persons.slice(0, slicePersonCount || 10).forEach((person) => {
                const personId = person.id;
                if (!acc[personId]) {
                    acc[personId] = extractPersonFromMovie(movie, person);
                } else {
                    acc[personId].personMovies[movie.id] = getSimpleMovieData(movie)
                }
            })
            return acc;
        }, {} as {[key: number]: PersonWithMovies})
        const personList = Object.values(personDict) as PersonWithMovies[];
        const personListWithMovieList = personList
            .filter((item) => item.personName && item.personPhoto)
            .map(getPersonWithMovieList)
            .sort((a,b) => b.personMovies.length - a.personMovies.length);
        return personListWithMovieList.filter((item) => item.personMovies.length > (sliceMovieCount || 2));

    }
}

export const transformDataService = new TransformDataService()
//13360
//3674
//1191 - 1
//672 - 2