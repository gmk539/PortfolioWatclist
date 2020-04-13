import { Component } from '@angular/core';
// import { watchlists } from './fruits-list';
import { sharedService } from '../../../@core/mock/watch-list.service'

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  providers: [sharedService]
})
export class ListComponent {
  public setCompanyName(name: string) {
    let companyName:String=name;
    }
     watchlists1:any=[];
     watchlists:any=[];
  constructor(private sharedService: sharedService) {    
     
  }

  ngOnInit(){
    this.watchlists=this.sharedService.getWatchList();
    this.watchlists1=this.watchlists;

    if(this.watchlists && this.watchlists.length >0){
    this.watchlists.forEach(function (wList) {

    wList.Companies.forEach(function (company) {

      if (company.CurrentPrice > company.Minimumprice || company.CurrentPrice < company.Maximumprice) {
        company.IsRecommended = true;
      }
      else {
        company.IsRecommended = false;
      }
    });
    if (wList.Companies.filter(c => c.IsRecommended == true).length>0) {
      wList.IsRecommended = true;
    }
    else {
      wList.IsRecommended = false;
    }
  });

  this.sharedService.updateWatchList(this.watchlists);
}
  }

}

