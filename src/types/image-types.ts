export interface Image  {
    url:        string;
    previewUrl: string;
    movieId:    number;
    id:         string;
}

export interface ImageData {
    docs:  Image[];
    total: number;
    limit: number;
    page:  number;
    pages: number;
}