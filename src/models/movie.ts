import {Schema, model} from 'mongoose';
import { Budget, Name, Person, Poster,  Votes, MovieWithCategory } from '../types/movie-types';
import { TEST_CATEGORIES } from '../const/tests';


const BudgetSchema = new Schema<Budget>({
    currency: {type: String, required: true},
    value: {type: Number, required: true},
})

const PosterSchema = new Schema<Poster>({
    previewUrl: {type: String},
    url: {type: String},
})

const NameSchema = new Schema<Name>({
    name: {type: String}
})

const PersonSchema = new Schema<Person>({
    id: {type: Number, required: true},
    name: {type: String},
    photo: {type: String}
})

const VotesSchema = new Schema<Votes>({
    kp: {type: Number, required: true},
})



const MovieSchema = new Schema<MovieWithCategory>({
    budget: {type: BudgetSchema},
    countries: {type: [NameSchema]},
    enName: {type: String},
    genres: {type: [NameSchema]},
    id: {type: Number, required: true, unique: true},
    movieLength: {type: Number},
    name: {type: String, required: true},
    persons: {type: [PersonSchema], default: []},
    poster: {type: PosterSchema},
    slogan: {type: String},
    votes: {type: VotesSchema},
    year: {type: Number, required: true},
    category: {type: String, enum: TEST_CATEGORIES, required: true}
})

MovieSchema.index({id: 1, category: 1}, {unique: true}) // могут быть одни и те же персоны в разных категориях 

export const MovieModel = model('Movie', MovieSchema);