import { Schema, model } from 'mongoose';
import { MovieWithImageList } from '../types/movie-types';
import { Image } from '../types/image-types';
import { TEST_CATEGORIES } from '../const/tests';


const ImageSchema = new Schema<Image>({
    id: {type: String, required: true},
    movieId: {type: Number, required: true},
    previewUrl: {type: String},
    url: {type: String},
})


const MovieImageSchema = new Schema<MovieWithImageList>({
    images: {type: [ImageSchema], default: []},
    enName: {type: String},
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    year: {type: Number, required: true},
    category: {type: String, enum: TEST_CATEGORIES, required: true}
})

MovieImageSchema.index({id: 1, category: 1}, {unique: true})

export const MovieImageModel = model('MovieImage', MovieImageSchema);