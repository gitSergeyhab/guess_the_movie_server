import { Types } from "mongoose";
import { OperationCategory } from "../const/admin-const";
import { AnswerType, QuestionType, TestType } from "../const/tests";

export interface IVariant {
    enName?: string;
    name?: string;
    year?: number;
    imageUrl?: string;
    slogan?: string;
}

export interface ITest {
    questionText: string;
    // questionType: QuestionType;
    question: IVariant;
    // variantsType: AnswerType;
    variants: IVariant[]
    answer: string|number;
    testType: TestType
}


export interface ITestWithCategory extends ITest {
    category: OperationCategory
}

export interface ITestFromMongo extends ITest {
     _id: Types.ObjectId;
     category: OperationCategory
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