import { Image } from "../../types/image-types";
import { Movie } from "../../types/movie-types"

export class FrameMovieQuestionService {
    readonly movies: Movie[];
    readonly images: Image[];
    readonly imagesCount: number;
    readonly moviesCount: number;
    constructor (movieList: Movie[], imageList: Image[]) {
        this.movies = movieList;
        this.images = imageList;
        this.imagesCount = imageList.length;
        this.moviesCount = movieList.length;

    }

    _getRandomImage = () => {
        return this.images[Math.floor(Math.random() *  this.imagesCount )];
    }

    _getRandomImages = (count: number) => {
        return new Array(count).fill(0).map(() => this._getRandomImage())
    }

    _getUniqueMovieIdImages = (imagesData: Image[]): Image[] => {
        const dict = imagesData.reduce((acc, item) => {
            if (!acc[item.movieId]) {
                acc[item.movieId] = item
            }
            return acc;
        }, {});
    
        return Object.values(dict);
    }

    _getDifferentMovieImages = (count: number) => {
        const imageList = this._getRandomImages(count * 2);
        console.log({imageList})
        return this._getUniqueMovieIdImages(imageList).slice(0, count);
    }

    _getFindFrameFromMovieQuestion = (frameCount: number) => {
        const images = this._getDifferentMovieImages(frameCount);
        const correctImage = images[0]
        const movie = this.movies.find((item) => item.id === correctImage.movieId);
        const {name, enName, year} = movie;
        const variants = images.map(({id, previewUrl, url}) => ({id, previewUrl, url}))
    
        return {
            variants,
            answer: variants[0],
            question: {
                text: 'Найдите кадр из фильма',
                image: null,
                name, enName, year
            } 
        }
    }

    getFindFrameFromMovieQuestions = (frameCount: number, questionCount: number) => {
        return new Array(5).fill(0).map(() => this._getFindFrameFromMovieQuestion(4))
    }

}