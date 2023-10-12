import { OperationCategory } from "./admin-const";

export const enum QuestionType {
    OneMovieWithImage = 'OneMovieWithImage',
    OneMovieWithOutImage = 'OneMovieWithoutImage',
    OneImageWithOutMovie = 'OneImageWithOutMovie',

    OnePersonWitImage = 'OnePersonWitImage',
    OnePersonWitOutImage = 'OnePersonWitOutImage',
    OneImageWithOutPerson = 'OneImageOfPerson',

    Year = 'Year',
    MaxMovieLength = 'MaxMovieLength',
    MaxBudget = 'MaxBudget',
    Slogan = 'Slogan'
}

export const enum AnswerType {
    OneMovieWithImage = 'OneMovieWithImage',
    OneMovieWithOutImage = 'OneMovieWithoutImage',
    OneImageWithOutMovie = 'OneImageWithOutMovie',
    OnePersonWitImage = 'OnePersonWitImage',
    OnePersonWitOutImage = 'OnePersonWitOutImage',
    OneImageWithOutPerson = 'OneImageOfPerson',
    Year = 'Year',
    Slogan = 'Slogan'
}

export const enum TestType {
    PersonByMovie = 'PersonByMovie',
    MovieByPerson = 'MovieByPerson',
    MovieByFrame = 'MovieByFrame',
    FrameByMovie = 'FrameByMovie',
    PersonByPhoto = 'PersonByPhoto',
    PhotoByPerson = 'PhotoByPerson',
    YearByMovie = 'YearByMovie',
    MovieByYear = 'MovieByYear',
    SloganByMovie = 'SloganByMovie',
    MovieBySlogan = 'MovieBySlogan',
    MovieByBudget = 'MovieByBudget'
}

export const TEST_TYPE_MULTIPLIER = 25;
export const TEST_VARIANTS_COUNT = 4;

export const TestRatio = {//293
    [OperationCategory.Ussr]: {//88
        [TestType.PersonByMovie]: 16,
        [TestType.MovieByPerson]: 16,
        [TestType.MovieByFrame]: 16,
        [TestType.FrameByMovie]: 16,
        [TestType.PersonByPhoto]: 9,
        [TestType.PhotoByPerson]: 9,
        [TestType.YearByMovie]: 3,
        [TestType.MovieByYear]: 3
    },
    [OperationCategory.Rus]: {//77
        [TestType.PersonByMovie]: 14,
        [TestType.MovieByPerson]: 14,
        [TestType.MovieByFrame]: 14,
        [TestType.FrameByMovie]: 14,
        [TestType.PersonByPhoto]: 6,
        [TestType.PhotoByPerson]: 6,
        [TestType.YearByMovie]: 3,
        [TestType.MovieByYear]: 3,
        [TestType.MovieByBudget]: 1,
        [TestType.MovieBySlogan]: 1,
        [TestType.SloganByMovie]: 1
    },
    [OperationCategory.World]: {//128
        [TestType.PersonByMovie]: 22,
        [TestType.MovieByPerson]: 22,
        [TestType.MovieByFrame]: 22,
        [TestType.FrameByMovie]: 22,
        [TestType.PersonByPhoto]: 13,
        [TestType.PhotoByPerson]: 13,
        [TestType.YearByMovie]: 4,
        [TestType.MovieByYear]: 4,
        [TestType.MovieByBudget]: 2,
        [TestType.MovieBySlogan]: 2,
        [TestType.SloganByMovie]: 2
    }
}

export const TestText = {
    [TestType.PersonByMovie]: 'Кто снимался в этом филбме',
    [TestType.MovieByPerson]: 'В каком фильме он снимался',
    [TestType.MovieByFrame]: 'Угадайте фильм по кадру',
    [TestType.FrameByMovie]: 'Угадайте кадр по фильму',
    [TestType.PersonByPhoto]: 'Кто на фото',
    [TestType.PhotoByPerson]: 'На каком фото',
    [TestType.YearByMovie]: 'В каком году был снят фильм / первый сезон сериала',
    [TestType.MovieByYear]: 'Какой фильм / первый сезон какого сериала снят в этом году',
    [TestType.MovieByBudget]: 'У какого из перечисленных фильмов самый большой бюджет ',
    [TestType.MovieBySlogan]: 'Угадайте фильм по слогану',
    [TestType.SloganByMovie]: 'Угадайте слоган по фильму',
}

export const TEST_CATEGORIES = [OperationCategory.Rus,  OperationCategory.Ussr, OperationCategory.World]


export const TEST_TYPES: TestType[]  = [
    TestType.FrameByMovie, 
    TestType.MovieByBudget,
    TestType.MovieByFrame,
    TestType.MovieByPerson,
    TestType.MovieBySlogan,
    TestType.MovieByYear,
    TestType.PersonByMovie,
    TestType.PersonByPhoto,
    TestType.PhotoByPerson,
    TestType.SloganByMovie,
    TestType.YearByMovie, 
]