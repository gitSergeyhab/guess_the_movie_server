import { OperationCategory } from "../../const/admin-const";
import { TEST_VARIANTS_COUNT, TestRatio, TestText, TestType } from "../../const/tests";
import { Image } from "../../types/image-types";
import { Movie, MovieWithImageList } from "../../types/movie-types"
import { ITest, IVariant } from "../../types/test-type";
import { getTestList } from "../../utils/test-utils";
import { getRandomNumberByMax, shuffleArray } from "../../utils/utils";


const getFrameFromImages = (images: Image[])  => {
    const { url, id } = images[getRandomNumberByMax(images.length)];
    return { imageUrl: url, id  }
}

export class FrameMovieTestService {
    readonly movies: MovieWithImageList[];

    constructor (movieList: MovieWithImageList[]) {
        this.movies = movieList.filter(({images}) => images.length);
    }

    getVariants = () => {
        const movies:MovieWithImageList[] = []
        let count = 0
        while (movies.length < TEST_VARIANTS_COUNT) {
            if (count > TEST_VARIANTS_COUNT * 10) {
                throw new Error('FrameMovieTestService.createGuessMovieByFrame: too many iterations')
            }
            const randomMovie = this.movies[getRandomNumberByMax(this.movies.length)];
            if (!movies.map((item) => item.id).includes(randomMovie.id) ) {
                movies.push(randomMovie)
            }
            count++;
        }
        return movies
    }

    createGuessMovieByFrameTest = (): ITest => {
        const movies = this.getVariants();
        const answerMovie = movies[getRandomNumberByMax(movies.length)]
        const randomFrame = answerMovie.images[getRandomNumberByMax(answerMovie.images.length)];
        return {
            answer: answerMovie.id,
            question: { imageUrl: randomFrame.url },
            questionText: TestText[TestType.MovieByFrame],
            variants: shuffleArray(movies.map(({id, name, enName, year}) => ({id, name, enName, year}))) ,
            testType: TestType.MovieByFrame
        }
    }
    
    createGuessFrameByMovieTest = (): ITest => {
        const movies = this.getVariants();
        const answerMovie = movies[getRandomNumberByMax(movies.length)]
        const { name, year, enName } = answerMovie;
        const answerFrame = getFrameFromImages(answerMovie.images)
        const frames = movies
            .filter(({id}) => id !== answerMovie.id)
            .map(({ images }) => getFrameFromImages(images));

        return {
            answer: answerFrame.id,
            question: {  name, year, enName  },
            questionText: TestText[TestType.FrameByMovie],
            variants: shuffleArray([...frames, answerFrame]),
            testType: TestType.FrameByMovie
        }
    }

    createAllTests = (category: OperationCategory) => {
        const movieByYearTests = getTestList(this.createGuessFrameByMovieTest, TestRatio[category][TestType.FrameByMovie]);
        const yearByMovieTests = getTestList(this.createGuessMovieByFrameTest, TestRatio[category][TestType.MovieByFrame]);
        return [ ...movieByYearTests, ...yearByMovieTests ];
    }
}