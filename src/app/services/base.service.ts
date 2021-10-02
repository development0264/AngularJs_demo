import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public debugEnvironment = true;
  constructor(readonly httpClient: HttpClient, public spinner:NgxSpinnerService) { }
  debugPrint(message: string){
    // This will be disable the logger in PROD release
    if (this.debugEnvironment) {
      console.log("-");
      console.log("-");
      console.log(`%c --  ${message}  -- `, 'background: #3393FF; color: #FFFFFF');
      //console.log(`(Houm debugPrint:  ${Date().toLocaleString()} )`);
      console.log("-");
      console.log("-");
    }
}

debugPrintHighlight(message: string){
    // This will be disable the logger in PROD release
    if (this.debugEnvironment) {
      console.log("-");
      console.log("-");
      console.log(`%c --  ${message}  -- `, 'background: #581845; color: #FFFFFF');
      //console.log(`(Houm debugPrint:  ${Date().toLocaleString()} )`);
      console.log("-");
      console.log("-");
    }
}

debugError(error: Error) {
    if (this.debugEnvironment) {
        const details = "error base:"+ error + " ---- error stringify: " + JSON.stringify(error, null , 2);
        console.error(details);
        console.error("debugError stack trace: "+error.stack);
        // this.debugAlert("", details);
    }
}

MIN_TOAST_MSG_LENGTH = 5;
debugAlert(msg: string, details: string){
    if (this.debugEnvironment) {
        const info = msg + " _______ " + details;
        this.debugPrintHighlight(info);
        alert(info);
    } else if (msg.length > this.MIN_TOAST_MSG_LENGTH) {
        // this.displayService.showToastMessage(msg);
        console.log( "--------> ",msg);
    }
}
    doRequest(endPointUrl: string,
      method: string,
      data?: any,
      params?: any,
      headers?: HttpHeaders, hashOptions?: any) {
        const httpOptions = {
        headers: headers ? headers : new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data),
        params: params,
      };
      if (params) {
        httpOptions.params = new HttpParams({
                fromObject: this.toHttpParams(params)
            }
        );
      }
      httpOptions.headers['hashOptions'] = hashOptions ? hashOptions : {isLoading: false};
      return this.httpClient
      .request<HoumResponse>(method, `${endPointUrl}`, httpOptions)
      .pipe(
        // retry(3),
        map(response => response),
        catchError((error: HttpErrorResponse) => {
            return throwError(error);
        })
      );
    }

    toHttpParams(obj) {
      const params = {};
      for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
              const val = obj[key];
              if (val !== null && val !== undefined) {
                  if (typeof val === 'object') {
                      params[key] = JSON.stringify(val);
                  } else {
                      params[key] = val.toString();
                  }
              }
          }
      }
      return params;
    }
    async startLoader() {
      this.spinner.show();
    }

    async stopLoader() {
      this.spinner.hide();
    }


    async startRouteLoader(name: string) {
      this.spinner.show(name);
    }

    async stopRouteLoader(name: string) {
      this.spinner.hide(name);
    }

}


export interface HoumResponse {
  success: any;
  data: any;
}

export class API {
  // private static base = "http://mis.houm.me:9001/api/v1/";
  private static base = "/api/v1/";
  public static table_data = API.base+"customer";
  public static login = API.base+"login";
  public static dashboard  = API.base+"dashboard";
  public static report = API.base+"report"
}
