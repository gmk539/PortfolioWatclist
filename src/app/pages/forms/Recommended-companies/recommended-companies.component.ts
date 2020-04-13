import { Component,OnInit ,Output,EventEmitter} from '@angular/core';
import {sharedService} from '../../../@core/mock/watch-list.service'

@Component({
  selector: 'recommendedInfo',
  styleUrls: ['./recommended-companies.component.scss'],
  templateUrl: './recommended-companies.html',
  providers:[sharedService]
})

export class RecommendedCompaniesComponent implements OnInit{
  public Products: any = [];
  getWatchListData(){
    return this.sharedService.getWatchList()
  }
  @Output() sendCompanyDetails = new EventEmitter<string>();
  constructor(private sharedService:sharedService){}
  public _sendCompanyDetails(company: string): void {
    this.sendCompanyDetails.emit(company);
  }

  ngOnInit(){
    this.Products=this.getWatchListData();
 }
}