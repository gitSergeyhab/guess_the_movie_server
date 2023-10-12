import { Types } from "mongoose";
import { OperationCategory } from "../const/admin-const";
import { AnswerType, QuestionType, TestType } from "../const/tests";

export interface IVariant {
    id?: string|number;
    enName?: string;
    name?: string;
    year?: number;
    imageUrl?: string;
    slogan?: string;
}

export interface ITest {
    questionText: string;
    question: IVariant;
    variants: IVariant[]
    answer: string|number;
    testType: TestType
}


export interface ITestWithCategory extends ITest {
    category: OperationCategory;
}

export interface ITestFromMongo extends ITest {
     _id: Types.ObjectId;
     category: OperationCategory
}
