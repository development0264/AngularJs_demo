import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService, API} from 'src/app/services/base.service';
import countries from '../countries.json';

interface Country {
  name: string;
  countryCode: string;
  offset: string;
  timezone: string;
}
@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit {
  country: Country[] = countries.data;
  data: any={};
  startDate: any = "";
  endDate: any = "";
  range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  countryName: any = "";
  constructor(private baseService: BaseService,private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.loadData();
    }, 100);
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
  loadData(){
    console.log('vs');
    this.baseService.startLoader();
    this.baseService.doRequest(API.report, "GET",{},{"startDate": this.startDate, "endDate": this.endDate, "country": this.countryName},new HttpHeaders({"Authorization": atob(localStorage.getItem('token'))}))
      .subscribe(response => {
        this.baseService.stopLoader();
        this.data = response.data;
      }), error => {
        const msg = "Error - 10001";
        console.error(msg + " ... " +JSON.stringify(error, null, 2));
      };
  }
}
