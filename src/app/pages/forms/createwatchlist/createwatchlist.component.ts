import { Component, OnInit, Input } from '@angular/core';
import sampleData from './watch-list.json';
import companylistJson from './company-list.json';
import { NgModule } from '@angular/core';
import { sharedService } from '../../../@core/mock/watch-list.service'

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-create-watchlist',
  templateUrl: './createwatchlist.component.html',
  styleUrls: ['./createwatchlist.component.scss'],
  providers: [sharedService]
})
export class CreateWatchlistComponent implements OnInit {

  constructor(private sharedService: sharedService,private _Activatedroute:ActivatedRoute) { 

    this._Activatedroute.paramMap.subscribe(params => { 
      this.inputName = params.get('wlName'); 
      console.log(this.inputName);
  });
  }

  //@Input() 
  inputName: string;

  ngOnInit() {
    this.watchListName = this.inputName;

    // Read's the data form Json FILE
    //this.data = this.filterData(this.data, this.inputName);

     // Read's the data from Json service Object
     var serviceObject = this.getWatchListData()
     this.data = this.filterData(serviceObject, this.inputName);
  }

  data;
  companyData = companylistJson.Companies
  watchListName;
  hasWatchListName = this.watchListName === "" ? false : true;
  companyname;
  companynameTemp;
  currentprice;
  minimumPrice;
  maxmimumPrice;
  includeEvent;
  companyId;
  shareParentObject;



  addCompany(watchlistName) {
    //var fs = require('file-system');

    var existingWatchList = this.data.filter(e => e.WatchListName.includes(watchlistName))

    if (watchlistName !== "" && this.data.length > 0 && existingWatchList.length > 0) {
      var existingObject = this.filterData(this.data, watchlistName);
      var newObject = {
        Companyid: this.companyId,
        name: this.companyname,
        CurrentPrice: this.currentprice,
        Minmumprice: this.minimumPrice,
        Maximumprice: this.maxmimumPrice,
        IncludeNewsEvents: this.includeEvent
      }
      existingObject[0].Companies.push(newObject)
      this.clearNewObject();
    }
    else {
      this.watchListName = watchlistName;
      this.hasWatchListName = true;
      var newParentObject = {
        WatchListName: watchlistName,
        WatchListId: 1,
        CreateDate: new Date(),
        status: "active",
        Companies: [
          {
            Companyid: this.companyId,
            name: this.companyname,
            CurrentPrice: this.currentprice,
            Minmumprice: this.minimumPrice,
            Maximumprice: this.maxmimumPrice,
            IncludeNewsEvents: this.includeEvent
          }
        ]
      }
      this.data.push(newParentObject)
      this.shareParentObject = newParentObject
      this.clearNewObject();
    }
    // fs.writeFileSync('./newCustomer.json', JSON.stringify(this.data, null, 2))
  }

  selectCompany(companyId, watchlistName) {
    var watchlistItem = this.filterData(this.data, watchlistName);
    var companyList = watchlistItem[0].Companies
    var company = this.filterCompany(companyList, companyId);
    this.companyId = company[0].Companyid;
    this.companyname = company[0].name;
    this.currentprice = company[0].CurrentPrice;
    this.maxmimumPrice = company[0].Minmumprice;
    this.minimumPrice = company[0].Maximumprice;
    this.includeEvent = company[0].IncludeNewsEvents;
  }

  filterData(data, value) {
    return data.filter(e => e.WatchListName.includes(value))
  }

  filterCompany(data, value) {
    return data.filter(e => e.Companyid.includes(value))
  }

  addNewWatchList() {
    this.data = [];
    this.watchListName = "";
    this.hasWatchListName = false;
    this.clearNewObject()
  }

  clearNewObject() {
    this.companyId = "";
    this.companyname = "";
    this.currentprice = "";
    this.maxmimumPrice = "";
    this.minimumPrice = ""
  }

  findComapnyPrice(companyName) {
    if (companyName !== "") {
      var existingPrices = this.companyData.filter(e => e.Name.includes(companyName))
      this.companyId = existingPrices[0].Symbol;
      this.companyname = existingPrices[0].Name;
      this.currentprice = existingPrices[0].Price.concat(" ").concat(existingPrices[0].Currency);
    }
    else {
      this.companyId = "";
      this.currentprice = "";
    }
  }

  saveWatchList() {
    if (this.shareParentObject == undefined) {
      var newDataObject: Object = this.data
      this.sharedService.addWatchList(newDataObject);
    }
    else {
      this.sharedService.addWatchList(this.shareParentObject);
    }
  }

  getWatchListData() {
    return this.sharedService.getWatchList();
  }

}
