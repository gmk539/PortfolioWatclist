export class NewsModel{
    public title :string;
    public description :string;
    public content:string;
}

export class NewsResponse{
    public status :string;
    public totalResults : number;
    public articles:NewsModel[];
}

export class NewsItem{
    public News:string;
    public score:number;
}