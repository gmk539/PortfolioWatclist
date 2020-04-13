import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NewsModel,NewsResponse, NewsItem} from './newsModel'

@Component({
  selector: 'ngx-news',
  styleUrls: ['./news.component.scss'],
  templateUrl: './news.component.html',
})
export class NewsComponent {
    @Input() companyName: string;
    public newsItems:NewsItem[];
    //public newsWithScore:Dictionary<string>

    public newsWithScore: { [id: string] : number; } = {};
    constructor(private http: HttpClient) {

      }
      ngOnChanges(){
        // this.http.get('http://newsapi.org/v2/everything?q='+this.companyName+'&from=2020-04-09&sortBy=popularity&apiKey=7db1397688ce45eb9c9b01ca1c8c4269').subscribe((data:NewsResponse)=>{
        //     this.newsItems=[];
        //     data.articles.forEach((x,index)=>{
        //         this.newsItems.push({news:x.title,score:index%2});
        //     });
        //     // this.http.post('http://localhost:51845/api/v2/resources/sentiment',this.newsItems).subscribe((result:object)=>{
        //     //     alert(result);
        //     // });
        // });

        if (this.companyName != undefined) {
          this.http.get('http://newsapi.org/v2/everything?q=' + this.companyName + '&from=2020-04-09&sortBy=popularity&apiKey=7db1397688ce45eb9c9b01ca1c8c4269').subscribe((data: NewsResponse) => {
              this.newsItems = [];
              data.articles.forEach((x, index) => {
                  this.newsItems.push({ News: x.title, score: 0.5 });
              });
              // this.http.post('http://localhost:61580/api/v2/resources/sentiment',this.newsItems).subscribe((result:object[])=>{
              this.http.post('https://senti10.herokuapp.com/api/v1/resources/opinion',this.newsItems).subscribe((result:object[])=>{
                  this.newsItems=[];
                  Object.keys(result).forEach((y,index)=>{
                      this.newsItems.push({ News: y, score: result[y] });
                  });
              });
          });
      }
      }

}
