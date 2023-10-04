export interface MovieData {
    docs:  Movie[];
    total: number;
    limit: number;
    page:  number;
    pages: number;
}

export interface Movie {
    rating:      Rating;
    votes:       Rating;
    id:          number;
    name:        string;
    slogan:      null | string;
    year:        number;
    poster:      Poster;
    genres:      Country[];
    countries:   Country[];
    persons:     Person[];
    enName?:     null | string;
    movieLength: number | null;
    budget?:     Budget;
    fees?:       Fees;
}

export interface Budget {
    value:    number;
    currency: string;
}

// export enum Currency {
//     A = "A$",
//     Currency = "€",
//     Dem = "DEM",
//     Empty = "$",
//     Fluffy = "£",
//     Frf = "FRF",
//     Purple = "₽",
//     Р = "р.",
// }

export interface Country {
    name: string;
}

export interface Fees {
    world: Budget;
}

export interface Person {
    id:    number;
    photo: string;
    name:  null | string;
}

export interface Poster {
    url:        string;
    previewUrl: string;
}

export interface Rating {
    kp: number;
}
