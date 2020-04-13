import { Component } from '@angular/core';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html',
})
export class FormLayoutsComponent {
  //currentCompanyName : string ="IBM-USA";
  datafromChild:string;
 
  receiveData(company){
 this.datafromChild=company;
  }
}
