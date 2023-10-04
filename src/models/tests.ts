import {Schema, model} from 'mongoose';
import { AnswerType, QuestionType } from '../const/tests';
import { ITest, IVariant } from '../types/test-type';




const Variant = new Schema<IVariant>({
    id: {type: Number, required: true},
    enName: {type: String},
    name: {type: String},
    year: {type: Number},
    imageUrl: {type: String},
    slogan: {type: String},
})


// !!! ЭТО НЕ ТЕСТОВАЯ МОДЕЛЬ. ЭТО МОДЕЛЬ CRUD ТЕСТОВ  !!!
const Test = new Schema<ITest>({
    questionText: {type: String, required: true},
    questionType: {type: String, required: true},
    question: {type: Variant, required: true},
    variantsType: {type: String, required: true},
    variants: {type: [Variant], required: true},
    answer: {type: Number, required: true},
})

export const RusTestModel = model('RusTests', Test);
export const SerialTestModel = model('SerialTest', Test);
export const WorldTestModel = model('WorldTest', Test);
