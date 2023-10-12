import {Schema, model} from 'mongoose';
import { PersonWithMovieList, SimpleMovie } from '../types/person-type';
import { TEST_CATEGORIES } from '../const/tests';


const PersonMovies = new Schema<SimpleMovie>({
    movieEnName: {type: String},
    movieId: {type: Number, required: true},
    movieName: {type: String, required: true},
    moviePoster: {type: String},
    movieYear: {type: Number, required: true},
})


const PersonSchema = new Schema<PersonWithMovieList>({
    personId: {type: Number, required: true},
    personMovies: {type: [PersonMovies], default: []},
    personName: {type: String, required: true},
    personPhoto: {type: String},
    category: {type: String, enum: TEST_CATEGORIES, required: true}
})

PersonSchema.index({personId: 1, category: 1}, {unique: true}) // могут быть одни и те же персоны в разных категориях 
export const PersonModel = model('Person', PersonSchema)