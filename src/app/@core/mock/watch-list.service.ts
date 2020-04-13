import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
//import { BehaviorSubject } from 'rxjs';

@Injectable()
export class sharedService {

    public WatchList: any = [];
    //private watchList = new BehaviorSubject<any[]>([]);

    constructor() { }


    addWatchList(watchlist: any) {
        var newObject = watchlist;
        this.WatchList= localStorage.getItem("FSSignal") ?JSON.parse(localStorage.getItem("FSSignal")) : [];

        var existingWatchList = this.WatchList.filter(e => e.WatchListName.includes(newObject.WatchListName))

        if (existingWatchList.length > 0) {
            //update object
            existingWatchList[0].Companies = newObject.Companies;
        }
        else {
            //Creae object
            this.WatchList.push(newObject);
        }

        localStorage.setItem("FSSignal",JSON.stringify(this.WatchList))

        console.log(this.WatchList);
    }

    getWatchList(): any {
        return localStorage.getItem("FSSignal") ? JSON.parse(localStorage.getItem("FSSignal")) : [];
    }
    updateWatchList(watchList: any){
        localStorage.setItem("FSSignal",JSON.stringify(watchList));
    }

}