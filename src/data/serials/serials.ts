// https://api.kinopoisk.dev/v1.3/movie?selectFields=fees.world.value&selectFields=fees.world.currency&selectFields=rating.kp&selectFields=votes.kp&selectFields=movieLength&selectFields=id&selectFields=name&selectFields=slogan&selectFields=year&selectFields=budget.value&selectFields=poster.url&selectFields=poster.previewUrl&selectFields=genres.name&selectFields=countries.name&selectFields=persons.id&selectFields=persons.photo&selectFields=persons.name&sortField=votes.kp&sortType=-1&page=1&limit=250&type=movie

import { Movie } from "../../types/movie-types";
import { seriesData1 } from "./serials1";
import { seriesData2 } from "./serials2";

export const serials: Movie[] = [...seriesData1.docs, ...seriesData2.docs]