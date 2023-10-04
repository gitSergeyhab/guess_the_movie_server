
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

// export const AnswerQuestionType = {
//     [QuestionType.OneMovieWithImage]: [AnswerType.OnePersonWitImage, AnswerType.Year, AnswerType.Slogan],
//     [QuestionType.OneMovieWithOutImage]: [AnswerType.OneImageWithOutMovie],
//     [QuestionType.OneImageWithOutMovie]: [AnswerType.OneMovieWithImage],

//     [QuestionType.OnePersonWitImage]: [AnswerType.OneMovieWithImage],
//     [QuestionType.OneImageWithOutPerson]: [AnswerType.OnePersonWitOutImage],
//     [QuestionType.OnePersonWitOutImage]: [AnswerType.OneImageWithOutPerson],

//     [QuestionType.Year]: [AnswerType.OneMovieWithImage],
//     [QuestionType.MaxMovieLength]: [AnswerType.OneMovieWithImage],
//     [QuestionType.MaxBudget]: [AnswerType.OneMovieWithImage],
//     [QuestionType.Slogan]: [AnswerType.OneMovieWithImage],
// } 
