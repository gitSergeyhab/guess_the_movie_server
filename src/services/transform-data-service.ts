import { OperationCategory } from "../const/admin-const";
import { Image } from "../types/image-types";
import { Movie, MovieWithCategory, MovieWithImageList, Person } from "../types/movie-types";
import { PersonWithMovieList, PersonWithMovies } from "../types/person-type";


interface GetPersonsFromMovies {
    movies: MovieWithCategory[];
    slicePersonCount?: number;
    sliceMovieCount?: number
} 

const getSimpleMovieData = (movie: Movie) => ({
    movieId: movie.id,
    movieName: movie.name,
    moviePoster: movie.poster.previewUrl,
    movieYear: movie.year,
    movieEnName: movie.enName
})

const extractPersonFromMovie = (movie: MovieWithCategory, person: Person): PersonWithMovies => ({
    personId: person.id,
    personName: person.name,
    personPhoto: person.photo,
    category: movie.category,
    personMovies: {[movie.id]: getSimpleMovieData(movie)}
})

const getPersonWithMovieList = (person: PersonWithMovies): PersonWithMovieList => ({
    personId: person.personId,
    personName: person.personName,
    personPhoto: person.personPhoto,
    personMovies: Object.values(person.personMovies), 
    category: person.category,
})



class TransformDataService {

    _filterMovies = (movies: MovieWithCategory[]) => movies
        .filter(({id, name, year, votes}) => id && name && year && votes )

    _filterMovieImages = (movies: MovieWithImageList[]) => movies
        .filter(({id, name, year}) => id && name && year )

    _filterPersons = (persons: PersonWithMovieList[]) => persons
        .filter(({personId, personName}) => personId && personName )



    _getPersonsWithMovieList = (personList: PersonWithMovies[]): PersonWithMovieList[] => {
        return personList
            .filter((item) => item.personName && item.personPhoto)
            .map( getPersonWithMovieList)
            .sort((a,b) => b.personMovies.length - a.personMovies.length);
    }

    _getPersonsDict = (movies: MovieWithCategory[], slicePersonCount?: number): {[key: number]: PersonWithMovies}  => {
        return movies.reduce((acc, movie) => {
            movie.persons.slice(0, slicePersonCount || 7).forEach((person) => {
                const personId = person.id;
                if (!acc[personId]) {
                    acc[personId] = extractPersonFromMovie(movie, person);
                } else {
                    acc[personId].personMovies[movie.id] = getSimpleMovieData(movie)
                }
            })
            return acc;
        }, {} as {[key: number]: PersonWithMovies})
    }
    /**
     * 
     * @param movies 
     * @param slicePersonCount  нужен, чтобы отсечь персон внизу списка - эпизоды, дубляж и тп
     * @param sliceMovieCount  нужен, чтобы отсечь персон , которые ржко встречаются
     * @returns 
     */
    convertMoviesToPersons ({ movies, sliceMovieCount, slicePersonCount}: GetPersonsFromMovies) {
        const personDict = this._getPersonsDict(movies, slicePersonCount)
        const personList = Object.values(personDict) as PersonWithMovies[];
        const personListWithMovieList = this._getPersonsWithMovieList(personList)
        const persons = personListWithMovieList.filter((item) => item.personMovies.length > (sliceMovieCount || 2));
        return this._filterPersons(persons);
    }


    getMovieImagesList(movies: MovieWithCategory[], imageList: Image[]): MovieWithImageList[] {
        const movieImages = movies.map((movie) => {
            const {id, enName, name, year, category} = movie;
            const images = imageList.filter((item) => item.movieId === id)
            return {category, id, name, year, enName, images}
        })

        return this._filterMovieImages(movieImages)
    }

    addCategoryToMovies(movies: Movie[], category: OperationCategory): MovieWithCategory[] {
        return this._filterMovies(movies.map((movie) => ({...movie, category}))) 
    }
}

export const transformDataService = new TransformDataService()
//13360
//3674
//1191 - 1
//672 - 2