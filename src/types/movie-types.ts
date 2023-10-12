import { OperationCategory } from "../const/admin-const";
import { Image } from "./image-types";

export interface Movie {
    votes:       Votes;
    movieLength: number;
    id:          number;
    name:        string;
    slogan:      null | string;
    year:        number;
    budget?:     Budget;
    poster:      Poster;
    genres:      Name[];
    countries:   Name[];
    persons:     Person[];
    enName:      null | string;
  }
  
  export interface Budget {
    value:    number;
    currency: string;
  }
  

  
  export interface Name {
    name: string;
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
  
  export interface Votes {
    kp: number;
  }


  export interface MovieData {
    docs:  Movie[];
    total: number;
    limit: number;
    page:  number;
    pages: number;
}

export interface MovieWithImageList {
  id: number;
  name: string;
  enName?: string;
  year: number;
  category:  OperationCategory;
  images: Image[];
}


export interface MovieWithCategory extends Movie {
  category: OperationCategory
}