import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import countries from '../countries.json';

import {API, BaseService} from '../../services/base.service';
import { HttpHeaders } from '@angular/common/http';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Router } from '@angular/router';

declare var $: any;
interface Country {
  name: string;
  countryCode: string;
  offset: string;
  timezone: string;
}
@Component({
  selector: 'app-consumer-houm',
  templateUrl: './consumer-houm.component.html',
  styleUrls: ['./consumer-houm.component.scss'],
})
export class ConsumerHoumComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  country: Country[] = countries.data;
  range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  startDate: any = "";
  endDate: any = "";
  countryName: any = "";
  tableData = [];
  dataTable: any;
  pageSize: any = 30;
  totalData: any = 0;
  page: any = 1;

  constructor(private baseService: BaseService,private router: Router) {}

  ngOnInit(): void {
    document.querySelector('body').classList.add('consumer-houm');
  }

  export() {
    let btn: any =  document.getElementsByClassName('buttons-excel')[0]
    btn.click();
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('consumer-houm');
  }

  ngAfterViewInit(){
    setTimeout(async () => {
      await this.loadTableData();
    }, 100);
  }
  getData(){
    setTimeout(()=>{
      if(this.dataTable) {
        $('#ejemplo').DataTable().destroy();
      }
      this.dataTable = $('#ejemplo').DataTable({
        paging: false,
        lengthChange: false,
        searching: false,
        ordering: false,
        info: false,
        autoWidth: true,
        dom: 'Bfrt<"col-md-6 inline mt-3"i> <"col-md-6 inline mt-3"p>',
        buttons: {
          dom: {
            container: {
              tag: 'div',
              className: 'flexcontent',
            },
            buttonLiner: {
              tag: null,
            },
          },
          buttons: [
            {
              extend: 'excelHtml5',
              text: '<i #export class="fa fa-file-excel-o"></i>Excel',
              title: 'Houm',
              titleAttr: 'Excel',
              className: 'btn btn-app export excel d-none',
            },
          ],
        },
      });
    })
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
  onChange() {
    this.page = 1;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadTableData();
  }
  async loadTableData(){
    this.baseService.startLoader();
    this.baseService.doRequest(API.table_data, "GET",{},{"page": this.page,"limit":this.pageSize, "startDate": this.startDate, "endDate": this.endDate, "country": this.countryName,"orderBy" : "-created_on","active": true},new HttpHeaders({"Authorization": atob(localStorage.getItem('token'))}))
      .subscribe( async (response: any) => {
        this.baseService.stopLoader();
        this.tableData = await response.data;
        this.totalData = response.pagination.totalCount;
        this.getData();
        if(!document.getElementById("pageIndex")) {
          let div = await document.createElement("span");
          div.append(response.pagination.currentPage.toString());
          div.setAttribute("id", "pageIndex");
          setTimeout(() => {
            document.getElementsByClassName("mat-paginator-navigation-previous")[0].append(div);
          }, 500);
        }
      }), error => {
        this.baseService.stopLoader();
        const msg = "Error - 10001";
        console.error(msg + " ... " +JSON.stringify(error, null, 2));
      };
  }
  onNext(event: PageEvent): PageEvent {
		document.getElementById("pageIndex").innerHTML = (event.pageIndex + 1).toString();
    this.page = event.pageIndex + 1;
    this.loadTableData();
		return event;
	}
  reset() {
    console.log('reset');
  }

}

