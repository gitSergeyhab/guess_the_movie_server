export interface ImageData {
    docs:  Image[];
    total: number;
    limit: number;
    page:  number;
    pages: number;
}

export interface Image  {
    url:        string;
    height:     number;
    previewUrl: string;
    type:       string;
    width:      number;
    movieId:    number;
    id:         string;
}
