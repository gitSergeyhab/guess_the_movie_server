import { AnswerType, QuestionType } from "../const/tests";

export interface IVariant {
    id: number;
    enName?: string;
    name?: string;
    year?: number;
    imageUrl?: string;
    slogan?: string;
}

export interface ITest {
    questionText: string;
    questionType: QuestionType;
    question: IVariant;
    variantsType: AnswerType;
    variants: IVariant[]
    answer: string|number;
}

// VARIANTS
// movie - image 
// image by movie  // угадать какой из кадров есть в фильме



//  movie by image  // угадать  фильме по кадру


// year by movie - + + oldest / newest


// actor by photo _ +



// actor by movie _ +






// MOVIE with max budget  

// slogan _+

// max movieLength